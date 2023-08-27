import { db } from "../config.js";
import { getDocs, collection } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js";

const baseUrl = "http://16.16.88.130:5600"

async function getUser(username, password) {
  const querySnapshot = await getDocs(collection(db, "users"));
  const users = [];

  querySnapshot.forEach((doc) => {
    users.push({ id: doc.id, data: doc.data() });
  });

  const user = users.find((user) => {
    return user.data.username === username && user.data.password === password;
  });

  if (user) {
    // User with matching username and password found
    localStorage.setItem('userId', user.id);
    window.location.replace('voting/voting.html')
    // Perform any success actions here
  } else {
    // No user found
    console.log("User not found");
    // Show an alert
    alert("Invalid username or password");
  }
}

document.addEventListener("DOMContentLoaded", function () {
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const loginButton = document.querySelector(".btn-login");
    
    console.log(loginButton)

    loginButton.addEventListener("click", function (event) {
      event.preventDefault();

      const username = usernameInput.value;
      const password = passwordInput.value;

      getUser(username, password)
    });
  });


  // db.collection('users').get().then(querySnapshot => {
  //   querySnapshot.array.forEach(element => {
  //     console.log(element);
  //   });
  // })