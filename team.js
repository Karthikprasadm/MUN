const profileRow = document.getElementById("profile-row");
const roleDisplay = document.getElementById("role-display");
const giantTextContainer = document.getElementById("giant-text-container");
const profileContainers = document.querySelectorAll(".profile-img-container");

// Manage active names and transitions
let currentActiveIndex = null;
let pendingEntryTimeout = null;

function setGiantName(name, isActiveMember) {
  if (pendingEntryTimeout) {
    clearTimeout(pendingEntryTimeout);
    pendingEntryTimeout = null;
  }

  // Find all current wrappers
  const wrappers = giantTextContainer.querySelectorAll(".name-wrapper");
  
  // If the latest wrapper is already displaying the same name, do nothing
  if (wrappers.length > 0) {
    const latest = wrappers[wrappers.length - 1];
    if (latest.dataset.name === name && !latest.classList.contains("slide-out")) {
      return;
    }
  }

  // Mark all existing wrappers as slide-out
  wrappers.forEach((w, i) => {
    w.classList.remove("slide-in");
    w.classList.add("slide-out");
    
    // If there are multiple wrappers, remove older ones immediately to prevent clumping
    if (i < wrappers.length - 1) {
      w.remove();
    } else {
      setTimeout(() => {
        w.remove();
      }, 600);
    }
  });

  // Function to create and slide in the new name
  const createNew = () => {
    const newWrapper = document.createElement("div");
    newWrapper.className = "name-wrapper"; // Start without slide-in to trigger transition
    newWrapper.dataset.name = name;

    const h1 = document.createElement("h1");
    h1.className = `giant-name ${isActiveMember ? "active-member" : "default"}`;

    const chars = Array.from(name);
    let html = "";
    chars.forEach((char, index) => {
      // Stagger transition starting from the center outward
      const delay = 0.035 * Math.abs(index - Math.floor(chars.length / 2));
      const letterClass = char === " " ? "letter space" : "letter";
      const letterVal = char === " " ? "&nbsp;" : char;
      html += `<span class="${letterClass}" style="transition-delay: ${delay}s">${letterVal}</span>`;
    });

    h1.innerHTML = html;
    newWrapper.appendChild(h1);
    giantTextContainer.appendChild(newWrapper);

    // Force reflow and activate slide-in transition
    newWrapper.offsetHeight;
    newWrapper.classList.add("slide-in");
  };

  // If there was an existing name transitioning out, delay the entry of the new name until it is completely hidden
  if (wrappers.length > 0) {
    pendingEntryTimeout = setTimeout(createNew, 500); // 500ms delay balances snappiness with complete clearance
  } else {
    createNew();
  }
}

// Initialize default name
setGiantName("RNS'MUN", false);

// Set helper label text dynamically based on viewport size
if (window.innerWidth < 768) {
  roleDisplay.textContent = "Tap a member to view role";
}

// Helper: check if we are on a mobile viewport or a touch screen
const isTouchOrMobile = () => {
  return window.innerWidth < 768 || window.matchMedia("(pointer: coarse)").matches;
};

// Function to update the magnetic ripple sizes and positions
function updateMagneticRipple(activeIndex) {
  const isMobile = window.innerWidth < 768;
  
  profileContainers.forEach((container, i) => {
    if (activeIndex === null) {
      // Revert to defaults by removing inline styles
      container.style.removeProperty("--profile-w");
      container.style.removeProperty("--profile-h");
      container.style.removeProperty("--profile-tx");
      container.style.removeProperty("opacity");
      return;
    }
    
    const distance = Math.abs(i - activeIndex);
    const direction = Math.sign(i - activeIndex);
    
    if (distance === 0) {
      // Active centered focused card
      if (isMobile) {
        container.style.setProperty("--profile-w", "31vw");
        container.style.setProperty("--profile-h", "31vw");
      } else {
        container.style.setProperty("--profile-w", "150px");
        container.style.setProperty("--profile-h", "150px");
      }
      container.style.setProperty("--profile-tx", "0px");
      container.style.setProperty("opacity", "1");
    } else {
      // Inactive ripple cards
      if (isMobile) {
        // Enforce ascending tininess based on 18vw (closest is 16vw, further is smaller: 14vw, 12vw, 10vw)
        const size = 18 - (distance * 2);
        // Magnetic repulsion push: direction * (2.5vw base + step offset)
        const tx = direction * (2.5 + (distance - 1) * 1.5);
        container.style.setProperty("--profile-w", `${size}vw`);
        container.style.setProperty("--profile-h", `${size}vw`);
        container.style.setProperty("--profile-tx", `${tx}vw`);
      } else {
        // Desktop ripple sizes based on new 95px default (closest is 90px, further is smaller: 85px, 80px, 75px)
        const size = 95 - (distance * 5);
        // Desktop magnetic push
        const tx = direction * (12 + (distance - 1) * 8);
        container.style.setProperty("--profile-w", `${size}px`);
        container.style.setProperty("--profile-h", `${size}px`);
        container.style.setProperty("--profile-tx", `${tx}px`);
      }
      // Soft fade out depending on distance
      container.style.setProperty("opacity", String(1 - (distance * 0.12)));
    }
  });
}

// Function to activate a team member profile
function activateMember(container, index, firstName, fullName, role) {
  currentActiveIndex = index;
  
  // Add active class to selected container
  profileContainers.forEach(c => c.classList.remove("active"));
  container.classList.add("active");

  // Apply fluid magnetic ripple sizes and translates
  updateMagneticRipple(index);

  // Update displays
  roleDisplay.textContent = `${role} • ${fullName}`;
  roleDisplay.style.opacity = "1";
  setGiantName(firstName, true);
}

// Function to deactivate and revert to RNS'MUN default
function deactivateAll() {
  currentActiveIndex = null;
  profileContainers.forEach(c => c.classList.remove("active"));
  
  // Revert all profile translations and sizes back to original layout
  updateMagneticRipple(null);

  roleDisplay.textContent = isTouchOrMobile() ? "Tap a member to view role" : "Hover a member to view role";
  setGiantName("RNS'MUN", false);
}

// Attach listeners to profile images
profileContainers.forEach((container) => {
  const index = parseInt(container.getAttribute("data-index"));
  const firstName = container.getAttribute("data-first-name");
  const fullName = container.getAttribute("data-full-name");
  const role = container.getAttribute("data-role");

  // Pointer Enter (Desktop Hover only)
  container.addEventListener("pointerenter", () => {
    if (isTouchOrMobile()) return;
    activateMember(container, index, firstName, fullName, role);
  });

  // Pointer Leave (Desktop Hover only)
  container.addEventListener("pointerleave", () => {
    if (isTouchOrMobile()) return;
    setTimeout(() => {
      if (currentActiveIndex === index) {
        deactivateAll();
      }
    }, 50);
  });

  // Click / Tap (Mobile Touch support & click toggle)
  container.addEventListener("click", (e) => {
    e.stopPropagation(); // Avoid triggering document click revert
    if (currentActiveIndex === index) {
      deactivateAll();
    } else {
      activateMember(container, index, firstName, fullName, role);
    }
  });
});

// Revert to default when tapping/clicking anywhere outside the profile row
document.addEventListener("click", (e) => {
  if (currentActiveIndex !== null && !profileRow.contains(e.target)) {
    deactivateAll();
  }
});
