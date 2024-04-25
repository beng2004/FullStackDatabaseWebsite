var goatData = []
var timeFormat = 'moment.ISO_8601';
var myDotPlot
var port = 3115
var idLabels = []

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
                idLabels.push(weighIn.goat_id)
              } 
            }
            
        });
        // console.log("Number of null: " + count)
        // console.log(goatData)
        // console.log(idLabels)

        const ctx = document.getElementById('myChart2');
        // console.log(goatData[0].x)
            myDotPlot = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Goat ID',
                    labels: idLabels,
                    data: goatData,
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    x: {  
                      beginAtZero: true,
                      title: {
                        display: true,
                        text: 'Age in Days'
                      }
                    },
                    y: {
                      title: {
                        display: true,
                        text: 'Weight lbs'
                      }
                    }
                },
                plugins: {
                  tooltip: {
                      callbacks: {
                          label: function(ctx) {
                              // console.log(ctx);
                              let label = ctx.dataset.label + ": " + ctx.dataset.labels[ctx.dataIndex];
                              label +=  ": (" + ctx.parsed.x + " Days, " + ctx.parsed.y + "lbs)";
                              return label;
                          }
                      }
                  }
                },
                onClick: (event, elements, chart) => {
                  if (elements.length >= 1)
                    var idx = elements[0].index
                    console.log(idx)
                    const dataset = chart.data.datasets[0];
                    var textInp = document.getElementById('goatIDInput')     
                    textInp.value = dataset.labels[idx]
                    
                    handleButtonClick()
                },
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
    


