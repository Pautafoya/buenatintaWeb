<?php
// Recibe el formulario de contacto de la web y lo envía por correo.
// Funciona en el hosting compartido de Hostinger (PHP + mail()).

// ── Configuración ──────────────────────────────────────────────
$DESTINO   = 'pamela@labuenatinta.com';
// Debe ser una dirección del mismo dominio del sitio para que el correo no caiga en spam.
$REMITENTE = 'no-reply@labuenatinta.com';
// ──────────────────────────────────────────────────────────────

header('Content-Type: application/json; charset=utf-8');

function responder($code, $ok, $msg = '') {
    http_response_code($code);
    echo json_encode(['ok' => $ok, 'msg' => $msg]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    responder(405, false, 'Método no permitido');
}

$datos = json_decode(file_get_contents('php://input'), true);
if (!is_array($datos)) $datos = $_POST;

// Campo trampa: si viene lleno es un bot. Se responde "ok" sin enviar nada.
if (!empty($datos['sitio'])) responder(200, true);

$limpiar = function ($v, $max) {
    $v = is_string($v) ? trim(strip_tags($v)) : '';
    return mb_substr($v, 0, $max);
};
// En campos que van a cabeceras del correo se quitan los saltos de línea.
$unaLinea = function ($v) { return preg_replace('/[\r\n]+/', ' ', $v); };

$nombre   = $unaLinea($limpiar($datos['nombre'] ?? '', 120));
$contacto = $unaLinea($limpiar($datos['contacto'] ?? '', 160));
$mensaje  = $limpiar($datos['mensaje'] ?? '', 5000);
$servicios = [];
if (isset($datos['servicios']) && is_array($datos['servicios'])) {
    foreach (array_slice($datos['servicios'], 0, 20) as $s) {
        $s = $limpiar($s, 120);
        if ($s !== '') $servicios[] = $s;
    }
}

if ($nombre === '' || $contacto === '') {
    responder(422, false, 'Faltan datos obligatorios');
}

$asunto = 'Nueva solicitud desde la web: ' . $nombre;
$cuerpo = "Nombre: $nombre\n"
        . "Contacto: $contacto\n"
        . 'Servicios: ' . ($servicios ? implode(', ', $servicios) : '—') . "\n\n"
        . "Mensaje:\n" . ($mensaje !== '' ? $mensaje : '—') . "\n";

$cabeceras = [
    'From: La Buena Tinta <' . $REMITENTE . '>',
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
];
if (filter_var($contacto, FILTER_VALIDATE_EMAIL)) {
    $cabeceras[] = 'Reply-To: ' . $contacto;
}

$enviado = mail(
    $DESTINO,
    '=?UTF-8?B?' . base64_encode($asunto) . '?=',
    $cuerpo,
    implode("\r\n", $cabeceras)
);

$enviado ? responder(200, true) : responder(500, false, 'No se pudo enviar el correo');
