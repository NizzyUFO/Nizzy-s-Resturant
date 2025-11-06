// document.addEventListener("DOMContentLoaded", () => {
//   const user = JSON.parse(localStorage.getItem("loggedInUser"));

//   // Redirect if not logged in
//   // if (!user) {
//   //   window.location.href = "login.html";
//   //   return;
//   // }

//   // ✅ Combine first and last name correctly
//   const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();

//   // ✅ Display user name and email
//   document.getElementById("userName").textContent = `Welcome back, ${fullName} 👋`;
//   document.getElementById("userEmail").textContent = user.email;

//   // ✅ Generate initials from first and last name
//   const initials =
//     (user.firstName?.charAt(0) || "") + (user.lastName?.charAt(0) || "");
//   document.getElementById("userAvatar").textContent = initials.toUpperCase();

//   // ✅ Logout
//   document.getElementById("logoutBtn").addEventListener("click", () => {
//     localStorage.removeItem("loggedInUser");
//     window.location.href = "login.html";
//   });

//   // ✅ Button redirects (placeholder pages)
//   const buttons = document.querySelectorAll(".option-card .btn");
//   buttons[0].addEventListener("click", () => {
//     window.location.href = "addresses.html"; // Manage Saved Addresses
//   });
//   buttons[1].addEventListener("click", () => {
//     window.location.href = "orders.html"; // View Order History
//   });
//   buttons[2].addEventListener("click", () => {
//     window.location.href = "track.html"; // Track Deliveries
//   });
// });





document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  // Display user info
  const fullName = `${user.firstName || ""} ${user.lastName || ""}`.trim();
  document.getElementById("userName").textContent = `Welcome back, ${fullName} 👋`;
  document.getElementById("userEmail").textContent = user.email;
  const initials = (user.firstName?.charAt(0) || "") + (user.lastName?.charAt(0) || "");
  document.getElementById("userAvatar").textContent = initials.toUpperCase();

  // Logout
  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
  });

  // Button redirects
  const buttons = document.querySelectorAll(".option-card .btn");
  buttons[0].addEventListener("click", () => { window.location.href = "addresses.html"; });
  buttons[1].addEventListener("click", () => { openOrderHistoryModal(); });
  buttons[2].addEventListener("click", () => { window.location.href = "track.html"; });

  // === Order History Modal Logic ===
  const orderHistoryModal = document.getElementById("orderHistoryModal");
  const orderHistoryContent = document.getElementById("orderHistoryContent");
  const closeBtn = document.getElementById("closeOrderHistory");

  closeBtn.addEventListener("click", () => {
    orderHistoryModal.style.display = "none";
  });

  function openOrderHistoryModal() {
    const allOrders = JSON.parse(localStorage.getItem("userOrders") || "{}");
    const orders = allOrders[user.email] || [];

    if (!orders.length) {
      orderHistoryContent.innerHTML = `<p style="text-align:center; padding:20px;">No orders yet.</p>`;
    } else {
      orderHistoryContent.innerHTML = "";
      orders.reverse().forEach((order, i) => {
        const orderDiv = document.createElement("div");
        orderDiv.style.border = "1px solid #ccc";
        orderDiv.style.padding = "12px";
        orderDiv.style.marginBottom = "10px";
        orderDiv.style.borderRadius = "8px";

        let itemsHtml = "";
        order.items.forEach(it => {
          itemsHtml += `<li>${it.name} x ${it.quantity} - ₦${it.price.toLocaleString()}</li>`;
        });

        orderDiv.innerHTML = `
          <h4>Order #${orders.length - i} - ${new Date(order.date).toLocaleString()}</h4>
          <ul>${itemsHtml}</ul>
          <p><strong>Total:</strong> ₦${order.total.toLocaleString()}</p>
        `;
        orderHistoryContent.appendChild(orderDiv);
      });
    }

    orderHistoryModal.style.display = "block";
  }

  // Close modal when clicking outside content
  window.addEventListener("click", (e) => {
    if (e.target === orderHistoryModal) orderHistoryModal.style.display = "none";
  });
});






















// const user = JSON.parse(localStorage.getItem("loggedInUser"));
// if (user) {
//   const initials =
//     (user.firstName?.charAt(0) || "") + (user.lastName?.charAt(0) || "");
//   document.getElementById("userCircle").textContent = initials.toUpperCase();
// }
