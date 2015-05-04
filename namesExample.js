(function() {
	// URL of the babynames server.
	var URL_STARTER = "https://webster.cs.washington.edu/cse154/babynames.php?type=";

	// Onload function which will be loaded automatically.
	$(function() {
		// Get the name list and insert into selector.
		$.ajax({
			url: URL_STARTER + "list",
			beforeSend: function() {
				$("#allnames").attr("disabled", true);
			}
		}).done(function(data) {
			$.each(data.split("\n"), function(index, value) {
				$("<option>", {
					"value": value.toLowerCase(),
					"text": value
				}).appendTo("#allnames");
			});
			$("#allnames").attr("disabled", false);
			$("#loadingnames").hide();
		});
		// Search the data about this name according to name and gender.
		$("#search").click(function() {
			refresh();
			var name = $("#allnames").val();
			var gender = $('input[name=gender]:checked').val();
			if (name) {
				$("#resultsarea").show();
				getMeaning(name);
				getRank(name, gender);
				showCelebs(name, gender);
			}
		});
	});

	// Get the meaning of this name.
	function getMeaning(name) {
		var url = URL_STARTER + "=meaning&name=" + name;
		$.ajax(url).always(function() {
			$("#loadingmeaning").hide();
		}).done(function(data) {
			$("#meaning").html(data);
		}).fail(function(xhr) {
			error(xhr);
		});
	}

	// Provide a graph that shows the rank of this name & gender across decades.
	function getRank(name, gender) {
		var url = URL_STARTER + "=rank&name=" + name + "&gender=" + gender;
		$.ajax(url).always(function() {
			$("#loadinggraph").hide();
		}).done(function(xml) {
			var decades = $("<tr>");
			var bars = $("<tr>");
			$(xml).find('baby').find('rank').each(function() {
				var decade = $(this).attr('year');
				$("<th>").html(decade).appendTo(decades);
				var rank = parseInt($(this).text());
				var bar = $("<div>").html(rank).addClass("bar");
				bar.height(parseInt((1000 - rank) / 4));
				if (rank <= 10 && rank > 0) {
					bar.css("color", "red");
				} else if (rank == 0) {
					bar.height(0);
				}
				$("<td>").append(bar).appendTo(bars);
			});
			decades.appendTo("#graph");
			bars.appendTo("#graph");
		}).fail(function(xhr) {
			if (xhr.status != 410) {
				error(xhr);
			} else {
				$("#norankdata").show();
			}
		});
	}

	// Show the celebs who name same with this name and how many films have 
	// this celebs been in.
	function showCelebs(name, gender) {
		var url = URL_STARTER + "celebs&name=" + name + "&gender=" + gender;
		$.ajax({
			url: url,
			dataType: "json"
		}).always(function() {
			$("#loadingcelebs").hide();
		}).done(function(json) {
			$.each(json.actors, function(index, value) {
				var firstName = value.firstName;
				var lastName = value.lastName;
				var films = value.filmCount;
				var actor = firstName + " " + lastName + " (" + films + " films)";
				$("<li>").html(actor).appendTo("#celebs");
			});
		}).fail(function(xhr) {
			error(xhr);
		});
	}

	// Refresh the page and clear the original html content.
	function refresh() {
		$(".loading").show();
		$("#loadingnames").hide();
		$("#meaning").empty();
		$("#graph").empty();
		$("#celebs").empty();
	}

	// Display error message in the 'errors' div.
	function error(xhr) {
		$("<p>").html("Error Occured!").appendTo("#errors");
		$("<p>").html("Server status:" + xhr.status).appendTo("#errors");
		$("#errors").html($("#errors").html() + xhr.responseText);
	}
}) ();