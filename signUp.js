import { addDoc, auth, collection, createUserWithEmailAndPassword, db, doc, setDoc } from "./fireBase.js";
// console.log(auth);

const signUpHandler = async () =>{
    // console.log("hello")

try {
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const phoneNo = document.getElementById("phoneNo");
    const DOB = document.getElementById("DOB");

    const response = await createUserWithEmailAndPassword(auth,email.value,password.value);
    console.log("responce",response)

    const userUId = response.user.uid;

    const userObj = {
        firstName : firstName.value,
        lastName : lastName.value,
        email : email.value,
        password : password.value,
        uid : response.user.uid,
        phoneNo : phoneNo.value,
        DOB : DOB.value,
    }

    // const userRes = await addDoc(collection(db, "users"), userObj);
    const userRes = await setDoc(doc(db, "users", userUId), userObj);
    console.log("userRes",userRes)
    window.location.assign("/index.html")

} catch (error) {
    console.log("error",error.message)
}




}

window.signUpHandler = signUpHandler
