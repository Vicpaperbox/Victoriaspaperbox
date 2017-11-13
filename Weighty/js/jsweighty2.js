var retrievedObject = localStorage.getItem('saveData');
var object = JSON.parse(retrievedObject);
console.log("retrievedObject:", JSON.parse(retrievedObject));
			
$(function(){				
    if( object ) {
	    $("#WeightyGraphs").show();
	    showForm2(object);
	    document.getElementById("WeightyGraphs").style.display = "block";
	    console.log("WeightyGraphs show");
		
    } 
    else {
        console.log("Hey darling");
		$("#WeightyForm").on("submit", saveData);
    }
	
	$("#WeightyGraphs").on("submit", saveDataGraphs);
	console.log("submit_graphs");
});

function showForm2(object) {
	// TODO show the form
		$("#greeting").html("It is action time, "+object.name);
		$("#goals").html("My goals are:  " +object.feedback);
		$("#previous_weight").html("My previous weight in kg was:  " +object.weight[object.weight.length-1].weight);
		console.log("Todays weight", object.weight);
		$("#food_list").html("Last time I ate: " +object.food_list);
		
}

function saveDataGraphs(e) {
		console.log("SAVE DATA");
		e.preventDefault();
		var retrievedObject = localStorage.getItem('saveData');
		var object = JSON.parse(retrievedObject);
		var todaysWeight = [{
		    weight: $("#weight").val(),
		    date: $("#date").val()
		}];
		object.weight.push(todaysWeight);
		localStorage.setItem('saveData', JSON.stringify(object));
		
		console.log("saveDataGraphs", saveDataGraphs);
}
