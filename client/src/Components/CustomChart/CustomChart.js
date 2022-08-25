import Chart from 'chart.js/auto';
import React, { useEffect, useState } from 'react';

let chartDataSkeleton = {
    graphType: '',
    graphTitle: '',
    graphData: '',
    graphLabels: ''
}

const CustomChart = (props) => {
    const { graphType, graphTitle, graphData, graphLabels, idHelper, backgroundColor, borderColor } = props



    useEffect(() => {


        const ctx = document.getElementById(`myChart${idHelper}`).getContext('2d');


        const myChart = new Chart(ctx, {
            type: graphType,
            data: {
                labels: graphLabels,
                datasets: [{
                    label: '',
                    data: graphData,
                    backgroundColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    },
                    x: {
                        beginAtZero: true
                    }
                },
                maintainAspectRatio: false,
            },
            hoverOffset:20,
            offset: [20,0,0,0,0,0,0,0,0,0]  

        });

        // myChart.setOptions({
        //     responsive: true,
        //     maintainAspectRatio: false
        // })

        return () => {
            myChart.destroy()
        }

    }, [graphType, graphData])



return (

    <div className='' >
        <canvas id={`myChart${idHelper}`} width="500" height="400"></canvas>

    </div>
    
)
}



export default CustomChart