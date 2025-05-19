async function includeHTML(id, file, callback) {
    const el = document.getElementById(id);
    if (el) {
      const res = await fetch(file);
      el.innerHTML = await res.text();
      if (callback) callback(); // ✅ call after content is inserted
    }
  }
  
  function setYear() {
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
  }
  
  window.addEventListener("DOMContentLoaded", () => {
    includeHTML("header", "includes/header.html");
    includeHTML("profile", "includes/profileCard.html");
    includeHTML("footer", "includes/footer.html", setYear);
  });
  