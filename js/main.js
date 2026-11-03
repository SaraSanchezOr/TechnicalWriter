// Sara Sánchez Ortiz · Interacciones de la web

// 1. Menú en el móvil
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('menu');

if (toggle && nav) {
  const setMenu = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? 'Cerrar' : 'Menú';
    nav.classList.toggle('is-open', open);
  };

  toggle.addEventListener('click', () => {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });

  // Al pulsar un enlace, el menú se cierra
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenu(false));
  });

  // Tecla Escape para cerrar
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      setMenu(false);
      toggle.focus();
    }
  });
}

// 2. Pestañas de «Lo técnico, explicado»
const tabs = Array.from(document.querySelectorAll('[role="tab"]'));

const selectTab = (tab, moveFocus) => {
  tabs.forEach((t) => {
    const selected = t === tab;
    t.setAttribute('aria-selected', String(selected));
    t.tabIndex = selected ? 0 : -1;
    const panel = document.getElementById(t.getAttribute('aria-controls'));
    if (panel) panel.hidden = !selected;
  });
  if (moveFocus) tab.focus();
};

tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => selectTab(tab, false));

  // Flechas del teclado para moverse entre pestañas
  tab.addEventListener('keydown', (e) => {
    let next = null;
    if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
    if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
    if (e.key === 'Home') next = tabs[0];
    if (e.key === 'End') next = tabs[tabs.length - 1];
    if (next) {
      e.preventDefault();
      selectTab(next, true);
    }
  });
});

// 2b. Idioma de los ejemplos (ES / EN / DE). El texto en español es el original del HTML
const explainer = document.querySelector('.explainer');
const langSwitch = explainer?.querySelector('.lang-switch');

if (explainer && langSwitch) {
  const labels = {
    'Antes': { en: 'Before', de: 'Vorher' },
    'Después': { en: 'After', de: 'Nachher' },
  };
  const translatable = Array.from(explainer.querySelectorAll('[data-en], .pane-label'));
  translatable.forEach((el) => { el.dataset.es = el.textContent; });

  const langButtons = Array.from(langSwitch.querySelectorAll('button'));

  const setLang = (lang) => {
    translatable.forEach((el) => {
      const label = labels[el.dataset.es];
      const text = lang === 'es' ? el.dataset.es : (label ? label[lang] : el.dataset[lang]);
      if (text) el.textContent = text;
    });
    explainer.querySelectorAll('.pane-plain, .pane-dense, .explainer-note').forEach((el) => {
      el.lang = lang;
    });
    langButtons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
  };

  langButtons.forEach((b) => b.addEventListener('click', () => setLang(b.dataset.lang)));
  langSwitch.hidden = false;
}

// 2c. Modo claro / oscuro. Por defecto sigue al sistema; al pulsar el botón se guarda la elección
const themeToggle = document.querySelector('.theme-toggle');

if (themeToggle) {
  const root = document.documentElement;
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

  const currentTheme = () => root.dataset.theme || (systemDark.matches ? 'dark' : 'light');

  const showTheme = () => {
    const dark = currentTheme() === 'dark';
    themeToggle.dataset.mode = dark ? 'dark' : 'light';
    themeToggle.setAttribute('aria-label', dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
  };

  themeToggle.addEventListener('click', () => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) { /* sin almacenamiento: no se recuerda */ }
    showTheme();
  });

  systemDark.addEventListener('change', showTheme);
  showTheme();
}

// 3. Si falta una imagen (tu foto o una captura), se muestra un recuadro en su lugar
document.querySelectorAll('img[data-fallback]').forEach((img) => {
  const markMissing = () => img.closest('figure')?.classList.add('is-missing');
  if (img.complete && img.naturalWidth === 0) markMissing();
  img.addEventListener('error', markMissing);
});

// 4. Año actual en el pie
document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = new Date().getFullYear();
});
