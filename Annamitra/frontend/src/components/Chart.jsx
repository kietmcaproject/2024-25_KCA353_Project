import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const DoughnutChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef && chartRef.current) {
      // Destroy previous chart instance if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");
      chartInstance.current = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Cooked Food", "Uncooked Food", "Packed Food"],
          datasets: [
            {
              label: "Values",
              data: data,
              backgroundColor: [
                "#4CAF50", // Vibrant green for Cooked Food
                "#FF5722", // Bright orange for Uncooked Food
                "#03A9F4", // Sky blue for Packed Food
              ],
              hoverBackgroundColor: [
                "#388E3C", // Darker green on hover
                "#E64A19", // Darker orange on hover
                "#0288D1", // Darker blue on hover
              ],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
              labels: {
                font: {
                  size: 16,
                },
                color: "#333", // Dark text for contrast
              },
            },
          },
        },
      });
    }

    return () => {
      // Clean up - destroy the chart instance when component unmounts
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default DoughnutChart;
