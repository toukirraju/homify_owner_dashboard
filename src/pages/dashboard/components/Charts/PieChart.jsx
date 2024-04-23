import React, { useEffect } from "react";
import "chart.js/auto";
import Style from "../../styles/Dashboard.module.css";
import { Chart } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useMediaQuery } from "@mantine/hooks";

const PieChart = ({ data }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <>
      <div className={`${Style.circular_pie}`}>
        <Chart
          type="pie"
          data={{
            labels: ["Payable", "Paid", "Remaining"],
            datasets: [
              {
                label: "Dataset 1",
                data: [data.payable, data.paid, data.remaining],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.4)",
                  "rgba(54, 162, 235, 0.4)",
                  "rgba(255, 206, 86, 0.4)",
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                ],
                borderWidth: 3,
              },
            ],
          }}
          plugins={[ChartDataLabels]}
          options={{
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
              legend: {
                display: isMobile ? false : true,
                labels: {
                  color: "gray",
                  font: {
                    size: 12,
                  },
                },
              },
              datalabels: {
                color: "gray",
                labels: {
                  title: {
                    font: {
                      weight: "bold",
                    },
                  },
                },
                formatter: function (value, context) {
                  return value + " /-";
                },
                // formatter: function (value, context) {
                //   return (
                //     context.chart.data.labels[context.dataIndex] + ":" + value
                //   );
                // },
              },
            },
          }}
        />
      </div>
    </>
  );
};

export default PieChart;
