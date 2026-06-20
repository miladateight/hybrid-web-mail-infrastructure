(function () {
  const config = window.CASE_STUDY_I18N;
  const state = {
    locale: {},
    lang: config.fallback,
    navOpen: false
  };

  const qs = (selector, root = document) => root.querySelector(selector);
  const qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  function getPath(obj, path) {
    return path.split(".").reduce((value, key) => {
      if (value && Object.prototype.hasOwnProperty.call(value, key)) return value[key];
      return undefined;
    }, obj);
  }

  function validLang(lang) {
    return config.supported.includes(lang) ? lang : config.fallback;
  }

  async function loadLocale(lang) {
    const selected = validLang(lang);
    const fallbackResponse = await fetch("locales/en.json");
    const fallback = await fallbackResponse.json();
    if (selected === "en") return fallback;
    try {
      const response = await fetch(`locales/${selected}.json`);
      if (!response.ok) throw new Error("Locale unavailable");
      const locale = await response.json();
      return mergeDeep(fallback, locale);
    } catch (error) {
      console.warn("Falling back to English locale.", error);
      state.lang = config.fallback;
      return fallback;
    }
  }

  function mergeDeep(base, override) {
    if (Array.isArray(base)) return Array.isArray(override) ? override : base;
    if (typeof base !== "object" || base === null) return override ?? base;
    const output = { ...base };
    Object.keys(base).forEach((key) => {
      output[key] = mergeDeep(base[key], override ? override[key] : undefined);
    });
    return output;
  }

  function setTextContent() {
    qsa("[data-i18n]").forEach((element) => {
      const value = getPath(state.locale, element.dataset.i18n);
      if (typeof value === "string") element.textContent = value;
    });

    qsa("[data-i18n-attr]").forEach((element) => {
      element.dataset.i18nAttr.split(",").forEach((pair) => {
        const [attr, key] = pair.split(":").map((part) => part.trim());
        const value = getPath(state.locale, key);
        if (attr && typeof value === "string") element.setAttribute(attr, value);
      });
    });
  }

  function renderCollections() {
    qsa("[data-cards]").forEach((container) => {
      const cards = getPath(state.locale, container.dataset.cards) || [];
      container.innerHTML = cards.map((card) => `
        <article class="info-card">
          <h3>${escapeHtml(card.title)}</h3>
          <p>${escapeHtml(card.body)}</p>
        </article>
      `).join("");
    });

    qsa("[data-list]").forEach((container) => {
      const items = getPath(state.locale, container.dataset.list) || [];
      container.innerHTML = items.map((item) => `<div>${escapeHtml(item)}</div>`).join("");
    });

    qsa("[data-tags]").forEach((container) => {
      const tags = getPath(state.locale, container.dataset.tags) || [];
      container.innerHTML = tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("");
    });

    qsa("[data-flow]").forEach((container) => {
      const items = getPath(state.locale, container.dataset.flow) || [];
      container.innerHTML = items.map((item) => `<div>${escapeHtml(item)}</div>`).join("");
    });

    qsa("[data-timeline]").forEach((container) => {
      const items = getPath(state.locale, container.dataset.timeline) || [];
      container.innerHTML = items.map((item) => `<div>${escapeHtml(item)}</div>`).join("");
    });

    qsa("[data-stacks]").forEach((container) => {
      const groups = getPath(state.locale, container.dataset.stacks) || [];
      container.innerHTML = groups.map((group) => `
        <article class="stack-card">
          <h3>${escapeHtml(group.title)}</h3>
          <ul>${group.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        </article>
      `).join("");
    });
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function updateMetadata() {
    document.documentElement.lang = state.lang;
    document.documentElement.dir = config.directions[state.lang] || "ltr";
    document.title = state.locale.meta.title;
    const description = qs("meta[name='description']");
    const ogTitle = qs("meta[property='og:title']");
    const ogDescription = qs("meta[property='og:description']");
    const twitterTitle = qs("meta[name='twitter:title']");
    const twitterDescription = qs("meta[name='twitter:description']");
    if (description) description.setAttribute("content", state.locale.meta.description);
    if (ogTitle) ogTitle.setAttribute("content", state.locale.meta.title);
    if (ogDescription) ogDescription.setAttribute("content", state.locale.meta.description);
    if (twitterTitle) twitterTitle.setAttribute("content", state.locale.meta.title);
    if (twitterDescription) twitterDescription.setAttribute("content", state.locale.meta.description);
  }

  function updateLanguageButtons() {
    qsa("[data-lang]").forEach((button) => {
      const active = button.dataset.lang === state.lang;
      button.setAttribute("aria-pressed", String(active));
    });
  }

  async function applyLanguage(lang, persist = true) {
    state.lang = validLang(lang);
    state.locale = await loadLocale(state.lang);
    updateMetadata();
    setTextContent();
    renderCollections();
    updateLanguageButtons();
    if (persist) localStorage.setItem("portfolioLanguage", state.lang);
  }

  function initLanguage() {
    const stored = localStorage.getItem("portfolioLanguage");
    const initial = config.supported.includes(stored) ? stored : config.fallback;
    applyLanguage(initial, false);
    qsa("[data-lang]").forEach((button) => {
      button.addEventListener("click", () => applyLanguage(button.dataset.lang, true));
    });
  }

  function initMenu() {
    const toggle = qs("[data-menu-toggle]");
    const nav = qs("[data-nav]");
    if (!toggle || !nav) return;
    const close = () => {
      state.navOpen = false;
      nav.classList.remove("open");
      document.body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", state.locale.accessibility?.openMenu || "Open navigation");
    };
    const open = () => {
      state.navOpen = true;
      nav.classList.add("open");
      document.body.classList.add("nav-open");
      toggle.setAttribute("aria-expanded", "true");
      toggle.setAttribute("aria-label", state.locale.accessibility?.closeMenu || "Close navigation");
    };
    toggle.addEventListener("click", () => state.navOpen ? close() : open());
    nav.addEventListener("click", (event) => {
      if (event.target.matches("a")) close();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && state.navOpen) close();
    });
  }

  function initScrollSpy() {
    const links = qsa(".site-nav a");
    const sections = links
      .map((link) => qs(link.getAttribute("href")))
      .filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((section) => observer.observe(section));
  }

  function initReveal() {
    const targets = qsa(".section-observe");
    if (!("IntersectionObserver" in window)) {
      targets.forEach((target) => target.classList.add("visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .12 });
    targets.forEach((target) => observer.observe(target));
  }

  document.addEventListener("DOMContentLoaded", () => {
    initLanguage();
    initMenu();
    initScrollSpy();
    initReveal();
  });
}());
