let close = document.getElementById("close"),
	iconDel = document.getElementById("iconDel");

window.onload = function () {
	createList("alphabetical order");
}

// close return contentAcronymsList page
close.addEventListener("click", () => {
	window.location.href = "./content.html";
});

// clear contentAcronymsList data
// iconDel.addEventListener("click", () => {
// 	let acronymsList = JSON.parse(localStorage.getItem("acronymsList"));
// 	if (acronymsList.length > 0) {
// 		localStorage.removeItem("acronymsList");
// 		createList("alphabetical order");
// 	}
// })

function createList(params) {
	let list = document.getElementById("list"),
		acronymsList = JSON.parse(localStorage.getItem("acronymsList")),
		arr = sortArr(acronymsList),
		val = null;//用来记录第一个键值对的值;
	list.innerHTML = "";
	if (params == "alphabetical order") {
		for (let key in arr) {
			if (val == null) val = arr[key]["index"] = 0;
			let conetntItem = document.createElement("div");
			conetntItem.classList.add("conetnt-item");
			conetntItem.classList.add("d-flex");
			conetntItem.classList.add("d-ai-c");
			conetntItem.classList.add("d-jc-sb");
			let letter = document.createElement("div");
			letter.classList.add("letter");
			letter.innerHTML = arr[key]["title"];
			let sortBy = document.createElement("div");
			sortBy.classList.add("sort-by");
			let sortbyLabel = document.createElement("span");
			sortbyLabel.classList.add("sort-by-label");
			sortbyLabel.innerHTML = "SORT BY: ";
			let sortByChoose = document.createElement("span");
			sortByChoose.classList.add("sort-by-choose");
			sortByChoose.innerHTML = params;
			sortByChoose.setAttribute("onclick", "sortByChooseHandle()");
			let sortBySelect = document.createElement("div");
			sortBySelect.classList.add("sort-by-select");
			let _span1 = document.createElement("span");
			_span1.innerHTML = "alphabetical order";
			_span1.setAttribute("onclick", "sortByChooseSpanHandle(this)");
			let _span2 = document.createElement("span");
			_span2.innerHTML = "chronological order";
			_span2.setAttribute("onclick", "sortByChooseSpanHandle(this)");
			if (arr[key]["index"] == 0) {
				sortBySelect.appendChild(_span1);
				sortBySelect.appendChild(_span2);
				sortBy.appendChild(sortbyLabel);
				sortBy.appendChild(sortByChoose);
				sortBy.appendChild(sortBySelect);
			}
			conetntItem.appendChild(letter);
			conetntItem.appendChild(sortBy);

			let conetntList = document.createElement("div");
			conetntList.classList.add("conetnt-list");

			let _ul = document.createElement("ul");
			for (let i = 0; i < arr[key].data.length; i++) {
				let _li = document.createElement("li");
				_li.setAttribute("data-id", arr[key].data[i].id);
				_li.setAttribute("draggable", true);
				_li.setAttribute("ondragstart", "handleDragStart(this, event)");
				_li.setAttribute("ondragover", "handleDragOver(this, event)");
				_li.setAttribute("ondragend", "handleDragEnd(this, event)");
				let _b = document.createElement("b");
				_b.innerHTML = "x";
				_b.setAttribute("onclick", "rowDel("+ arr[key].data[i].id +")");
				_li.appendChild(_b);
				let _div = document.createElement("div");
				_div.classList.add("d-flex");
				_div.classList.add("d-ai-fs");
				_div.classList.add("d-jc-sb");
				let _span3 = document.createElement("span");
				_span3.innerHTML = arr[key].data[i].idealName;
				let _span4 = document.createElement("span");
				let keywordArr = arr[key].data[i].keyword.split(" "), idealNameArr = arr[key].data[i].idealName.split("");
				for (let j = 0; j < keywordArr.length; j++) {
					if (keywordArr[j].substring(0, 1) == idealNameArr[j]) {
						let _b = document.createElement("b");
						_b.innerHTML = keywordArr[j].substring(0, 1);
						_span4.appendChild(_b);
					}
					_span4.append(keywordArr[j].substring(1) + " ");
				}
				_div.appendChild(_span3);
				_div.appendChild(_span4);
				_li.appendChild(_div);
				_ul.appendChild(_li);
			}
			conetntList.appendChild(_ul);
			list.appendChild(conetntItem);
			list.appendChild(conetntList);
		}
	} else {
		let conetntItem = document.createElement("div");
		conetntItem.classList.add("conetnt-item");
		conetntItem.classList.add("d-flex");
		conetntItem.classList.add("d-ai-c");
		conetntItem.classList.add("d-jc-sb");
		let letter = document.createElement("div");
		let sortBy = document.createElement("div");
		sortBy.classList.add("sort-by");
		let sortbyLabel = document.createElement("span");
		sortbyLabel.classList.add("sort-by-label");
		sortbyLabel.innerHTML = "SORT BY: ";
		let sortByChoose = document.createElement("span");
		sortByChoose.classList.add("sort-by-choose");
		sortByChoose.innerHTML = params;
		sortByChoose.setAttribute("onclick", "sortByChooseHandle()");
		let sortBySelect = document.createElement("div");
		sortBySelect.classList.add("sort-by-select");
		let _span1 = document.createElement("span");
		_span1.innerHTML = "alphabetical order";
		_span1.setAttribute("onclick", "sortByChooseSpanHandle(this)");
		let _span2 = document.createElement("span");
		_span2.innerHTML = "chronological order";
		_span2.setAttribute("onclick", "sortByChooseSpanHandle(this)");
		let conetntList = document.createElement("div");
		sortBySelect.appendChild(_span1);
		sortBySelect.appendChild(_span2);
		sortBy.appendChild(sortbyLabel);
		sortBy.appendChild(sortByChoose);
		sortBy.appendChild(sortBySelect);
		conetntItem.appendChild(letter);
		conetntItem.appendChild(sortBy);

		conetntList.classList.add("conetnt-list");
		let _ul = document.createElement("ul");
		for (let i = 0; i < acronymsList.length; i++) {
			let _li = document.createElement("li");
			_li.setAttribute("data-id", acronymsList[i].id);
			_li.setAttribute("draggable", true);
			_li.setAttribute("ondragstart", "handleDragStart(this, event)");
			_li.setAttribute("ondragover", "handleDragOver(this, event)");
			_li.setAttribute("ondragend", "handleDragEnd(this, event)");
			let _b = document.createElement("b");
			_b.innerHTML = "x";
			_b.setAttribute("onclick", "rowDel("+ acronymsList[i].id +")");
			_li.appendChild(_b);
			let _div = document.createElement("div");
			_div.classList.add("d-flex");
			_div.classList.add("d-ai-fs");
			_div.classList.add("d-jc-sb");
			let _span3 = document.createElement("span");
			_span3.innerHTML = acronymsList[i].idealName;
			let _span4 = document.createElement("span");
			let keywordArr = acronymsList[i].keyword.split(" "), idealNameArr = acronymsList[i].idealName.split("");
			for (let j = 0; j < keywordArr.length; j++) {
				if (keywordArr[j].substring(0, 1) == idealNameArr[j]) {
					let _b = document.createElement("b");
					_b.innerHTML = keywordArr[j].substring(0, 1);
					_span4.appendChild(_b);
				}
				_span4.append(keywordArr[j].substring(1) + " ");
			}
			_div.appendChild(_span3);
			_div.appendChild(_span4);
			_li.appendChild(_div);
			_ul.appendChild(_li);
		}
		conetntList.appendChild(_ul);
		list.appendChild(conetntItem);
		list.appendChild(conetntList);
	}
}

function handleDragStart(that, e) {
	that.style.opacity = '0.8';
	e.dataTransfer.effectAllowed = 'move';
	e.dataTransfer.setData('text/html', that.innerHTML);
	let id = that.getAttribute("data-id");
	event.dataTransfer.setData('id', id);
}

function handleDragOver(that, e) {
	if (e.preventDefault) {
		e.preventDefault();
	}
	e.dataTransfer.dropEffect = 'move';
	return false;
}

function handleDragEnd(that, e) {
	that.style.opacity = '1';
}
iconDel.ondragover = function () {
	event.preventDefault();
}
iconDel.ondrop = function (event) {
	let id = event.dataTransfer.getData('id');
	if(id) {
		rowDel(id)
	}
	event.stopPropagation();
}

function rowDel(id) {
	let acronymsList = JSON.parse(localStorage.getItem("acronymsList"));
	let index = acronymsList.findIndex(v=> v.id == id),
		sortByChoose = document.querySelector(".sort-by-choose");
	acronymsList.splice(index, 1);
	localStorage.setItem("acronymsList", JSON.stringify(acronymsList))
	createList(sortByChoose.innerHTML);
}

function sortByChooseHandle() {
	let sortBySelect = document.querySelector(".sort-by-select");
	sortBySelect.classList.value == "sort-by-select" ? sortBySelect.classList.add("active") : sortBySelect.classList.remove("active");
}

function sortByChooseSpanHandle(that) {
	let sortBySelect = document.querySelector(".sort-by-select"),
		sortByChoose = document.querySelector(".sort-by-choose");
	sortByChoose.innerHTML = that.innerHTML;
	sortBySelect.classList.remove("active");
	createList(that.innerHTML);
}

function sortArr(list) {
	if (list == null) return;
	let pinyinArray = [], newArr = [], reg = /^[A-Za-z]*$/, obj = {};
	list.map((v, i) => {
		var ken = v.idealName[0];
		pinyinArray.push({ ...v, spell: reg.test(ken) ? ken.toUpperCase() : '#' })
	})
	pinyinArray.forEach((item) => {
		if (!obj[item.spell]) {
			obj[item.spell] = { title: item.spell, data: [] }
		}
		obj[item.spell].data.push(item)
	})
	let keys = Object.keys(obj).sort();
	for (let i = keys.length - 1; i >= 0; i--) {
		newArr.push(obj[keys[i]])
	}
	return newArr.reverse()
}

