const goatData = []
var timeFormat = 'moment.ISO_8601';

fetch('http://localhost:3115/weighins/?startdate=2022-01-01&enddate=2024-01-01&startWeight=10&endWeight=30')
    .then(response => response.json())
    .then(goats => {
        goats.forEach(weighIn => {
            goatData.push({x: new Date(weighIn.weigh_in_date), y: weighIn.weight});
            // console.log(weighIn.weigh_in_date)
        });
        const ctx = document.getElementById('myChart');
        // console.log(goatData[0].x)
        const myDotPlot = new Chart(ctx, {
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
                        text: 'value'
                      }
                    }
    
                }
            }
        });
    })
    .catch(error => console.error('Error fetching weigh in:', error));

