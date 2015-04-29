
window.onload = function(){
	new Ajax.Request(
		"babynames.php", 
		{
		method: "get",
		parameters: "type=list",
		onSuccess: loadNames
		
	}
	);

	$("search").onclick = searchClicked;
}

function searchClicked(){
	$("resultsarea").show();
	var list = document.getElementById("allnames");
	var name = list[list.selectedIndex].value;
	//alert(name);

	new Ajax.Request(
		"babynames.php", 
		{
		method: "get",
		parameters: "type=meaning&name=" + name
		
	}
	);

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