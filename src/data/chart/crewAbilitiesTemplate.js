

export const crewAbilitiesTemplate = {
    config: {
        type: 'radar',
        options: {
            elements: {
                line: {
                    borderWidth: 3
                }
            }
        },
    },
    // Everything below here is not part of a Chart.js config object. It is used by our own function to add additional rules and data dynamically
    datasetInfo: [ 
        {
            label: 'My First Dataset',
            data: [65, 59, 90, 81, 56, 55, 40],
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            pointBackgroundColor: 'rgb(255, 99, 132)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 99, 132)'
        }
    ],

}