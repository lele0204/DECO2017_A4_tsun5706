let task = document.getElementById("task"),
	conetnt = document.querySelector(".conetnt"),
	todoList = document.getElementById("todoList"),
	modal = document.querySelector(".modal"),
	modalMask = document.querySelector(".modal-mask"),
	modalTitle = document.querySelector(".modal-title"),
	priorityPatingDom = document.querySelectorAll(".priority-pating span"),
	cancel = document.querySelector(".cancel"),
	del = document.querySelector(".del"),
	save = document.querySelector(".save"),
	subjectDom = document.getElementById("subject"),
	titleDom = document.getElementById("title"),
	descriptionDom = document.getElementById("description"),
	statusDom = document.getElementById("status"),
	dateDom = document.getElementById("date"),
	hourDom = document.getElementById("hour"),
	minuteDom = document.getElementById("minute");

window.onload = function () {
	createTask();
}

window.onresize = function () {
	setWidth();
}

modalMask.addEventListener("click", () => {
	modal.style.display = "none";
})

for (let i = 0; i < priorityPatingDom.length; i++) {
	priorityPatingDom[i].onclick = function () {
		priorityPatingDom.forEach(v => v.classList.remove('active'));
		if (this.classList == '') {
			this.classList.add('active');
		}
	}
}

todoList.addEventListener("click", () => {
	conetnt.scrollLeft = task.scrollWidth;
})

function createTask() {
	task.innerHTML = "";
	let taskList = JSON.parse(localStorage.getItem("taskList"));
	if (taskList && taskList.length > 0) {
		for (let i = 0; i < taskList.length; i++) {
			let { taskTitle, data } = taskList[i];
			let taskItem = document.createElement("div");
			taskItem.classList.add("task-item");
			taskItem.classList.add("task-item-row");
			let taskItemHandle = document.createElement("div");
			taskItemHandle.classList.add("task-item-handle");
			taskItemHandle.classList.add("d-flex");
			taskItemHandle.classList.add("d-ai-c");
			taskItemHandle.classList.add("d-jc-sb");
			taskItemHandle.setAttribute("onclick", "taskColumnHandle(" + i + ")");
			let _img = document.createElement("img");
			_img.src = "images/change_circle.svg";
			let _span1 = document.createElement("span");
			_span1.innerHTML = taskTitle;
			let _span2 = document.createElement("span");
			_span2.innerHTML = i + 1;
			taskItemHandle.appendChild(_img);
			taskItemHandle.appendChild(_span1);
			taskItemHandle.appendChild(_span2);
			taskItem.appendChild(taskItemHandle);
			if (data.length > 0) {
				for (let j = 0; j < data.length; j++) {
					let { subject, title, description, date, hour, minute } = data[j];
					let taskItemCard = document.createElement("div");
					taskItemCard.classList.add("task-item-card");
					let taskItemCardTitle = document.createElement("div");
					taskItemCardTitle.classList.add("task-item-card-title");
					taskItemCardTitle.classList.add("d-flex");
					taskItemCardTitle.classList.add("d-ai-c");
					taskItemCardTitle.classList.add("d-jc-sb");
					let _span3 = document.createElement("span");
					_span3.innerHTML = subject;
					_span3.style.backgroundColor = colorRandom();
					let _imgCard = document.createElement("img");
					_imgCard.src = "images/change_circle.svg";
					_imgCard.setAttribute("onclick", "editColumnHandle(" + i + "," + j + ")")
					taskItemCardTitle.appendChild(_span3);
					taskItemCardTitle.appendChild(_imgCard);
					let _p1 = document.createElement("p");
					_p1.classList.add("title");
					_p1.innerHTML = title;
					let _p2 = document.createElement("p");
					_p2.classList.add("des");
					_p2.innerHTML = description;
					let due = document.createElement("div");
					due.classList.add("due");
					due.classList.add("d-flex");
					due.classList.add("d-ai-c");
					due.classList.add("d-jc-sb");
					let _span4 = document.createElement("span");
					_span4.innerHTML = `DUE ${isToday(date) ? 'TODAY' : date.split("-")[2] + "/" + date.split("-")[1]}`;
					let _span5 = document.createElement("span");
					_span5.innerHTML = `${hour}h ${minute}min`;
					due.appendChild(_span4);
					due.appendChild(_span5);
					taskItemCard.appendChild(taskItemCardTitle);
					taskItemCard.appendChild(_p1);
					taskItemCard.appendChild(_p2);
					taskItemCard.appendChild(due);
					taskItem.appendChild(taskItemCard);
				}
			}
			task.appendChild(taskItem);
		}
	}
	createAddColomn();
	setWidth();
}

// 判断是否是今天
function isToday(val) {
	return new Date().setHours(0, 0, 0, 0) == new Date(val).setHours(0, 0, 0, 0)
}

function createAddColomn() {
	let taskItemAdd = document.createElement("div");
	taskItemAdd.classList.add("task-item");
	let taskItemHandleAdd = document.createElement("div");
	taskItemHandleAdd.classList.add("task-item-handle");
	let columnTitleAdd = document.createElement("input");
	columnTitleAdd.setAttribute("type", "text");
	columnTitleAdd.setAttribute("placeholder", "Type a column title...");
	columnTitleAdd.setAttribute("id", "columnTitle");
	let _divAdd = document.createElement("div");
	_divAdd.classList.add("d-flex");
	_divAdd.classList.add("d-jc-sb");
	let columnCancelAdd = document.createElement("button");
	columnCancelAdd.classList.add("columnCancel");
	columnCancelAdd.innerHTML = "CANCEL";
	columnCancelAdd.setAttribute("onclick", "cancelColumn()");
	let columnAdd = document.createElement("button");
	columnAdd.classList.add("columnAdd");
	columnAdd.innerHTML = "ADD";
	columnAdd.setAttribute("onclick", "addColumn()");
	taskItemHandleAdd.appendChild(columnTitleAdd);
	_divAdd.appendChild(columnCancelAdd);
	_divAdd.appendChild(columnAdd);
	taskItemHandleAdd.appendChild(_divAdd);
	taskItemAdd.appendChild(taskItemHandleAdd);
	task.appendChild(taskItemAdd);
}

// Type a column title cancel
function cancelColumn() {
	document.getElementById("columnTitle").value = "";
}

// Type a column title add
function addColumn() {
	let columnTitleVal = document.getElementById("columnTitle").value,
		taskList = localStorage.getItem("taskList"),
		arr = [];
	if (columnTitleVal == "") {
		alert("Type a column title add must be enter");
		return;
	} else {
		let obj = { "taskTitle": columnTitleVal, data: [], "time": Date.parse(new Date()) }
		if (taskList) {
			let taskListArr = JSON.parse(taskList);
			let index = taskListArr.findIndex(v => v.taskTitle == columnTitleVal);
			if (index > 0) {
				alert("Type a column title has repeart");
			} else {
				taskListArr.push(obj);
				localStorage.setItem("taskList", JSON.stringify(taskListArr));
			}
		} else {
			arr.push(obj);
			localStorage.setItem("taskList", JSON.stringify(arr));
		}
		columnTitle.value = "";
		createTask();
	}
}

function setWidth() {
	let taskItem = document.querySelectorAll(".task-item");
	if (window.innerWidth <= 768) {
		for (let i = 0; i < taskItem.length; i++) {
			taskItem[i].style.width = window.innerWidth - 40 + "px";
		}
	}
	mainWidth(window.innerWidth <= 768 ? taskItem[0].style : 386)
}

function mainWidth(wid) {
	let task = document.getElementById("task"),
		taskItem = document.querySelectorAll(".task-item");
	task.style.width = (taskItem.length * wid + taskItem.length * 21) + "px";
}

// RGB color random
function colorRandom() {
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	var rgba = 'rgba(' + r + ',' + g + ',' + b + ')';
	return rgba;
}

let coloumIndex, coloumItemIndex, editAdd;

function editColumnHandle(i, j) {
	coloumIndex = i;
	coloumItemIndex = j;
	editAdd = "edit";
	let taskList = JSON.parse(localStorage.getItem("taskList"));
	modalTitle.innerHTML = "EDIT A TASK";
	cancel.style.display = "none";
	del.style.display = "block";
	modal.style.display = "block";
	let data = taskList[i].data[j];
	if (Object.keys(data).length > 0) {
		let { subject, title, description, date, hour, minute, priorityPating } = data;
		subjectDom.value = subject;
		titleDom.value = title;
		descriptionDom.value = description;
		dateDom.value = date;
		hourDom.value = hour;
		minuteDom.value = minute;
		statusVal();
		priorityPatingDom.forEach((v, i) => {
			if (v.innerHTML == priorityPating) {
				priorityPatingDom[i].classList.add("active");
			}
		});
	}
}

function taskColumnHandle(i) {
	coloumIndex = i;
	editAdd = "add";
	statusVal();
	resetForm();
	modalTitle.innerHTML = "CREATE A TASK";
	del.style.display = "none";
	cancel.style.display = "block";
	modal.style.display = "block";
}

function statusVal() {
	let taskList = JSON.parse(localStorage.getItem("taskList"));
	statusDom.innerHTML = "";
	taskList.forEach((item, index) => {
		let html = document.createElement("option");
		html.setAttribute("value", item.taskTitle);
		html.innerHTML = item.taskTitle;
		statusDom.appendChild(html);
	});
	taskList.forEach((v, i) => {
		if (i == coloumIndex) statusDom.value = v.taskTitle;
	});

}

function resetForm() {
	subjectDom.value = "";
	titleDom.value = "";
	descriptionDom.value = "";
	dateDom.value = "";
	hourDom.value = "";
	minuteDom.value = "";
	priorityPatingDom.forEach(v => v.classList.remove('active'));
}

cancel.addEventListener("click", () => {
	modal.style.display = "none";
	coloumIndex = null, coloumItemIndex = null;
})

del.addEventListener("click", () => {
	let taskList = JSON.parse(localStorage.getItem("taskList"))
	taskList[coloumIndex].data.splice(coloumItemIndex, 1);
	localStorage.removeItem("taskList");
	localStorage.setItem("taskList", JSON.stringify(taskList))
	modal.style.display = "none";
	coloumIndex = null, coloumItemIndex = null;
	createTask();
})

save.addEventListener("click", () => {
	let taskList = JSON.parse(localStorage.getItem("taskList"))
	let subjectVal = subjectDom.value,
		titleVal = titleDom.value,
		descriptionVal = descriptionDom.value,
		dateVal = dateDom.value,
		hourVal = hourDom.value,
		minuteVal = minuteDom.value,
		priorityPatingVal;
	if (subjectVal == "") {
		alert("Subject muse be enter");
		return;
	}
	if (titleVal == "") {
		alert("Title muse be enter");
		return;
	}
	if (descriptionVal == "") {
		alert("Description muse be enter");
		return;
	}
	if (dateVal == "") {
		alert("date muse be choose");
		return;
	}
	if (hourVal == "") {
		alert("hour muse be enter");
		return;
	}
	if (minuteVal == "") {
		alert("Minute muse be enter");
		return;
	}
	priorityPatingDom.forEach(v => {
		if (v.classList == 'active') priorityPatingVal = v.innerHTML;
	})
	if (priorityPatingVal == "") {
		alert("Priority Pating muse be choose");
		return;
	}


	let obj = {
		"subject": subjectVal,
		"title": titleVal,
		"description": descriptionVal,
		"status": statusDom.value,
		"date": dateVal,
		"hour": hourVal,
		"minute": minuteVal,
		"priorityPating": priorityPatingVal
	}

	taskList[coloumIndex].data.splice(coloumItemIndex, 1);
	let index = taskList.findIndex(v => v.taskTitle == statusDom.value);
	taskList[index].data.push(obj);
	localStorage.removeItem("taskList");
	localStorage.setItem("taskList", JSON.stringify(taskList))
	modal.style.display = "none";
	createColoum = null;
	createTask();
})






