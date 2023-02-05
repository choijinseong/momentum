const todoForm = document.getElementById("todo-form");
const todoInput = todoForm.querySelector("input");
const todoList = document.getElementById("todo-list");

const HIDDNE = "hidden";
const TODOS_KEY = "todos";

let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
  const li = event.target.parentElement;
  toDos = toDos.filter((toDo) => parseInt(toDo.id) !== parseInt(li.id));
  li.remove();
  if (toDos.length < 4) {
    todoForm.classList.remove(HIDDNE);
  }
  saveToDos();
}

function finishToDo(event) {
  const li = event.target.parentElement;
  li.classList.toggle("done");
}

function paintToDo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  const completeBtn = document.createElement("button");
  completeBtn.innerText = "✔";
  completeBtn.addEventListener("click", finishToDo);
  const span = document.createElement("span");
  span.innerText = `${newTodo.text}`;
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "❌";
  deleteBtn.addEventListener("click", deleteToDo);
  li.appendChild(completeBtn);
  li.appendChild(span);
  li.appendChild(deleteBtn);
  todoList.appendChild(li);

  if (toDos.length === 4) {
    todoForm.classList.add(HIDDNE);
  }
}

function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = todoInput.value;
  todoInput.value = "";
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
}

todoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);
if (savedToDos !== null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos;
  parsedToDos.forEach(paintToDo);
}
