import { db, getDoc, doc, collection, addDoc, getDocs, query, deleteDoc, where } from "./fireBase.js"

let userData;

const fetchUserData = async () => {
// console.log("dashbord");
const userUid = localStorage.getItem("user")
console.log("userUid", userUid)

const user = await getDoc(doc(db, "users", userUid))
console.log("userData", user.data())
userData = user.data();


}



const AddToDoInFB = async() =>{
    try {
        const todoName = document.getElementById("todoName")
        const todoDec = document.getElementById("todoDec")

    if(!todoName || !todoDec){
        alert("Please fill required fields")
        return;
    }

    const todoObj = {
        todoName: todoName.value,
        todoDec: todoDec.value,
        uid: userData.uid,
        userName: userData.firstName + " " + userData.lastName,
        userEmail: userData.email,
    }

    console.log("todoObj", todoObj)
    todoName.value = "";
    todoDec.value = "";


    await addDoc(collection(db, "todos"), todoObj);
    alert("Todo addes Succressfully!");
    fetchTodos();
    } catch (error) {
        console.log("error", error.message)
    }

}


const fetchTodos = async () => {
    try {
        const querySnapShot = await getDocs(collection(db, "todos"))
        // console.log("todos", todos.data())
        
        const tempArray = [];
        
        querySnapShot.forEach((doc)=> {
            console.log("doc", doc.data())
            // console.log("docId", doc.id)

            const obj = {
                ...doc.data(),
                id: doc.id
            }

            console.log("obj", obj)
            tempArray.push(obj);
        })

        // console.log("tempArray", tempArray)

        const parent = document.getElementById("parent")
        parent.innerHTML = "";

        for(const obj of tempArray){
           console.log("obj", obj)

        parent.innerHTML += `<div class="todoCard">
        <h3>${obj.todoName}</h3>
        <h3>${obj.todoDec}</h3>
        <div>
        <button>Edit</button>
        <button>Delete</button>
        </div>
    </div>`
        }



    } catch (error) {
        console.log("error", error.message)
    }
}


const deleteUserAllTodo = async () => {

    try {

        const userUid = localStorage.getItem("user")

        const todoRef = collection(db, "todos");
            const q = query(todoRef, where("uid", "==", userUid))
            const querySnapShot = await getDocs(q)

            for(const docu of querySnapShot.docs){
                console.log("doc", doc.id)
                await deleteDoc(docu.ref)
                console.log(docu.ref)
            }

            fetchTodos();
            
            
    } catch (error) {
        console.log("error", error.message)
    }

}


window.deleteUserAllTodo = deleteUserAllTodo
window.AddToDoInFB = AddToDoInFB
window.fetchUserData = fetchUserData
window.fetchTodos = fetchTodos