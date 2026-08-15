document.addEventListener("DOMContentLoaded", () => {
  const navPill = document.querySelector(".nav-pill");
  const navItems = Array.from(document.querySelectorAll(".nav-item"));
  const activeItem = document.querySelector(".nav-item.active");
  if (!navPill || !activeItem) return;

  // 1. Capture index when clicking any link
  navItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      const activeIndex = navItems.findIndex(el => el.classList.contains("active"));
      sessionStorage.setItem("prevNavIndex", String(activeIndex));
    });
  });

  // 2. Perform slide animation if returning from another page in this session
  const prevIndexStr = sessionStorage.getItem("prevNavIndex");
  if (prevIndexStr !== null) {
    const prevIndex = parseInt(prevIndexStr);
    sessionStorage.removeItem("prevNavIndex"); // Clear immediately to prevent repeat on manual refreshes

    const activeIndex = navItems.indexOf(activeItem);
    if (prevIndex >= 0 && prevIndex < navItems.length && prevIndex !== activeIndex) {
      const prevItem = navItems[prevIndex];

      // Create sliding indicator element
      const indicator = document.createElement("div");
      indicator.className = "nav-sliding-indicator";
      
      // Check if mobile viewport to apply mobile height/top padding configurations
      const isMobile = window.innerWidth < 768;
      const topOffset = isMobile ? 4 : 5; // Matches padding-top of mobile/desktop nav-pill
      indicator.style.top = `${topOffset}px`;
      indicator.style.height = isMobile ? "32px" : "36px";
      
      // Position indicator initially at previous item
      indicator.style.left = `${prevItem.offsetLeft}px`;
      indicator.style.width = `${prevItem.offsetWidth}px`;
      navPill.appendChild(indicator);

      // Temporarily clear default active background styling during slide transition
      activeItem.classList.add("temp-no-bg");

      // Force layout reflow to register initial styles before transition
      indicator.offsetHeight;

      // Animate sliding to current active item position/width
      indicator.style.left = `${activeItem.offsetLeft}px`;
      indicator.style.width = `${activeItem.offsetWidth}px`;

      // Cleanup and restore default active background after transition completes
      setTimeout(() => {
        indicator.remove();
        activeItem.classList.remove("temp-no-bg");
      }, 380);
    }
  }
});
