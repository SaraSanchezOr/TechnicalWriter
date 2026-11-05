// Sara Sánchez Ortiz · Interacciones de la web

// Textos de los botones según el idioma de la página (<html lang>)
const TEXT = {
  es: { menu: 'Menú', close: 'Cerrar', toDark: 'Cambiar a modo oscuro', toLight: 'Cambiar a modo claro' },
  en: { menu: 'Menu', close: 'Close', toDark: 'Switch to dark mode', toLight: 'Switch to light mode' },
};
const ui = TEXT[document.documentElement.lang] || TEXT.es;

// 1. Menú en el móvil
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('menu');

if (toggle && nav) {
  const setMenu = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? ui.close : ui.menu;
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

// 2b. Idioma de los ejemplos (ES / EN / DE). El texto original del HTML está en el idioma de la página
const explainer = document.querySelector('.explainer');
const langSwitch = explainer?.querySelector('.lang-switch');

if (explainer && langSwitch) {
  const baseLang = document.documentElement.lang in TEXT ? document.documentElement.lang : 'es';
  const labels = {
    before: { es: 'Antes', en: 'Before', de: 'Vorher' },
    after: { es: 'Después', en: 'After', de: 'Nachher' },
  };
  const labelKey = { 'Antes': 'before', 'Before': 'before', 'Después': 'after', 'After': 'after' };
  const translatable = Array.from(explainer.querySelectorAll('[data-es], [data-en], .pane-label'));
  translatable.forEach((el) => { el.dataset[baseLang] = el.textContent; });

  const langButtons = Array.from(langSwitch.querySelectorAll('button'));

  const setLang = (lang) => {
    translatable.forEach((el) => {
      const key = labelKey[el.dataset[baseLang]];
      const text = key ? labels[key][lang] : el.dataset[lang];
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
    themeToggle.setAttribute('aria-label', dark ? ui.toLight : ui.toDark);
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

// 2d. Los títulos se escriben letra a letra, como código. El del inicio arranca solo;
// los demás, cuando aparecen en pantalla
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const typeTitle = (title) => {
    const isHero = title.matches('.hero h1');
    const text = title.textContent.trim();
    title.textContent = '';
    title.setAttribute('aria-label', text);
    title.classList.add('typed');

    // Todas las letras ocupan su sitio desde el principio (invisibles), así el texto no salta de línea al escribirse
    const letters = Array.from(text, (char) => {
      const span = document.createElement('span');
      span.className = 'ch';
      span.textContent = char;
      title.append(span);
      return span;
    });

    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    cursor.setAttribute('aria-hidden', 'true');
    title.insertBefore(cursor, letters[0]);

    let i = 0;
    const typeNext = () => {
      letters[i].classList.add('on');
      i += 1;
      if (i < letters.length) {
        title.insertBefore(cursor, letters[i]);
        setTimeout(typeNext, 35 + Math.random() * 55);
      } else if (isHero) {
        title.append(cursor);
        cursor.classList.add('done');
      } else {
        setTimeout(() => cursor.remove(), 1200);
      }
    };

    if (isHero) {
      setTimeout(typeNext, 500);
    } else if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          observer.disconnect();
          typeNext();
        }
      }, { threshold: 1 });
      observer.observe(title);
    } else {
      typeNext();
    }
  };

  document.querySelectorAll('.hero h1, .section h2, .explainer-title, .article h1').forEach(typeTitle);
}

// 2e. Servicios y trayectoria: los puntos aparecen uno a uno al llegar a la sección
document.querySelectorAll('.services, .timeline').forEach((list) => {
  Array.from(list.children).forEach((item, i) => item.style.setProperty('--i', i));

  const reveal = () => list.classList.add('is-in');

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        reveal();
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    observer.observe(list);
  } else {
    reveal();
  }
});

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
