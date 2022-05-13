let generate = document.querySelector(".generate"),
	keyword = document.getElementById("keyword"),
	idealName = document.getElementById("idealName");


// generate send form
generate.addEventListener("click", ()=> {
	let keywordVal = keyword.value.trim(), 
		idealNameVal = idealName.value.trim(), 
		acronymsList = localStorage.getItem("acronymsList");
		
	if(keywordVal == "") {
		alert("Keywords must be filled in");
		return;
	}
	if(idealNameVal == "") {
		alert("Ideal name must be filled in");
		return;
	}
	if(keywordVal && idealNameVal) {
		let keywordArr = keywordVal.split(" "), idealNameArr = idealNameVal.split("");
		for(let i = 0; i < keywordArr.length; i++) {
			if(keywordArr[i].substring(0, 1) != idealNameArr[i]) {
				alert("Keyword Initials and Ideal name letter mismatch");
				return;
			}
		}
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