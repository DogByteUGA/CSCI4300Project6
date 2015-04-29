
window.onload = function(){
	new Ajax.Request(
		"babynames.php", 
		{
		method: "get",
		parameters: "q=list",
		onSuccess: loadNames
		
	}
	);

	$("search").onclick = searchClicked;
}

function searchClicked(){
	$("resultsarea").show();
}
function getNames(){

	
}
function loadNames(ajax){
	var list = ajax.responseText.split("\n");
	var dropList = $("allnames");

	for(var i = 0; i < list.length; i++){
	  var dropItem = document.createElement("option");
	  dropItem.innerHTML = list[i];
	  dropList.appendChild(dropItem);	
	}

	dropList.disabled= false;



}