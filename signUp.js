// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvSSEilsQaCfjUTUxTywXXHj7KBHvSsBM",
  authDomain: "smit-batch14-f4b72.firebaseapp.com",
  projectId: "smit-batch14-f4b72",
  storageBucket: "smit-batch14-f4b72.firebasestorage.app",
  messagingSenderId: "327090670250",
  appId: "1:327090670250:web:d4bf68c1ddec982f83ded3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const auth = getAuth()


const signUpBtn = document.querySelector("#signUpBtn")
signUpBtn.addEventListener("click",signUp)

async function signUp(){
  // console.log("hello")
try {
  const firstName = document.getElementById("firstName").value
const lastName = document.getElementById("lastName").value 
const email = document.getElementById("email").value 
const password = document.getElementById("password").value


const userAuth = await createUserWithEmailAndPassword(auth,email,password)
console.log(userAuth.user.uid,"user")
const uid = userAuth.user.uid

const userObj = {
  firstName,
  lastName,
  email,
  accountActive : true,
  uid
}
console.log(userObj)

const userRef = doc(db, "user", uid);
const userDB = await setDoc(userRef,userObj)
console.log("userDB",userDB)

window.location.assign("/login.html")



} catch (error) {
  console.log("error",error)
}


}




