user = Number(prompt("(1) Admin -------------- (2) customer"))

if (user == 1){
    adminMenu()
} else if (user == 2){
    customerMenu()
} else{
    console.log("invaild option...")
}

