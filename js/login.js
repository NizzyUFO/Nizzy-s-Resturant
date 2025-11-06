// document.addEventListener("DOMContentLoaded", () => {
//   const loginForm = document.getElementById("loginForm");
//   if (!loginForm) return;

//   loginForm.addEventListener("submit", (e) => {
//     e.preventDefault();

//     const email = document.getElementById("loginEmail").value.trim();
//     const password = document.getElementById("loginPassword").value.trim();

//     const savedUser = JSON.parse(localStorage.getItem("SavedUsers")); //retieve with the key saved to LS during reg

//     if (!savedUser) {
//       Swal.fire({
//         icon: "error",
//         title: "No Account Found",
//         text: "Please sign up first!",
//         showConfirmButton: false,
//         timer: 2000
//       });
//       return;
//     }


//     for (acct in savedUser){
//       let user = savedUser[acct];
//       if (user["userEmail"] == email && user["userPassword"] == password){
//         Swal.fire({
//           icon: "success",
//           title: "Login Successful!",
//           text: "Redirecting to Dashboard",
//           timer: 2000,
//           showConfirmButton: false
//         }).then(() => {

//           let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"))
//           if (!loggedInUser){
//             loggedInUser = []
//             let newLoggedInUser = acct

//             // save
//             loggedInUser.push(newLoggedInUser);
//             localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

//           } else {
//             if (loggedInUser.includes(acct)){
//               // redirect
//               window.location.href = "food.html";
//             } else {
//               let newLoggedInUser = acct

//               // save
//               loggedInUser.push(newLoggedInUser);
//               localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

//               window.location.href = "food.html";
//             }
//           }


//           // if (loggedInUser){
//           //   for (user in loggedInUser){
//           //     if (loggedInUser[user] == email){
//           //       window.location.href = "food.html";
//           //       break
//           //     } 
//           //   }
//           // }



//           // window.location.href = "food.html";
//         });
//         break;
//       }
      
//     }







































    

    // if (savedUser.email === email && savedUser.password === password) {
    //   const loggedInUser = {
    //     firstName: savedUser.firstName,
    //     lastName: savedUser.lastName
    //   };
    //   localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

    //   // Update navbar instantly
    //   // if (typeof renderUserIcon === "function") renderUserIcon();

    //   Swal.fire({
    //     icon: "success",
    //     title: "Login Successful!",
    //     showConfirmButton: false,
    //     timer: 1500
    //   }).then(() => {
    //     const redirect = localStorage.getItem("redirectAfterLogin");
    //     if (redirect) {
    //       localStorage.removeItem("redirectAfterLogin");
    //       window.location.href = redirect;
    //     } else {
    //       window.location.href = "food.html";
    //     }
    //   });
    // } else {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Login Failed",
    //     text: "Invalid email or password.",
    //     showConfirmButton: false,
    //     timer: 2000
    //   });
    // }
  //});
//});
















document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  if (!loginForm) return;

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    const savedUsers = JSON.parse(localStorage.getItem("SavedUsers")) || [];

    if (savedUsers.length === 0) {
      Swal.fire({
        icon: "error",
        title: "No Account Found",
        text: "Please sign up first!",
        timer: 2000,
        showConfirmButton: false
      });
      return;
    }

    // find user
    const user = savedUsers.find(
      u => u.userEmail === email && u.userPassword === password
    );

    if (user) {
      // save logged-in user object
      const loggedInUser = {
        firstName: user.userFirstName,
        lastName: user.userLastName,
        email: user.userEmail
      };

      localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "Redirecting to Home...",
        timer: 1500,
        showConfirmButton: false
      }).then(() => {
        window.location.href = "food.html"; // change to your home page
      });

    } else {
      Swal.fire({
        icon: "error",
        title: "Invalid Credentials",
        text: "Email or password is incorrect!",
        timer: 2000,
        showConfirmButton: false
      });
    }
  });
});

