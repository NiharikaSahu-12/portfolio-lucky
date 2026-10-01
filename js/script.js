/* ============================================================
   Laxmiprasad Panda — Portfolio interactions
   ============================================================ */
(function () {
  "use strict";

  /* ---------- LinkedIn URL (demo — update this one line) ---------- */
  const LINKEDIN_URL = "https://www.linkedin.com/in/laxmiprasad-panda-981a27235?utm_source=share_via&utm_content=profile&utm_medium=member_android";
  document.querySelectorAll(".js-linkedin").forEach((a) => (a.href = LINKEDIN_URL));

  /* ---------- nav: scrolled state ---------- */
  const nav = document.getElementById("nav");
  const onScrollNav = () => nav.classList.toggle("scrolled", window.scrollY > 24);
  onScrollNav();

  /* ---------- back to top ---------- */
  const toTop = document.getElementById("toTop");
  const onScrollTop = () => toTop.classList.toggle("show", window.scrollY > 600);
  onScrollTop();
  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ---------- timeline progress ---------- */
  const progress = document.getElementById("timelineProgress");

  function updateScrollUI() {
    onScrollNav();
    onScrollTop();

    if (progress) {
      const rect = progress.parentElement.getBoundingClientRect();
      const total = rect.height;
      const passed = Math.min(Math.max(window.innerHeight * 0.55 - rect.top, 0), total);
      progress.style.height = (total ? (passed / total) * 100 : 0) + "%";
    }
  }
  window.addEventListener("scroll", updateScrollUI, { passive: true });
  updateScrollUI();

  /* ---------- mobile menu ---------- */
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    navToggle.classList.toggle("open", open);
    navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  navLinks.querySelectorAll(".nav-link").forEach((link) =>
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.classList.remove("open");
    })
  );

  /* ---------- scrollspy ---------- */
  const sections = document.querySelectorAll("main section[id]");
  const linkMap = new Map();
  navLinks.querySelectorAll(".nav-link").forEach((l) => linkMap.set(l.getAttribute("href").slice(1), l));

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          linkMap.forEach((l) => l.classList.remove("active"));
          const link = linkMap.get(entry.target.id);
          if (link) link.classList.add("active");
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  sections.forEach((s) => spy.observe(s));

  /* ---------- reveal on scroll ---------- */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  /* ---------- animated counters ---------- */
  function animateCount(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || "";
    const duration = 1600;
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  document.querySelectorAll("[data-count]").forEach((el) => countObserver.observe(el));

  /* ---------- language bars ---------- */
  const barObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.width = entry.target.dataset.width + "%";
          barObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  document.querySelectorAll(".bar-fill").forEach((el) => barObserver.observe(el));

  /* ---------- cursor glow follows pointer ---------- */
  const glow = document.querySelector(".cursor-glow");
  if (window.matchMedia("(pointer: fine)").matches) {
    let gx = window.innerWidth / 2, gy = window.innerHeight / 3, tx = gx, ty = gy;
    window.addEventListener("mousemove", (e) => { tx = e.clientX; ty = e.clientY; });
    (function follow() {
      gx += (tx - gx) * 0.08;
      gy += (ty - gy) * 0.08;
      glow.style.left = gx + "px";
      glow.style.top = gy + "px";
      requestAnimationFrame(follow);
    })();
  } else {
    glow.style.display = "none";
  }

  /* ---------- contact form: pre-fill mailto ---------- */
  const form = document.getElementById("contactForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    const subject = encodeURIComponent("Portfolio inquiry from " + name);
    const body = encodeURIComponent(message + "\n\n— " + name + " (" + email + ")");
    window.location.href = "mailto:pandalucky015@gmail.com?subject=" + subject + "&body=" + body;
  });

  /* ---------- footer year ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
