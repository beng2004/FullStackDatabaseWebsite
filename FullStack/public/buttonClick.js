//listens on doc load
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

        //For demonstration purposes log the values to the console
        console.log("Start Date:", startDate);
        console.log("End Date:", endDate);
        console.log("Gender:", gender);
        console.log("Breed:", breed);
        console.log("Min Weight:", minWeight);
        console.log("Max Weight:", maxWeight);

        //null value checking
        if (startDate == '') {
            startDate = '2015-01-10'
        }
        if (endDate == '') {
            endDate = '2024-01-10'
        }
        var httpQ = `http://localhost:${port}/weighins/?startdate=${startDate}&enddate=${endDate}&startWeight=${minWeight}&endWeight=${maxWeight}`
        if (gender != 'Any') {
            httpQ += `&gender=${gender}`
        }
        if (breed != 'Any') {
            httpQ += `&breed=${breed}`
        }
        console.log(httpQ)
        //updates graph on parameters
        updateChart(httpQ)

    }
    
    //updates chart based on the api request
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
