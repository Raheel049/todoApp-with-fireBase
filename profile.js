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
    const newImg = document.getElementById("newImg")

    firstName.value = userData.data().firstName;
    lastName.value = userData.data().lastName;
    email.value = userData.data().email;
    phoneNo.value = userData.data().phoneNo;
    DOB.value = userData.data().DOB;
    newImg.src = userData.data().imgUrl;
    

}

    const updateUserData = async () => {
        // console.log("updateUserData")
        try {
            const efirstName = document.getElementById("firstName")
            const elastName = document.getElementById("lastName")
            const ephoneNo = document.getElementById("phoneNo")

    const userUid = localStorage.getItem("user")



        const updatedObj = {
            firstName : efirstName.value,
            lastName : elastName.value,
            phoneNo : ephoneNo.value
        }

    await updateDoc(doc(db, "users", userUid), updatedObj)
    alert("data add successfully")
        } catch (error) {
            console.log("Error updating user", error)
        }

    }


    const fileHandlerPic = async () => {
        try {
            console.log("hello file")
        console.log("profileImg",profileImg.files[0])
        const file = profileImg.files[0]

        const formData = new FormData()
        formData.append("file", file)
        formData.append("upload_preset", "paraticeImg")

        const response = await fetch(`https://api.cloudinary.com/v1_1/dczwggcc9/upload`,{
            method: "POST",
            body: formData,
        }).then((response) => response.json())

        console.log("path", response.secure_url)

        const userUid = localStorage.getItem("user")
        await updateDoc(doc(db, "users", userUid),{
            imgUrl : response.secure_url
        })
        fetchUserData();
        } catch (error) {
            console.log("error", error)
        }
        
    }


    window.fileHandlerPic = fileHandlerPic

    window.updateUserData = updateUserData
window.fetchUserData = fetchUserData
