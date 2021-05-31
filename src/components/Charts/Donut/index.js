import React, { Component } from 'react';
import Chart from "chart.js";

import CardBasic from '../../Cards/Basic';

class ChartDonut extends Component {
    chartRef = React.createRef();

    componentDidMount() {
        const myPieChart = this.chartRef.current.getContext("2d");

        const { questionData } = this.props

        const forLength = questionData.options.length
        var labels = []
        var gData = []
        for(var i = 0; i < forLength; i++) {
            labels.push(questionData.options[i].text)
            gData.push(questionData.options[i].number_of_votes)
        }

        new Chart(myPieChart, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: gData,
                    backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc', '#F8EA8C', '#66CD00'],
                    hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf', '#E1C340', '#458B00'],
                    hoverBorderColor: "rgba(234, 236, 244, 1)",
                }],
            },
            options: {
                maintainAspectRatio: false,
                tooltips: {
                    backgroundColor: "rgb(255,255,255)",
                    bodyFontColor: "#858796",
                    borderColor: '#dddfeb',
                    borderWidth: 1,
                    xPadding: 15,
                    yPadding: 15,
                    displayColors: false,
                    caretPadding: 10,
                },
                legend: {
                    display: false
                },
                cutoutPercentage: 80,
            },
        });
    }

    render() {
        const { questionData } = this.props

        return (
            <CardBasic title={questionData?.question}>
                 <div className="chart-pie pt-4">
                    <canvas id="myPieChart" ref={this.chartRef}></canvas>
                </div>
            </CardBasic>
        )
    }
}

export default ChartDonut;