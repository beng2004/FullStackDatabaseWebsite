document.addEventListener("DOMContentLoaded", function() {
    // Function to handle button click event
    function handleButtonClick() {

        //Grabbing values from input elements
        var startDate = document.getElementById("calendarInput1").value;
        var endDate = document.getElementById("calendarInput2").value;
        var gender = document.getElementById("genders").value;
        var breed = document.getElementById("breeds").value;
        var minWeight = document.getElementById("fromInput").value;
        var maxWeight = document.getElementById("toInput").value;

        //You can perform further actions with the grabbed values here
        //For example, you can pass them to a function to update the graph

        //For demonstration purposes, let's log the values to the console
        console.log("Start Date:", startDate);
        console.log("End Date:", endDate);
        console.log("Gender:", gender);
        console.log("Breed:", breed);
        console.log("Min Weight:", minWeight);
        console.log("Max Weight:", maxWeight);
        if (startDate == '') {
            startDate = '2015-01-10'
        }
        if (endDate == '') {
            endDate = '2024-01-10'
        }
        var httpQ = `http://localhost:${port}/weighins/?startdate=${startDate}&enddate=${endDate}&startWeight=${minWeight}&endWeight=${maxWeight}`
        console.log(httpQ)
        updateChart(httpQ)

    }
    function updateChart(req) {
        // console.log("updating chart")
        goatData = []
        fetch(req)
        .then(response => response.json())
        .then(goats => {
            goats.forEach(weighIn => {
                goatData.push({x: new Date(weighIn.weigh_in_date), y: weighIn.weight});
            
            });
            myDotPlot.data.datasets[0].data = goatData;
      
            myDotPlot.update();
        });
        
    }
    // Adding click event listener to the button
    var updateButton = document.querySelector(".big-button");
    updateButton.addEventListener("click", handleButtonClick);
});
