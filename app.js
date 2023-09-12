const inputText = document.querySelector(".box-text");
const create = document.querySelector(".box-button");
const tasks = document.querySelector(".box-bottom");
const deleteBtn = document.querySelector(".delete-btn");
const lastPage = localStorage.getItem("lastVisited");
const inputData = document.querySelector(".box-input");

if (lastPage === null) {
  inputData.value = "2023-09-07";
} else {
  inputData.value = lastPage;
  showTask(lastPage);
  localStorage.setItem("lastVisited", inputData.value);
}

let countAllItems = 0;
let name1 = localStorage.getItem("countItems");
countAllItems = name1;
if (name1 === null) {
  localStorage.setItem("countItems", 1);
  countAllItems = 1;
}

//function Show task
function showTask(data) {
  let AllItemsInCurrentDate = JSON.parse(localStorage.getItem(data));
  tasks.innerHTML = "";

  //deleting
  let delkey = 0;
  let delElem;

  //show all task
  AllItemsInCurrentDate.forEach((element) => {
    for (let key in element) {
      if (element.hasOwnProperty(key)) {
        value = element[key];
        const para = document.createElement("p");
        const node = document.createTextNode(value);
        para.appendChild(node);
        const taskBox = document.createElement("div");
        taskBox.classList.add("task-box");
        taskBox.appendChild(para);
        const del = document.createElement("button");
        del.classList.add("delete-btn");
        const node2 = document.createTextNode("delete");
        del.appendChild(node2);
        taskBox.appendChild(del);
        tasks.appendChild(taskBox);

        //event listener
        del.addEventListener("click", (event) => {
          console.log(key);
          delkey = key;
          delElem = element;

          //filter
          console.log(AllItemsInCurrentDate);
          const newTasks = AllItemsInCurrentDate.filter(function (el) {
            return !el[key];
          });

          //add new to localstorage
          localStorage.setItem(data, JSON.stringify(newTasks));
          location.reload();
        });
      }
    }
  });
}

create.addEventListener("click", (event) => {
  localStorage.setItem("lastVisited", inputData.value);
  name1++;
  localStorage.setItem("countItems", name1);
  countAllItems = name1;
  if (inputText.value === "") {
    alert("Please, write your task!");
  } else {
    //add task logic
    let dataList = inputData.value;
    let arr = [];

    let AllItemsInDate = JSON.parse(localStorage.getItem(dataList));
    if (AllItemsInDate === null) {
      arr = [];
    } else {
      arr = AllItemsInDate;
    }

    let currentCount = countAllItems;
    let dataText = {};
    dataText[currentCount] = inputText.value;
    arr.push(dataText);

    localStorage.setItem(dataList, JSON.stringify(arr));
    showTask(dataList);
    inputText.value = "";
  }
});

inputData.addEventListener("change", (event) => {
  let dataList = inputData.value;
  showTask(dataList);
  localStorage.setItem("lastVisited", dataList);
});
