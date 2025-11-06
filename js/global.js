// js/global.js

document.addEventListener("DOMContentLoaded", () => {
  // ===== CART COUNT =====
  const cartCountEl = document.getElementById("cart-count");

  function getCart() {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  }

  function updateCartBadge() {
    if (!cartCountEl) return;
    const cart = getCart();
    const count = cart.length;
    cartCountEl.textContent = count;
    cartCountEl.style.display = count > 0 ? "inline-block" : "none";
  }

  updateCartBadge(); // refresh count immediately


  // ===== USER LOGIN DISPLAY =====
  const userIcon = document.getElementById("userIcon");
  const userCircle = document.getElementById("userCircle");
  const logoutBtn = document.getElementById("logoutBtn");

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  // If user is logged in
  if (loggedInUser && loggedInUser.firstName) {
    if (userIcon) userIcon.style.display = "none";
    if (userCircle) {
      userCircle.style.display = "inline-flex";
      userCircle.textContent = loggedInUser.firstName.charAt(0).toUpperCase();
    }
    if (logoutBtn) logoutBtn.style.display = "inline-block";
  } else {
    // Not logged in
    if (userIcon) userIcon.style.display = "inline-block";
    if (userCircle) userCircle.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "none";
  }

  // ===== USER ICON CLICK =====
  if (userIcon) {
    userIcon.addEventListener("click", () => {
      window.location.href = "login.html";
    });
  }

  // ===== LOGOUT BUTTON =====
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      Swal.fire({
        icon: "success",
        title: "You have been logged out",
        showConfirmButton: false,
        timer: 1500,
      });
      localStorage.removeItem("loggedInUser");
      setTimeout(() => {
        if (userCircle) userCircle.style.display = "none";
        if (logoutBtn) logoutBtn.style.display = "none";
        if (userIcon) userIcon.style.display = "inline-block";
      }, 1500);
    });
  }
});
