// import { deleteDoc, doc, db, getDocs, collection, query  } from "./fireBase.js";

// const logoutHandler = async () =>{
//     console.log("logout")

//     const userUid = localStorage.getItem("user");

//     await deleteDoc(doc(db, "users", userUid))

//     const todoRef = collection(db, "todos");
//     const q = query(todoRef, where("uid", "==", userUid));
//     querySnapShot = await getDocs(q)
//     console.log("q",q)


//     window.location.replace("./index.html");
    
// }

// window.logoutHandler = logoutHandler


import { collection, db, query, where, getDocs,getDoc, deleteDoc, doc, auth, deleteUser, EmailAuthProvider, reauthenticateWithCredential } from "/firebase.js";

const logoutBtn = document.getElementById("logoutBtn")
logoutBtn.addEventListner("click", logoutHandler)

const logoutHandler = async () => {
  console.log("Logging out...");

  const userUid = localStorage.getItem("user");
  if (!userUid) {
    console.warn("No user UID found in localStorage.");
    return;
  }

  try {
    const userDataSnap = await getDoc(doc(db, "users", userUid));
    const userData = userDataSnap.data();

    if (!userData) {
      console.error("User data not found in Firestore.");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      console.error("No authenticated Firebase user.");
      return;
    }

    // Reauthenticate
    try {
      const credential = EmailAuthProvider.credential(userData.email, userData.password);
      await reauthenticateWithCredential(user, credential);
      console.log("Reauthenticated.");
    } catch (reauthError) {
      console.error("Reauthentication failed:", reauthError);
      return;
    }

    // Delete user from Firebase Auth
    try {
      await deleteUser(user);
      console.log("Firebase user deleted.");
    } catch (authDelError) {
      console.error("Failed to delete Firebase user:", authDelError);
      return;
    }

    // Delete Firestore document
    await deleteDoc(doc(db, "users", userUid));

    // Delete todos
    const q = query(collection(db, "todos"), where("uid", "==", userUid));
    const querySnapShot = await getDocs(q);
    for (const docSnap of querySnapShot.docs) {
      await deleteDoc(docSnap.ref);
    }

    console.log("User and todos deleted.");
    localStorage.removeItem("user");
    window.location.replace("./index.html");

  } catch (error) {
    console.error("Error during logout:", error);
  }
};


window.logoutHandler = logoutHandler
