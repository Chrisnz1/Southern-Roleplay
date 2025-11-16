// Tab switching + NUI integration
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");
  const tabs = document.querySelectorAll(".tab-content");
  const closeBtn = document.getElementById("close-nui");

  navLinks.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-tab");

      navLinks.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      tabs.forEach((tab) => {
        tab.classList.toggle("active", tab.id === target);
      });
    });
  });

  // Set current year in footer
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Close button for NUI (does nothing in normal browser)
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      try {
        fetch(`https://${GetParentResourceName()}/close`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({}),
        });
      } catch (e) {
        console.log("Close clicked (browser mode)", e);
      }
    });
  }

  // Listen for open messages from client (optional)
  window.addEventListener("message", (event) => {
    if (event.data && event.data.type === "open") {
      document.body.style.display = "flex";
    }
  });
});
