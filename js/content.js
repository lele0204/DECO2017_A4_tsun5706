let generate = document.querySelector(".generate"),
	keyword = document.getElementById("keyword"),
	idealName = document.getElementById("idealName"),
	icon = document.querySelector(".icon");

function keywordChange(){
	let keywordVal = keyword.value.trim(), reg = /[^\a-\z\A-\Z|, ]/g;
	if(reg.test(keywordVal)) {
		alert("Keywords must be enter English or space");
		return;
	} else {
		idealName.value = "";
		let keywordArr = keywordVal.split(" "), str = "";
		for(let i = 0; i < keywordArr.length; i++) {
			str += keywordArr[i].substring(0, 1)
			idealName.value = str;
		}
	}
}

icon.addEventListener("click", ()=> {
	window.location.href="./contentAcronymsList.html";
})

// generate send form
generate.addEventListener("click", ()=> {
	let keywordVal = keyword.value.trim(), 
		idealNameVal = idealName.value.trim(), 
		acronymsList = localStorage.getItem("acronymsList");
		
	if(keywordVal == "") {
		alert("Keywords must be filled in");
		return;
	}
	if(keywordVal && idealNameVal) {
		let obj = {"keyword": keywordVal, "idealName": idealNameVal, "time": Date.parse(new Date())}
		if(acronymsList) {
			let acronymsListArr = JSON.parse(acronymsList);
			acronymsListArr.push(obj);
			localStorage.setItem("acronymsList", JSON.stringify(acronymsListArr));
		} else {
			let arr = [];
			arr.push(obj);
			localStorage.setItem("acronymsList", JSON.stringify(arr));
		}
		window.location.href="./contentAcronymsList.html";
	}
})