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
    }
    // function updateChart() {
        
    //     myDotPlot.data.datasets[0].data = list.map((item) => item.patients);
      
    //     barChart.update();
    // }
      
    // Adding click event listener to the button
    var updateButton = document.querySelector(".big-button");
    updateButton.addEventListener("click", handleButtonClick);
});
