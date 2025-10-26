// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navList = document.getElementById('primary-menu');
if (navToggle && navList) {
  navToggle.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close mobile menu when a link is clicked
  navList.addEventListener('click', (e) => {
    const target = e.target;
    if (target instanceof HTMLAnchorElement) {
      navList.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// Dynamic year in footer
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

// Active link highlighting on scroll
const sections = Array.from(document.querySelectorAll('main section[id]'));
const menuLinks = Array.from(document.querySelectorAll('#primary-menu a'));
const byId = (id) => sections.find(s => s.id === id);

function updateActiveLink(){
  const fromTop = window.scrollY + 120; // header offset
  let current = sections[0]?.id;
  for (const section of sections){
    if (section.offsetTop <= fromTop) current = section.id;
  }
  for (const link of menuLinks){
    const href = link.getAttribute('href') || '';
    const id = href.startsWith('#') ? href.slice(1) : '';
    link.classList.toggle('is-active', id === current);
  }
}
window.addEventListener('scroll', () => {
  updateActiveLink();
});
window.addEventListener('load', updateActiveLink);

// Scroll reveal
const revealEls = Array.from(document.querySelectorAll('.reveal'));
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries){
      if (entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    }
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
  revealEls.forEach(el => io.observe(el));
} else {
  // Fallback
  revealEls.forEach(el => el.classList.add('is-visible'));
}

