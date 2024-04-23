var goatData = []
var timeFormat = 'moment.ISO_8601';
var myDotPlot
var port = 3115

//default query
fetch('http://localhost:'+ port + '/weighins/?startdate=2015-01-10&enddate=2024-01-10&startWeight=0&endWeight=350')
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
        // console.log("Number of null: " + count)
        // console.log(goatData)
        const ctx = document.getElementById('myChart2');
        // console.log(goatData[0].x)
            myDotPlot = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Goat Growth',
                    data: goatData,
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    x: {  
                      title: {
                        display: true,
                        text: 'Age in Days'
                      }
                    },
                    y: {
                      title: {
                        display: true,
                        text: 'Weight'
                      }
                    }
    
                }
            }
        });
    })
    .catch(error => console.error('Error fetching weigh in:', error));



function calculateTotalDays(duration) {  
  // Days in a non-leap year for each month (0-indexed)
    const daysInMonth = [
      31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
    ];
  
  
    // Convert years, months, and days to total days
    let totalDays = 0;
  
  
    // Add days for years
    if (duration.years) {
      totalDays += duration.years * 365; // Add days for whole years
      // Add extra day for each leap year
      totalDays += Math.floor(duration.years / 4); 
    }
  
  
    // Add days for months
    if (duration.months) {
      for (let i = 0; i < duration.months; i++) {
        totalDays += daysInMonth[i % 12]; // Add days for each month
      }
    }
  
  
    // Add remaining days
    totalDays += duration.days || 0;
  
  
    return totalDays;
  }
    


