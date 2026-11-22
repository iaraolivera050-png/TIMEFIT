(function () {
  const config = window.TIMEFIT_CONFIG || {};
  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".nav-toggle");

  const toggleLabel = toggle ? toggle.querySelector(".visually-hidden") : null;

  function closeNav() {
    if (!nav || !toggle) return;
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    if (toggleLabel) toggleLabel.textContent = "Abrir menú";
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      if (toggleLabel) toggleLabel.textContent = open ? "Cerrar menú" : "Abrir menú";
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeNav();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeNav();
    });
  }

  const priceText =
    typeof config.price === "string" && config.price.trim()
      ? config.price.trim()
      : "Precio a confirmar";

  document.querySelectorAll("[data-price]").forEach(function (node) {
    node.textContent = priceText;
  });

  const digits = String(config.whatsappNumber || "").replace(/\D/g, "");
  const message = encodeURIComponent(
    config.whatsappMessage || "Hola, quiero consultar por el reloj TIMEFIT."
  );
  const href = digits ? "https://wa.me/" + digits + "?text=" + message : "";

  document.querySelectorAll("[data-whatsapp]").forEach(function (node) {
    const label = node.querySelector("[data-whatsapp-label]");
    if (!href) {
      if (node.hasAttribute("data-whatsapp-optional")) {
        node.hidden = true;
      }
      return;
    }

    node.href = href;
    node.target = "_blank";
    node.rel = "noopener noreferrer";
    node.hidden = false;
    node.classList.remove("is-disabled");
    node.removeAttribute("aria-disabled");
    node.removeAttribute("tabindex");
    if (label && node.dataset.labelReady) {
      label.textContent = node.dataset.labelReady;
    }
  });

  const socials = config.socials || {};
  document.querySelectorAll("[data-social]").forEach(function (node) {
    const key = node.getAttribute("data-social");
    const url = typeof socials[key] === "string" ? socials[key].trim() : "";
    const pending = document.querySelector('[data-social-pending="' + key + '"]');
    if (!url) {
      node.hidden = true;
      if (pending) pending.hidden = false;
      return;
    }
    node.href = url;
    node.target = "_blank";
    node.rel = "noopener noreferrer";
    node.hidden = false;
    if (pending) pending.hidden = true;
  });
})();
