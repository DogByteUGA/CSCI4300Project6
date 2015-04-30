
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
	var gender = document.getElementsByName("gender")[0].value;
//get request then go to getnames function
	new Ajax.Request(
		"babynames.php", 
		{
		method: "get",
		parameters: "type=meaning&name=" + name,
		onSuccess: getNames
	}
	);

	new Ajax.Request(
		"babynames.php", 
		{
		method: "get",
		parameters: "type=rank&name=" + name + "&gender=" +gender,
		onSuccess: popularity
	}
	);

}
//do something with meaning response
function getNames(ajax){
	var list = ajax.responseText;
	$('meaning').innerHTML = list;
	//popularity functionality



	
}

function popularity(ajax){
	var popular = ajax.responseText;
	alert(popular);

}
//load the names into the dropdown
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