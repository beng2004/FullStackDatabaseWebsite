document.addEventListener("DOMContentLoaded", function() {
    // Function to handle button click event
    function handleButtonClick() {

        //Grabbing values from input elements
        var gender = document.getElementById("genders").value;
        var breed = document.getElementById("breeds").value;
        var minWeight = document.getElementById("fromInput").value;
        var maxWeight = document.getElementById("toInput").value;

        //You can perform further actions with the grabbed values here
        //For example, you can pass them to a function to update the graph

        //For demonstration purposes, let's log the values to the console
        console.log("Gender:", gender);
        console.log("Breed:", breed);
        console.log("Min Weight:", minWeight);
        console.log("Max Weight:", maxWeight);
        
        startDate = '2015-01-10'
        endDate = '2024-01-10'
        
        var httpQ = `http://localhost:${port}/weighins/?startdate=${startDate}&enddate=${endDate}&startWeight=${minWeight}&endWeight=${maxWeight}`
        if (gender != 'Any') {
            httpQ += `&gender=${gender}`
        }
        if (breed != 'Any') {
            httpQ += `&breed=${breed}`
        }
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
            if (weighIn.age){ 
                daysAlive = calculateTotalDays(weighIn.age)
                if (daysAlive > 0){
                  // console.log(weighIn.age)
                  // console.log(calculateTotalDays(weighIn.age))
                  goatData.push({x: calculateTotalDays(weighIn.age), y: weighIn.weight});
                } 
              }
        });
        myDotPlot.data.datasets[0].data = goatData;
    
        myDotPlot.update();
        });
        
    }
    // Adding click event listener to the button
    var updateButton = document.querySelector(".big-button-2");
    updateButton.addEventListener("click", handleButtonClick);
});
