import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

const ApexChart = () => {
  const [chartData, setChartData] = useState({
    series: [
      {
        name: "SPAM - 2013",
        data: [],
      },
      {
        name: "NOT SPAM - 2013",
        data: [],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
      },
      colors: ['#FF0000', '#77B6EA'],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: 'smooth',
      },
      title: {
        text: 'Spam and Not Spam',
        align: 'left',
      },
      grid: {
        borderColor: '#e7e7e7',
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5,
        },
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: [],
        title: {
          text: 'Month',
        },
      },
      yaxis: {
        title: {
          text: 'COUNT',
        },
        min: 0,
        max: 40,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
  });

  useEffect(() => {
    axios.get('http://localhost:8080/spamdata/all')
      .then((response) => {
        const { data } = response;
        const spamData = data.map((item) => item.spamCount);
        const notSpamData = data.map((item) => item.notSpamCount);
        const months = data.map((item) => {
          const date = new Date(item.date);
          return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        });

        setChartData({
          series: [
            {
              name: "SPAM - 2013",
              data: spamData,
            },
            {
              name: "NOT SPAM - 2013",
              data: notSpamData,
            },
          ],
          options: {
            ...chartData.options,
            xaxis: {
              ...chartData.options.xaxis,
              categories: months,
            },
          },
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div id="chart">
      <ReactApexChart options={chartData.options} series={chartData.series} type="line" height={350} />
    </div>
  );
};

export default ApexChart;
