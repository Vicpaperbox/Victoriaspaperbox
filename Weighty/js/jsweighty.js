
function saveData(e){
	console.log("SAVE DATA"),e.preventDefault();
		var a={};
			a.name=$("#name").val(),
			a.emailid=$("#emailid").val(),
			a.gender=$("input[name=gender]:checked").val(),
			a.age=$("#age").val(),
			a.weight=[{weight:$("#weight").val(),
			date:$("#date").val()}],
			a.height=$("#height").val(),
			a.feedback=$("#feedback").val(),
			a.food_list=$("#food_list").val(),
				console.log("Saving data",a),
			localStorage.setItem("saveData",JSON.stringify(a)),
			window.location.href="WeightyGraphs.html"}

localStorage.clear(),
	"undefined"!=typeof Storage?
		console.log("Code for localStorage/sessionStorage."):console.log("Sorry! No Web Storage support..");
	var retrievedObject=localStorage.getItem("saveData"),
	object=JSON.parse(retrievedObject);
	console.log("retrievedObject:",JSON.parse(retrievedObject)),
	$("#submit").click(function(){
		$("#WeightyGraphs").show()
		}
	),
	$(function(){
		object?($("#WeightyGraphs").show(),
		showForm2(object),
	document.getElementById("WeightyGraphs").style.display="block",
	console.log("WeightyGraphs:")):(console.log("Hey darling"),
	$("#WeightyForm").on("submit",saveData))
	}
	);