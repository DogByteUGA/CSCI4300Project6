
window.onload = function(){
	//load the list on load
	new Ajax.Request(
		"babynames.php", 
		{
		method: "get",
		parameters: "type=list",
		onSuccess: loadNames
		
	}
	);
//go to searchclicked when search button clicked
	$("search").onclick = searchClicked;
}
//show the resultsarea, get the name selected, and send a get request
function searchClicked(){
	$("resultsarea").show();
	var list = document.getElementById("allnames");
	var name = list[list.selectedIndex].value;
//get request then go to getnames function
	new Ajax.Request(
		"babynames.php", 
		{
		method: "get",
		parameters: "type=meaning&name=" + name,
		onSuccess: getNames
	}
	);

}
//do something with meaning response
function getNames(ajax){
	var list = ajax.responseText;
	$('meaning').innerHTML = list;
	//	alert(list);

	
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