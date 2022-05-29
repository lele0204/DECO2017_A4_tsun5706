// get page dom
let generate = document.querySelector(".generate"),
	keyword = document.getElementById("keyword"),
	idealName = document.getElementById("idealName"),
	icon = document.querySelector(".icon");

// handle field KEYWORD
function keywordChange() {
	let keywordVal = keyword.value.trim(), reg = /[^\a-\z\A-\Z|, ]/g;
	if (reg.test(keywordVal)) {  // rule keyword
		alert("Keywords must be enter English or space");
		return;
	} else {
		idealName.value = "";
		let keywordArr = keywordVal.split(" "), str = "";
		for (let i = 0; i < keywordArr.length; i++) {
			str += keywordArr[i].substring(0, 1)
			idealName.value = str;
		}
	}
}

// link to contentAcronymsList.html
icon.addEventListener("click", () => {
	window.location.href = "./contentAcronymsList.html";
})

// generate send form
generate.addEventListener("click", () => {
	let keywordVal = keyword.value.trim(),
		idealNameVal = idealName.value.trim(),
		acronymsList = localStorage.getItem("acronymsList");

	if (keywordVal == "") {  // rule keyword
		alert("Keywords must be filled in");
		return;
	}
	if (keywordVal && idealNameVal) {
		// form data Object
		let obj = { "id": (acronymsList && JSON.parse(acronymsList).length) > 0 ? JSON.parse(acronymsList).length : 0, "keyword": keywordVal, "idealName": idealNameVal, "time": Date.parse(new Date()) }
		// form data localStorage
		if (acronymsList) {
			let acronymsListArr = JSON.parse(acronymsList);
			acronymsListArr.push(obj);
			localStorage.setItem("acronymsList", JSON.stringify(acronymsListArr));
		} else {
			let arr = [];
			arr.push(obj);
			localStorage.setItem("acronymsList", JSON.stringify(arr));
		}
		// success link to contentAcronymsList.htm
		window.location.href = "./contentAcronymsList.html";
	}
})