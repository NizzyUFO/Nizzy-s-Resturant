document.getElementById("signupForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();

  if (password.length < 6) {
    Swal.fire({
      icon: "warning",
      title: "Weak Password",
      text: "Password must be at least 6 characters long",
      timer: 2000,
      showConfirmButton: false
    });
    return;
  }

  if (!firstName || !lastName || !email || !password) {
      return Swal.fire({ icon: 'warning', title: 'Missing details', text: 'Please fill in all fields.' });
  }

  // load existing users
  let Savedusers = JSON.parse(localStorage.getItem('SavedUsers'));

  // check duplicate email
  if (!Savedusers){
    Savedusers = []
    let newUser = {
      userFirstName: firstName,
      userLastName: lastName,
      userEmail: email,
      userPassword: password
    }

    // save
    Savedusers.push(newUser);
    localStorage.setItem('SavedUsers', JSON.stringify(Savedusers));
  } else  {
    for (acct in Savedusers){
      let user = Savedusers[acct];
      if (user["userEmail"] == email){
        return Swal.fire({ icon: 'info', title: 'Already registered', text: 'That email is already in use.' });
      } else {
        let newUser = {
          userFirstName: firstName,
          userLastName: lastName,
          userEmail: email,
          userPassword: password
        }
        Savedusers.push(newUser);
        localStorage.setItem('SavedUsers', JSON.stringify(Savedusers));
      }
    }
  }


  Swal.fire({
    icon: "success",
    title: "Registration Successful!",
    text: "You can now log in",
    timer: 2000,
    showConfirmButton: false
  }).then(() => {
    window.location.href = "login.html";
  });
});




// reg.js
// document.addEventListener('DOMContentLoaded', () => {
//   const form = document.getElementById('regForm');
//   if (!form) return;

//   form.addEventListener('submit', (e) => {
//     e.preventDefault();

//     const firstName = document.getElementById('firstName').value.trim();
//     const lastName = document.getElementById('lastName').value.trim();
//     const email = document.getElementById('regEmail').value.trim().toLowerCase();
//     const password = document.getElementById('regPassword').value;

//     console.log("Hereeeee")
//     console.log(firstName)
//     // validations
//     if (!firstName || !lastName || !email || !password) {
//       return Swal.fire({ icon: 'warning', title: 'Missing details', text: 'Please fill in all fields.' });
//     }
//     if (password.length < 6) {
//       return Swal.fire({ icon: 'error', title: 'Weak password', text: 'Password must be at least 6 characters.' });
//     }

//     // load existing users
//     const Savedusers = JSON.parse(localStorage.getItem('SavedUsers'));

//     // check duplicate email
//     let newUser;
//     console.log("Here 1")
//     if (!Savedusers){
//       console.log("Here 2")
//       Savedusers = []
//       newUser = {
//         userFirstName: firstName,
//         userLastName: lastName,
//         userEmail: email,
//         userPassword: password
//       }
//     }  else  {
//       console.log("Here 3")
//       for (acct in Savedusers){
//         let user = Savedusers[acct];
//         console.log(user)
//         console.log(user["email"])
//         console.log(user["password"] )
//         if (user["email"] == email){
//           return Swal.fire({ icon: 'info', title: 'Already registered', text: 'That email is already in use.' });
          
//         }
//       }
//     }

//     // save
//     Savedusers.push(newUser);
//     localStorage.setItem('SavedUsers', JSON.stringify(Savedusers));

//     Swal.fire({ icon: 'success', title: 'Registration successful', text: 'You can now log in.', timer: 1500, showConfirmButton: false });

//     const LoadSavedusers = JSON.parse(localStorage.getItem('SavedUsers'));
//     console.log(LoadSavedusers)

//     // setTimeout(() => {
//     //   window.location.href = 'login.html';
//     // }, 1500);
//   });
// });
