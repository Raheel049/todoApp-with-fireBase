import {
  collection,
  query,
  db,
  getDocs,
  where,
  deleteDoc,
  doc,
  updateDoc,
} from "./fireBase.js";

const isLoginUser = () => {
  // console.log("isoginUser")
  const userUid = localStorage.getItem("user")
  if(!userUid){
    window.location.assign("./index.html")
  }

}

window.isLoginUser = isLoginUser

const fetchMyTodo = async () => {
  // console.log("My todo")

  const userUid = localStorage.getItem("user");

  const todoRef = collection(db, "todos");
  const q = query(todoRef, where("uid", "==", userUid));
  const querySnapShot = await getDocs(q);

  // querySnapShot.forEach((doc) => {
  //     console.log("doc", doc.data());
  // })

  const tempArray = [];

  querySnapShot.forEach((doc) => {
    const Obj = {
      ...doc.data(),
      id: doc.id,
    };

    tempArray.push(Obj);
  });

  const parent = document.getElementById("parent");

  parent.innerHTML = "";

  for (const obj of tempArray) {
    console.log("obj2", obj);

    parent.innerHTML += `<div class="todoCard">
            <h3>${obj.todoName}</h3>
            <h3>${obj.todoDec}</h3>
        <div>
            <button id="${obj.id}" onclick="editTodo(this)">Edit</button>
            <button id="${obj.id}" onclick="deleteTodo(this)">Delete</button>
        </div>
        </div>`;
  }
};

const deleteTodo = async (ele) => {
  console.log("ele", ele);
  // const parent = document.getElementById("parent");
  // parent.innerHTML = "";

  await deleteDoc(doc(db, "todos", ele.id));
  alert("Todo deleted successfully!");
  fetchMyTodo();
};

const editTodo = async (ele) => {
  console.log("Edit todo", ele);

  const edittodoName = prompt("Enter new todo name");
  const edittodoDec = prompt("Enter new todo description");

  const updatedObj = {
    todoName: edittodoName,
    todoDec: edittodoDec,
  };

  await updateDoc(doc(db, "todos", ele.id), updatedObj);
  fetchMyTodo();
};

window.fetchMyTodo = fetchMyTodo;
window.deleteTodo = deleteTodo;
window.editTodo = editTodo;
