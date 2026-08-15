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
      }, 900);
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

  // If there was an existing name transitioning out, delay the entry of the new name
  if (wrappers.length > 0) {
    pendingEntryTimeout = setTimeout(createNew, 220); // 220ms delay creates a fast sequential feel
  } else {
    createNew();
  }
}

// Initialize default name
setGiantName("MUNSOC", false);

// Attach listeners to profile images
profileContainers.forEach((container) => {
  const index = parseInt(container.getAttribute("data-index"));
  const firstName = container.getAttribute("data-first-name");
  const fullName = container.getAttribute("data-full-name");
  const role = container.getAttribute("data-role");

  container.addEventListener("pointerenter", () => {
    currentActiveIndex = index;
    
    // Add active scale to hovered container
    profileContainers.forEach(c => c.classList.remove("active"));
    container.classList.add("active");

    // Update displays
    roleDisplay.textContent = `${role} • ${fullName}`;
    roleDisplay.style.opacity = "1";
    setGiantName(firstName, true);
  });

  container.addEventListener("pointerleave", () => {
    // If we left and no other container is hovered, revert to default
    setTimeout(() => {
      if (currentActiveIndex === index) {
        currentActiveIndex = null;
        container.classList.remove("active");
        roleDisplay.textContent = "Hover a member to view role";
        setGiantName("MUNSOC", false);
      }
    }, 50);
  });
});
