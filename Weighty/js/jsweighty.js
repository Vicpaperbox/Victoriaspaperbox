
localStorage.clear();

if (typeof(Storage) !== "undefined") {
   console.log("Code for localStorage/sessionStorage.") 
} else {
    console.log("Sorry! No Web Storage support..") 
}

function saveData(e) {
	console.log("SAVE DATA");
    e.preventDefault(); 

    var jsonData = {}; //empty json object
    jsonData.name = $("#name").val();

	jsonData.emailid = $("#emailid").val();
	 
    jsonData.gender = $('input[name=gender]:checked').val();
    jsonData.age = $("#age").val();
	jsonData.weight = [{
				weight: $("#weight").val(),
				date: $("#date").val()
	 }];
	jsonData.height = $("#height").val();	 
    jsonData.feedback = $("#feedback").val();
	jsonData.food_list = $("#food_list").val();

	console.log("Saving data", jsonData);
    localStorage.setItem('saveData', JSON.stringify(jsonData));
	
	window.location.href = "WeightyGraphs.html";
	
    //document.getElementById("WeightyForm").style.display = "none";
    //document.getElementById("WeightyGraphs").style.display = "block";
}

var retrievedObject = localStorage.getItem('saveData');
var object = JSON.parse(retrievedObject);
console.log("retrievedObject:", JSON.parse(retrievedObject));
			
$("#submit").click(function() {
	$("#WeightyGraphs").show(); 
});

$(function(){				
    if( object ) {
	    $("#WeightyGraphs").show();
	    showForm2(object);
	    document.getElementById("WeightyGraphs").style.display = "block";
	    console.log("WeightyGraphs:");
    } 
    else {
        console.log("Hey darling");
		$("#WeightyForm").on("submit", saveData);
    }
});
