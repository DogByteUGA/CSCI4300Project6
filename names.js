(function() {
	window.addEventListener("load", setup);

	//Immediatley loads the list of names and makes the page load content when the search button
	//is clicked
	function setup() {
		makeRequest("list", processList);
		document.getElementById("search").onclick = loadContent;
	}

	//Called when the search button is clicked. If a name is selected hides any old errors,
	//displays the area in which results are dispalyed and loads content for each of the three
	//content areas.
	function loadContent() {
		if (document.getElementById("allnames").value != "") {
			//Removes any errors previously displayed on the page.
			document.getElementById("errors").innerHTML = "";
			//Reveals the area which holds the meaning, rank and clebs sections.
			document.getElementById("resultsarea").style.display = "";
			
			hideLoading(false);

			//Removes data from previous searches form the page.
			document.getElementById("meaning").innerHTML = "";
			document.getElementById("graph").innerHTML = "";
			document.getElementById("celebs").innerHTML = "";

			//Hides the message that no rank data was found for a name/gender combination.
			var noRankData = document.getElementById("norankdata");
			noRankData.style.display = "none";

			//Requests maning, rank, and celeb data from the server.
			var name  = document.getElementById("allnames").value;
			var gender = document.querySelector("input:checked").value;
			makeRequest("meaning", processMeaning, name);
			makeRequest("rank", processRank, name, gender);
			makeRequest("celebs", processCelebs, name, gender);
		}
	}

	//Hides or shows all the loading animations in the content area.
	function hideLoading(hidden) {
		var contentLoading = document.querySelectorAll("#resultsarea .loading");
		for (var i = 0; i < contentLoading.length; i++) {
			if (hidden) {
				contentLoading[i].hide();
			} else {
				contentLoading[i].hide();
			}
		}
	}

	//Sends a request for data of the type type ("list", "meaning", "rank", or "celebs") and with
	//the appropriate name and gender information if applicable and then processes the response in
	//the method passed as the porcessingMethod parameter.
	function makeRequest(type, processingMethod, name, gender) {
		var request = new XMLHttpRequest();
		request.onload = processingMethod;
		var requestParams = "type=" + type;
		//Builds up the request url as needed.
		if (name) {
			requestParams += "&name=" + name;
		}
		if (gender) {
			requestParams += "&gender=" + gender;
		} 
		request.open("GET", "babynames.php?" +
				requestParams, true);
		request.send();
	}

	//Processes the server's response to the request for the list of names by loading the list into
	//the dropdown menu so that the user can elect names to search. Enables the dropdown and hides
	//the loading animation. If the request does not succeed displays an error.
	function processList() {
		document.getElementById("loadingnames").hide();

		if(this.status == 200) {
			//Splits up the response text list of names and adds them each as an option in the
			//dropdown menu.
			var namesList = this.responseText.split("\n");
			for (var i = 0; i < namesList.length; i++) {
				var nameChoice = document.createElement("option");
				nameChoice.value = namesList[i];
				nameChoice.innerHTML = namesList[i];
				document.getElementById("allnames").appendChild(nameChoice);
			}

		} else {
			error(this.status, "list");
		}
		//Enables the name selection dropdown
		document.getElementById("allnames").disabled = "";
	}

	//Processes the server's response to the request for name's meaning by injecting the name's 
	//meaning into the appropriate section. Hides the loading animation. If the request does not 
	//succeed displays an error.
	function processMeaning() {
		document.getElementById("loadingmeaning").hide();
		if(this.status == 200) {
			document.getElementById("meaning").innerHTML = this.responseText;
		} else {
			error(this.status, "meaning");
		}
	}

	//Processes the server's response to the request for name and gender's rankings construcing a graph to 
	//represent those rankings. If there are no rankings for the selected name/gender combination simply 
	//displays a message to that effect. Hides the loading animation. If the request does not succeed 
	//displays an error.
	function processRank() {
		document.getElementById("loadinggraph").hide();

		if(this.status == 200) {
			var popular = this.responseXML;
			alert(popular);
			var graph = document.getElementById("graph");
			var ranks = this.responseXML.querySelectorAll("rank");

			//Sets up the rows of the table that displays the rank data.
			var yearRow = document.createElement("tr");
			var rankRow = document.createElement("tr");

			for (var i = 0; i < ranks.length; i++) {
				//Gets a year for the ith column in the ranking graph and sets up a headder cell
				//for that column.
				var rankYear = ranks[i].getAttribute("year");
				var rank = parseInt(ranks[i].textContent);

				var yearCell = document.createElement("th");
				yearCell.innerHTML = rankYear;

				//Sets up a rank cell containing the rank and a colored bar who's height represents
				//the rank. If the column contains a particularly popular rank (1-10), the number is red.
				var rankCell = document.createElement("td");
				var rankDiv = document.createElement("div");
				rankDiv.innerHTML = rank;
				rankDiv.style.textAlign = "center";
				rankDiv.style.fontWeight = "bold";
				rankDiv.style.width = "50px";
				rankDiv.style.backgroundColor = "#FFBBBB";
				
				if (rank) {
					rankDiv.style.height = parseInt((1000 - rank) / 4) + "px";
				} else {
					rankDiv.style.height = "0px";
				}
				if (rank <= 10 && rank > 0) {
					rankDiv.style.color = "red";
				}
				rankCell.style.verticalAlign = "bottom";
				rankCell.appendChild(rankDiv);

				yearRow.appendChild(yearCell);
				rankRow.appendChild(rankCell);
			}

			graph.appendChild(yearRow);
			graph.appendChild(rankRow);
		} else if (this.status == 410) {
			//If the name/gender combination was not found, displays an error message to that
			//effect.
			hideLoading(true);
			var noRankData = document.getElementById("norankdata");
			noRankData.style.display = "block";
		}else {
			error(this.status, "graph");
		}
	}

	//Dispays a list of all the clebrities who have the same first name and gender as the
	//selected name and gender. Hides the loading animation. If the request does not succeed
	//displays an error.
	function processCelebs() {
		document.getElementById("loadingcelebs").hide();

		if(this.status == 200) {
			var celebList = document.getElementById("celebs");
			var celebs = JSON.parse(this.responseText);
			//Adds all relevant celebrities to the page as elements of an unordered list.
			for(var i = 0; i < celebs.actors.length; i++) {
				var actor =  celebs.actors[i];
				var actorEntry = document.createElement("li");
				actorEntry.innerHTML = actor.firstName + " " + actor.lastName + " (" + 
						actor.filmCount + " films)";
				celebList.appendChild(actorEntry);
			}
		} else {
			error(this.status, "celebs");
		}
	}

	//Dispalys a prominent error in the relevant section of the page with the status code of 
	//whatever triggered the error and the section which triggered the error. Hides the loading
	//animations for all sections.
	function error(errorCode, section) {
		hideLoading(true);
		
		var errorMessage = document.createElement("div");
		errorMessage.id = "emergency";
		errorMessage.innerHTML = "Oh no! Something went wrong with an error code of " + errorCode +
				" while trying to load the " + section + " section.";
		document.getElementById("errors").appendChild(errorMessage);
	}
})();
