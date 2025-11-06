// console.log("✅ auth.js loaded");

// document.addEventListener("DOMContentLoaded", () => {
//   const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
//   const userIcon = document.getElementById("userIcon");
//   const userCircleContainer = document.getElementById("userCircleContainer");
//   const userInitials = document.getElementById("userInitials");
//   const logoutBtn = document.getElementById("logoutBtn");

//   console.log("Loaded loggedInUser:", loggedInUser);

//   if (loggedInUser && loggedInUser.firstName && loggedInUser.lastName) {
//     const initials = loggedInUser.firstName[0] + loggedInUser.lastName[0];
//     userInitials.textContent = initials.toUpperCase();

//     userIcon.style.display = "none";
//     userCircleContainer.style.display = "flex";
//   } else {
//     console.log("No logged in user found");
//     userIcon.style.display = "inline";
//     userCircleContainer.style.display = "none";
//   }

//   logoutBtn.addEventListener("click", () => {
//     localStorage.removeItem("loggedInUser");
//     Swal.fire({
//       icon: "success",
//       title: "Logged out",
//       text: "You have been logged out successfully",
//       timer: 1500,
//       showConfirmButton: false
//     }).then(() => {
//       window.location.reload();
//     });
//   });
// });


























console.log("✅ auth.js loaded");

document.addEventListener("DOMContentLoaded", () => {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const userIcon = document.getElementById("userIcon");
  const userCircleContainer = document.getElementById("userCircleContainer");
  const userInitials = document.getElementById("userInitials");
  const logoutBtn = document.getElementById("logoutBtn");

  console.log("Loaded loggedInUser:", loggedInUser);

  if (loggedInUser && loggedInUser.firstName && loggedInUser.lastName) {
    // ✅ Show initials inside the circle
    const initials = loggedInUser.firstName[0] + loggedInUser.lastName[0];
    userInitials.textContent = initials.toUpperCase();

    // ✅ Show the circle and hide the default icon
    userIcon.style.display = "none";
    userCircleContainer.style.display = "flex";

    // ✅ Make the initials clickable → Go to account page
    userInitials.style.cursor = "pointer";
    userInitials.addEventListener("click", () => {
      window.location.href = "account.html";
    });

  } else {
    console.log("No logged in user found");
    userIcon.style.display = "inline";
    userCircleContainer.style.display = "none";
  }

  // ✅ Logout logic
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");

      Swal.fire({
        icon: "success",
        title: "Logged out",
        text: "You have been logged out successfully",
        timer: 1500,
        showConfirmButton: false
      }).then(() => {
        // After logout, go back to login page
        window.location.href = "login.html";
      });
    });
  }
});

