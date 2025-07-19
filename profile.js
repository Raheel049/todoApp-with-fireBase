console.log("hello world");

import { getDoc, db, doc, updateDoc,  } from "./fireBase.js";

const fetchUserData = async () =>{
    const userUid = localStorage.getItem("user")
    console.log("user", userUid)

   const userData = await getDoc(doc(db, "users", userUid))
   console.log("userData",userData.data())

    const firstName = document.getElementById("firstName")
    const lastName = document.getElementById("lastName")
    const email = document.getElementById("email")
    const DOB = document.getElementById("DOB")
    const phoneNo = document.getElementById("phoneNo")

    firstName.value = userData.data().firstName;
    lastName.value = userData.data().lastName;
    email.value = userData.data().email;
    phoneNo.value = userData.data().phoneNo;
    DOB.value = userData.data().DOB;
    

}

const updataProfileFirstName = async () =>{
    console.log("updateProfileData");
    const editedName = prompt("Enter Updated first name")
    
    const userUid = localStorage.getItem("user")
    const updatedObj = {
        firstName : editedName,
    }

    await updateDoc(doc(db, "users", userUid), updatedObj);
    fetchUserData();

    

}

const updateProfileLastName = async() => {
    console.log("updateProfileLastName",updateProfileLastName)

    const editedLastName = prompt("ENter your last Name")
    const userUid  = localStorage.getItem("user")

    const updatedObj = {
        lastName : editedLastName,
    } 

    await updateDoc(doc(db, "users", userUid), updatedObj);
    fetchUserData();
}

window.updataProfileFirstName = updataProfileFirstName
window.fetchUserData = fetchUserData
window.updateProfileLastName = updateProfileLastName