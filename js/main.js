// console.log("Hello World")
// var navLinks=document.getElementById("navLinks")
// function showMenu(){
//  navLinks.style.right="0";
// }
// function hideMenu(){
//  navLinks.style.right="-200px";
// }


// // Account setup
// let balance = 1000;
// let pin = "1234";

// //  Change PIN
// function changePin(oldPin, newPin) {
//   if (oldPin === pin) {
//     pin = newPin;
//     console.log(" PIN changed successfully to: " + pin);
//   } else {
//     console.log(" Incorrect old PIN. Try again.");
//   }
// }

// //  Deposit money
// function deposit(amount) {
//   if (amount > 0) {
//     balance += amount;
//     console.log(" You deposited $" + amount);
//   } else {
//     console.log(" Invalid deposit amount.");
//   }
// }

// //  Withdraw money
// function withdraw(amount) {
//   if (amount > 0 && amount <= balance) {
//     balance -= amount;
//     console.log(" You withdrew $" + amount);
//   } else {
//     console.log(" Cannot withdraw that amount.");
//   }
// }

// //  Check balance
// function checkBalance() {
//   console.log("Your current balance is $" + balance);
// }

// // checkBalance();         // Shows balance
// deposit();           // Add amount
// withdraw(200);          // Take out amount
// checkBalance();         // See new balance
// changePin("1234", "5678"); // Change the PIN
// -------------------------------------------------

// let balance = 1000;   // how much money we start with
// let pin     = "1234"; // the secret code to open the ATM

// startATM();           // kick things off!

// /* 1 – Main loop */
// function startATM() {
//   // Ask the user to enter their PIN
//   const enteredPin = prompt("Welcome to the ATM!\nPlease enter your PIN:");

//   // If PIN is wrong, stop everything
//   if (enteredPin !== pin) {
//     alert(" Incorrect PIN. Bye!");
//     return;                    // leave the function
//   }

//   // Show menu and ask what the user wants to do next
//   const choice = prompt(
//     " Login successful!\n"   +
//     "Choose an option:\n"     +
//     "1  Check balance\n"     +
//     "2  Deposit money\n"     +
//     "3  Withdraw money\n"    +
//     "4  Change PIN\n"         +
//     "5  Transfer money\n"    +
//     "6  Exit"
//   );

//   // Jump to the correct action
//   switch (choice) {
//     case "1":
//       checkBalance();
//       break;
//     case "2":
//       depositMoney();
//       break;
//     case "3":
//       withdrawMoney();
//       break;
//     case "4":
//       changePin();
//       break;
//     case "5":
//       transferMoney ();
//       break;
//     default:
//       alert(" Invalid option, try again.");
//       startATM();              // restart the menu
//   }
// }

// /* 2 – Show balance */
// function checkBalance() {
//   alert(` Your current balance is $${balance}`);
//   startATM();                  // go back to the menu
// }

// /* 3 – Add money */
// function depositMoney() {
//   const amount = Number(prompt("Enter amount to deposit:"));

//   if (amount > 0) {
//     balance += amount;
//     alert(` Deposited $${amount}`);
//   } else {
//   alert(" Deposit must be more than 0.");
// }
// startATM();
// }

// /* 4 – Take money out */
// function withdrawMoney() {
//   const amount = Number(prompt("Enter amount to withdraw:"));

//   if (amount <= 0) {
//     alert(" Withdrawal must be more than 0.");
//   } else if (amount > balance) {
//     alert(" Not enough funds.");
//   } else {
//     balance -= amount;
//     alert(` Withdrew $${amount}`);
//   }
//   startATM();
// }

// /* 5 – Change the PIN */
// function changePin() {
//   const oldPin = prompt("Enter your current PIN:");
//   if (oldPin !== pin) {
//     alert(" Wrong PIN.");
//   } else {
//     const newPin = prompt("Enter your new PIN (at least 4 digits):");
//     if (newPin.length < 4) {
//       alert(" PIN must be at least 4 digits.");
//     } else {
//       pin = newPin;
//       alert(" PIN changed successfully.");
//     }
//   }
//   startATM();
// }








// let balance = 1000;       // starting balance
// let pin = "1234";         // default PIN
// let history = "";         // activity history as a string

// mainMenu();               // start the ATM

// function mainMenu() {
//   const choice = prompt(
//     "ATM MENU\n" +
//     "1 - Check balance\n" +
//     "2 - Deposit money\n" +
//     "3 - Withdraw money\n" +
//     "4 - Transfer money\n" +
//     "5 - Change PIN\n" +
//     "6 - View activity history\n" +
//     "7 - Exit\n\n" +
//     "Choose an option:"
//   );

//   switch (choice) {
//     case "1":
//       askPinThen(checkBalance);
//       break;
//     case "2":
//       askPinThen(depositMoney);
//       break;
//     case "3":
//       askPinThen(withdrawMoney);
//       break;
//     case "4":
//       askPinThen(transferMoney);
//       break;
//     case "5":
//       askPinThen(changePin);
//       break;
//     case "6":
//       askPinThen(showHistory);
//       break;
//     case "7":
//       alert("Goodbye");
//       break;
//     default:
//       alert("Invalid option.");
//       mainMenu();
//   }
// }

// function askPinThen(action) {
//   const enteredPin = prompt("Enter your PIN:");
//   if (enteredPin === pin) {
//     action();
//   } else {
//     alert("WRONG PIN");
//   }
//   mainMenu();
// }

// function checkBalance() {
//   alert("Your balance is $" + balance);
//   history = history + "Checked balance: $" + balance + "\n";
// }

// function depositMoney() {
//   const amount = Number(prompt("Enter amount to deposit:"));
//   if (amount > 0) {
//     balance = balance + amount;
//     alert("Deposited $" + amount);
//     history = history + "Deposited: $" + amount + "\n";
//   } else {
//     alert("Amount must be more than 0.");
//   }
// }

// function withdrawMoney() {
//   const amount = Number(prompt("Enter amount to withdraw:"));
//   if (amount <= 0) {
//     alert("Amount must be more than 0.");
//   } else if (amount > balance) {
//     alert("Not enough funds.");
//   } else {
//     balance = balance - amount;
//     alert("Withdrew $" + amount);
//     history = history + "Withdrew: $" + amount + "\n";
//   }
// }   

// function transferMoney() {
//   const amount = Number(prompt("Enter amount to transfer:"));
//   if (amount <= 0) {
//     alert("Amount must be more than 0.");
//   } else if (amount > balance) {
//     alert("Not enough funds.");
//   } else {
//     const recipient = prompt("Enter recipient account name or number:");
//     balance = balance - amount;
//     alert("Transferred $" + amount + " to " + recipient);
//     history = history + "Transferred: $" + amount + " to " + recipient + "\n";
//   }
// }

// function changePin() {
//   const newPin = prompt("Enter new PIN (at least 4 digits):");
//   if (newPin && newPin.length >= 4) {
//     pin = newPin;
//     alert("PIN changed.");
//     history = history + "Changed PIN\n";
//   } else {
//     alert("PIN must be at least 4 digits.");
//   }
// }

// function showHistory() {
//   if (history === "") {
//     alert("No activity yet.");
//   } else {
//     alert("Activity history:\n\n" + history);
//   }
// }









// let name=["Nizzy", "Joe"]
// alert(name)

// name.push("Temi")




// OBJECTS
// let person={
//   Firstname:"Nizzy",
//   Lastname:"Joe",
//   Email: "temi@godswill.laughter",
//   Age:100,
//   speakName: function speakName(){
//      alert( " My name is " + this.Firstname + " " + this.Lastname)
//   },
//   // changeFirstName: function changeName(First_name) {
//   //   this.Firstname="tomzie"
//   // }
// }

// person.speakName()






// function change(){
//   alert(" My name is " + person.Firstname + " " + person.Lastname)
// }

// change()















let balance = 1000;
let pin = "1234";
let history = "";

let items = {
  milk: { price: 100, quantity: 6 },
  cornflakes: { price: 500, quantity: 2 },
  chocolatebars: { price: 1000, quantity: 3 },
  noodles: { price: 300, quantity: 5 }
};

let role = prompt(
  "Welcome to Nizzy's groceries!\nAre you an admin or user?\n" +
  "1 - Admin\n" +
  "2 - User"
);

if (role !== "1" && role !== "2") {
  alert("Invalid role. Please restart.");
} else {
  let enteredPin = prompt("Enter your 4-digit PIN:");

  if (enteredPin === pin) {
    if (role === "1") {
      adminMenu();
    } else {
      userMenu();
    }
  } else {
    alert("Incorrect PIN. Goodbye.");
  }
}

// ADMIN MENU
function adminMenu() {
  let choice = prompt(
    "ADMIN MENU\n" +
    "1 - View Items\n" +
    "2 - View History\n" +
    "3 - Change PIN\n" +
    "4 - Exit"
  );

  if (choice === "1") {
    viewItems("Admin");
    adminMenu();
  } else if (choice === "2") {
    viewHistory();
    adminMenu();
  } else if (choice === "3") {
    changePin();
    adminMenu();
  } else if (choice === "4") {
    alert("Goodbye!");
  } else {
    alert("Invalid option.");
    adminMenu();
  }
}

// USER MENU
function userMenu() {
  let choice = prompt(
    "USER MENU\n" +
    "1 - View Items\n" +
    "2 - Buy Item\n" +
    "3 - View History\n" +
    "4 - Change PIN\n" +
    "5 - Exit"
  );

  if (choice === "1") {
    viewItems("User");
    userMenu();
  } else if (choice === "2") {
    buyItem();
    userMenu();
  } else if (choice === "3") {
    viewHistory();
    userMenu();
  } else if (choice === "4") {
    changePin();
    userMenu();
  } else if (choice === "5") {
    alert("Goodbye!");
  } else {
    alert("Invalid option.");
    userMenu();
  }
}

// View Grocery Items
function viewItems(who) {
  let list = who + " Grocery List:\n\n";
  let number = 1;

  for (let item in items) {
    list += number + " - " + item +
      " [$" + items[item].price +
      ", Qty: " + items[item].quantity + "]\n";
    number++;
  }

  alert(list);
  history += who + " viewed items\n";
}

// Buy an Item
function buyItem() {
  let list = "What would you like to buy?\n\n";
  let number = 1;
  let itemNumbers = [];

  for (let item in items) {
    list += number + " - " + item +
      " [$" + items[item].price +
      ", Qty: " + items[item].quantity + "]\n";
    itemNumbers.push(item);
    number++;
  }

  let choice = prompt(list + "\nEnter the number of the item:");
  let index = choice - 1;
  let selectedItem = itemNumbers[index];

  if (!selectedItem) {
    alert("Invalid number.");
    return;
  }

  let qty = prompt("How many " + selectedItem + "(s) do you want?");

  if (qty > items[selectedItem].quantity) {
    alert("Not enough in stock.");
    return;
  }

  let total = items[selectedItem].price * qty;

  if (total > balance) {
    alert("Not enough money. You have $" + balance);
    return;
  }

  // successful purchase
  items[selectedItem].quantity -= qty;
  balance -= total;
  history += "Bought " + qty + " " + selectedItem + "(s) for $" + total + "\n";

  alert(
    "You bought " + qty + " " + selectedItem +
    "(s) for $" + total + ".\nYour new balance: $" + balance
  );
}

// View History
function viewHistory() {
  if (history === "") {
    alert("No activities yet.");
  } else {
    alert("ACTIVITY HISTORY:\n\n" + history);
  }
}

// Change PIN
function changePin() {
  let oldPin = prompt("Enter your current PIN:");

  if (oldPin !== pin) {
    alert("Wrong PIN.");
    return;
  }

  let newPin = prompt("Enter new 4-digit PIN:");
  pin = newPin;
  history += "PIN changed\n";
  alert("PIN successfully changed!");
}
