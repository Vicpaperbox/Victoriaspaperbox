function showForm2(e){$("#greeting").html("It is action time, "+e.name),$("#goals").html("My goals are:  "+e.feedback),$("#previous_weight").html("My previous weight in kg was:  "+e.weight[e.weight.length-1].weight),console.log("Todays weight",e.weight),$("#food_list").html("Last time I ate: "+e.food_list)}function saveDataGraphs(e){console.log("SAVE DATA"),e.preventDefault();var t=localStorage.getItem("saveData"),a=JSON.parse(t),o=[{weight:$("#weight").val(),date:$("#date").val()}];a.weight.push(o),localStorage.setItem("saveData",JSON.stringify(a)),console.log("saveDataGraphs",saveDataGraphs)}var retrievedObject=localStorage.getItem("saveData"),object=JSON.parse(retrievedObject);console.log("retrievedObject:",JSON.parse(retrievedObject)),$(function(){object?($("#WeightyGraphs").show(),showForm2(object),document.getElementById("WeightyGraphs").style.display="block",console.log("WeightyGraphs show")):(console.log("Hey darling"),$("#WeightyForm").on("submit",saveData)),$("#WeightyGraphs").on("submit",saveDataGraphs),console.log("submit_graphs")});