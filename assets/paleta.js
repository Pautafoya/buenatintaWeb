// Panel temporal para probar tonos del naranja. Solo para la etapa de aprobación del diseño.
//   ?paleta            → muestra el panel
//   ?tono=14,72,55     → aplica ese tono (matiz, saturación, luz) sin mostrar el panel
// Borrar este archivo y su <script> en index.html cuando el color quede definido.
(function () {
  var ORIGINAL = { h: 14, s: 87, l: 55 };
  var PRESETS = [
    { name: 'Original', h: 14, s: 87, l: 55 },
    { name: 'Suave', h: 14, s: 72, l: 55 },
    { name: 'Mandarina', h: 20, s: 74, l: 56 },
    { name: 'Coral', h: 9, s: 66, l: 58 },
    { name: 'Terracota', h: 14, s: 56, l: 50 },
    { name: 'Arcilla', h: 16, s: 42, l: 47 }
  ];

  var params = new URLSearchParams(location.search);
  var showPanel = params.has('paleta');
  var tone = parseTone(params.get('tono'));
  if (!tone && showPanel) {
    try { tone = parseTone(localStorage.getItem('lbt-tono')); } catch (e) {}
  }
  if (!tone && !showPanel) return;
  tone = tone || Object.assign({}, ORIGINAL);

  function parseTone(str) {
    if (!str) return null;
    var p = str.split(',').map(Number);
    if (p.length !== 3 || p.some(isNaN)) return null;
    return { h: p[0], s: p[1], l: p[2] };
  }

  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  function hsl(h, s, l) { return 'hsl(' + h + ' ' + clamp(s, 0, 100) + '% ' + clamp(l, 0, 100) + '%)'; }

  function toHex(h, s, l) {
    s /= 100; l /= 100;
    var k = function (n) { return (n + h / 30) % 12; };
    var a = s * Math.min(l, 1 - l);
    var f = function (n) { return l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1))); };
    return '#' + [f(0), f(8), f(4)].map(function (x) { return Math.round(x * 255).toString(16).padStart(2, '0'); }).join('').toUpperCase();
  }

  function isOriginal(t) { return t.h === ORIGINAL.h && t.s === ORIGINAL.s && t.l === ORIGINAL.l; }

  function apply(t) {
    var st = document.documentElement.style;
    if (isOriginal(t)) {
      ['--naranja', '--naranja-osc', '--naranja-medio', '--naranja-claro', '--filtro-naranja'].forEach(function (v) { st.removeProperty(v); });
      return;
    }
    // Los tonos derivados mantienen la misma relación que tenían con el naranja original.
    st.setProperty('--naranja', hsl(t.h, t.s, t.l));
    st.setProperty('--naranja-osc', hsl(t.h, Math.round(t.s * 0.82), t.l - 13));
    st.setProperty('--naranja-medio', hsl(t.h, Math.round(t.s * 0.75), t.l - 5));
    st.setProperty('--naranja-claro', hsl(t.h + 15, Math.round(t.s * 1.15), t.l + 10));
    // Las ondas y el tentáculo son SVG con el naranja incrustado: se aproximan con un filtro.
    st.setProperty('--filtro-naranja',
      'hue-rotate(' + (t.h - ORIGINAL.h) + 'deg) saturate(' + (t.s / ORIGINAL.s).toFixed(3) + ') brightness(' + (t.l / ORIGINAL.l).toFixed(3) + ')');
  }

  apply(tone);
  if (!showPanel) return;

  function buildPanel() {
    var css = document.createElement('style');
    css.textContent =
      '#lbt-paleta{position:fixed;left:16px;bottom:16px;z-index:9999;width:280px;max-width:calc(100vw - 32px);background:#fff;color:#2C2E35;border-radius:20px;box-shadow:0 20px 50px -20px rgba(0,0,0,.45);font:13px/1.4 Poppins,system-ui,sans-serif;padding:16px}' +
      '#lbt-paleta.min>:not(.lbt-head){display:none}' +
      '#lbt-paleta .lbt-head{display:flex;align-items:center;justify-content:space-between;gap:8px;font-weight:600;font-size:14px}' +
      '#lbt-paleta .lbt-sw{width:22px;height:22px;border-radius:50%;background:var(--naranja);flex:none}' +
      '#lbt-paleta button{font:inherit;cursor:pointer;border:0;border-radius:999px}' +
      '#lbt-paleta .lbt-min{background:#F2F2F4;width:28px;height:28px}' +
      '#lbt-paleta .lbt-presets{display:flex;flex-wrap:wrap;gap:6px;margin:12px 0}' +
      '#lbt-paleta .lbt-presets button{display:flex;align-items:center;gap:6px;background:#F2F2F4;padding:5px 10px 5px 5px;font-size:12px}' +
      '#lbt-paleta .lbt-presets button.on{outline:2px solid #2C2E35}' +
      '#lbt-paleta .lbt-presets i{width:16px;height:16px;border-radius:50%;display:block}' +
      '#lbt-paleta label{display:block;margin-top:8px;font-size:12px;color:#6B6D75}' +
      '#lbt-paleta label span{float:right;color:#2C2E35;font-weight:600}' +
      '#lbt-paleta input[type=range]{width:100%;accent-color:#2C2E35}' +
      '#lbt-paleta .lbt-hex{margin-top:10px;font-family:ui-monospace,monospace;font-size:12px;color:#6B6D75}' +
      '#lbt-paleta .lbt-actions{display:flex;gap:8px;margin-top:12px}' +
      '#lbt-paleta .lbt-actions button{flex:1;padding:9px 10px;font-weight:600;font-size:12px}' +
      '#lbt-paleta .lbt-copy{background:#2C2E35;color:#fff}' +
      '#lbt-paleta .lbt-reset{background:#F2F2F4;color:#2C2E35}';
    document.head.appendChild(css);

    var el = document.createElement('div');
    el.id = 'lbt-paleta';
    el.innerHTML =
      '<div class="lbt-head"><span style="display:flex;align-items:center;gap:8px"><span class="lbt-sw"></span>Tono del naranja</span><button class="lbt-min" aria-label="Minimizar">–</button></div>' +
      '<div class="lbt-presets"></div>' +
      '<label>Matiz <span data-v="h"></span><input type="range" data-k="h" min="0" max="35" step="1"></label>' +
      '<label>Saturación <span data-v="s"></span><input type="range" data-k="s" min="25" max="100" step="1"></label>' +
      '<label>Luz <span data-v="l"></span><input type="range" data-k="l" min="38" max="62" step="1"></label>' +
      '<div class="lbt-hex"></div>' +
      '<div class="lbt-actions"><button class="lbt-reset">Original</button><button class="lbt-copy">Copiar enlace</button></div>';
    document.body.appendChild(el);

    var presetsEl = el.querySelector('.lbt-presets');
    PRESETS.forEach(function (p) {
      var b = document.createElement('button');
      b.innerHTML = '<i style="background:' + hsl(p.h, p.s, p.l) + '"></i>' + p.name;
      b.onclick = function () { set({ h: p.h, s: p.s, l: p.l }); };
      p.btn = b;
      presetsEl.appendChild(b);
    });

    var inputs = el.querySelectorAll('input[type=range]');
    inputs.forEach(function (inp) {
      inp.oninput = function () {
        var t = Object.assign({}, tone);
        t[inp.dataset.k] = Number(inp.value);
        set(t);
      };
    });

    el.querySelector('.lbt-min').onclick = function () {
      el.classList.toggle('min');
      this.textContent = el.classList.contains('min') ? '+' : '–';
    };
    el.querySelector('.lbt-reset').onclick = function () { set(Object.assign({}, ORIGINAL)); };
    el.querySelector('.lbt-copy').onclick = function () {
      var btn = this;
      var url = location.origin + location.pathname + '?tono=' + [tone.h, tone.s, tone.l].join(',');
      var done = function () { btn.textContent = '¡Copiado!'; setTimeout(function () { btn.textContent = 'Copiar enlace'; }, 1500); };
      if (navigator.clipboard) navigator.clipboard.writeText(url).then(done, function () { prompt('Enlace con este tono:', url); });
      else prompt('Enlace con este tono:', url);
    };

    function render() {
      inputs.forEach(function (inp) {
        inp.value = tone[inp.dataset.k];
        el.querySelector('[data-v="' + inp.dataset.k + '"]').textContent = tone[inp.dataset.k] + (inp.dataset.k === 'h' ? '°' : '%');
      });
      el.querySelector('.lbt-hex').textContent = 'Color principal: ' + toHex(tone.h, tone.s, tone.l);
      PRESETS.forEach(function (p) { p.btn.classList.toggle('on', p.h === tone.h && p.s === tone.s && p.l === tone.l); });
    }

    function set(t) {
      tone = t;
      apply(t);
      try { localStorage.setItem('lbt-tono', [t.h, t.s, t.l].join(',')); } catch (e) {}
      render();
    }

    render();
  }

  if (document.body) buildPanel();
  else document.addEventListener('DOMContentLoaded', buildPanel);
})();
