var goatData = []
var timeFormat = 'moment.ISO_8601';
var myDotPlot
var port = 3115
var idLabels = []
//default query
fetch('http://localhost:'+ port + '/weighins/?startdate=2022-01-01&enddate=2022-05-01&startWeight=0&endWeight=100')
    .then(response => response.json())
    .then(goats => {
        goats.forEach(weighIn => {
            goatData.push({x: new Date(weighIn.weigh_in_date), y: weighIn.weight});
            idLabels.push(weighIn.goat_id)
            // console.log(weighIn.weigh_in_date)
        });
        const ctx = document.getElementById('myChart');
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
                      type: 'time',
                    //   time: {
                    //     unit: 'month'
                    //     },   
                      title: {
                        display: true,
                        text: 'Date'
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
                              return label;
                          }
                      }
                  }
              }
            }
        });
    })
    .catch(error => console.error('Error fetching weigh in:', error));

