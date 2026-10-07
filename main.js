async function includeHTML(id, file, callback) {
  const el = document.getElementById(id);
  if (!el) return;
  try {
    const res = await fetch(file, { cache: "no-cache" });
    if (!res.ok) throw new Error(`Could not load ${file}`);
    el.innerHTML = await res.text();
    if (callback) callback();
  } catch (error) {
    console.error(error);
    if (id === 'header') el.innerHTML = '<nav aria-label="Main navigation"><a href="/">About</a> · <a href="/cv.html">CV</a> · <a href="/publications.html">Research</a> · <a href="/teaching.html">Teaching</a> · <a href="/pr.html">Press &amp; honours</a> · <a href="/hobbies.html">Beyond research</a></nav>';
  }
}
function setYear() {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
}
function setActivePage() {
  const path = location.pathname.replace(/index\.html$/, '');
  document.querySelectorAll('.top-nav a').forEach(link => {
    if (new URL(link.href).pathname === path) link.setAttribute('aria-current', 'page');
  });
}
window.addEventListener('DOMContentLoaded', () => {
  includeHTML('header', '/includes/header.html', setActivePage);
  includeHTML('profile', '/includes/profileCard.html');
  includeHTML('footer', '/includes/footer.html', setYear);
});
