import { app, signInWithEmailAndPassword, auth } from "./fireBase.js";
// console.log(app)

const authCheck = () => {
  // console.log("authCheck");
  const userUid = localStorage.getItem("user");
  if(userUid){
    window.location.replace("./dashbord.html")
  }
}

window.authCheck = authCheck;


const loginHandler = async () => {
  try {
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    if (!email.value || !password.value) {
      alert("Enter email and password");
      return;
    }

    const response = await signInWithEmailAndPassword(
      auth,
      email.value,
      password.value
    );

    console.log("response", response.user.uid);
    localStorage.setItem("user", response.user.uid);
    window.location.replace("./dashbord.html");
  } catch (error) {
    alert("error", error.message);
  }
};

window.loginHandler = loginHandler;
