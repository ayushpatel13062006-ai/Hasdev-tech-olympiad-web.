// Single-page section switching
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".nav-link");
  const homeSection = document.getElementById("home-section");
  const statsBar = document.getElementById("stats-bar");
  const innerSections = document.querySelectorAll(".inner-section");
  const topNavLinks = document.querySelectorAll(".nav-links a");

  function showSection(targetId) {
    // Hide home + stats
    homeSection.style.display = "none";
    statsBar.style.display = "none";

    // Hide all inner sections
    innerSections.forEach((sec) => (sec.style.display = "none"));

    if (targetId === "home-section") {
      homeSection.style.display = "flex";
      statsBar.style.display = "grid";
    } else {
      const target = document.getElementById(targetId);
      if (target) target.style.display = "flex";
    }

    // Update active state on top nav only
    topNavLinks.forEach((l) => l.classList.remove("active"));
    const activeTopLink = document.querySelector(
      `.nav-links a[data-target="${targetId}"]`
    );
    if (activeTopLink) activeTopLink.classList.add("active");

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.getAttribute("data-target");
      if (target) showSection(target);
    });
  });

  // Connect register form to backend API
  const registerForm = document.querySelector(".register-form");
  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const submitBtn = registerForm.querySelector(".submit-btn");
      const originalBtnText = submitBtn ? submitBtn.innerHTML : "";
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = "Submitting...";
      }

      const formData = {
        fullName: registerForm.fullName.value,
        email: registerForm.email.value,
        mobile: registerForm.mobile.value,
        institute: registerForm.institute.value,
        course: registerForm.course.value,
        year: registerForm.year.value,
        rollNumber: registerForm.rollNumber.value,
      };

      try {
        const response = await fetch("http://localhost:5000/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok) {
          alert("Registration successful! You're all set for HTCO 2026.");
          registerForm.reset();
        } else {
          alert("Something went wrong: " + (result.message || "Please try again."));
        }
      } catch (err) {
        alert("Could not connect to the server. Please make sure the backend is running.");
        console.error(err);
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }
      }
    });
  }
});