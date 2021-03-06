import React from "react";
import { useRef } from "react";
import { useEffect, useState } from "react";
import Chartjs from "chart.js";
import { historyOptions } from "../chartConfigs/chartConfigs";

const HistoryChart = ({ charter }) => {
  const chartRef = useRef();
  const { days, weeks, years, detail } = charter;
  const [timeFormat, setTimeFormat] = useState("24h");

  const determineTimeFormat = () => {
    switch (timeFormat) {
      case "24h":
        return days;
        break;
      case "7d":
        return weeks;
        break;
      case "1y":
        return years;
        break;
      default:
        return days;
        break;
    }
  };

  useEffect(() => {
    if (chartRef && chartRef.current && detail) {
      const chartInstance = new Chartjs(chartRef.current, {
        type: "line",
        data: {
          datasets: [
            {
              label: `${detail.name} Price`,
              data: determineTimeFormat(),
              backgroundColor: "#32e0c4",
              borderColor: "#e7305b",
              pointRadius: 0,

              borderWidth: 1,
            },
          ],
        },
        options: historyOptions,
      });
    }
  });
  
  const renderPrice = () => {
    if (detail) {
      return (
        <>
          <p className="my-0 float-left">${detail.current_price.toFixed(2)}</p>
          <p
            className={
              detail.price_change_24h < 0
                ? "text-danger my-0 float-right"
                : "text-success my-0 float-right"
            }
          >
            {detail.price_change_percentage_24h}%
          </p>
        </>
      );
    }
  };

  return (
    <div className="bg-white border mt-2 rounded p-3">
      <div>{renderPrice()}</div>
      <div>
        <canvas ref={chartRef} id="mychart" height={250}></canvas>
      </div>
      <div className="chart-button mt-1 text-center">
        <button
          onClick={() => {
            setTimeFormat("24h");
          }}
          className="btn btn-outline btn-secondary btn-sm"
        >
          24h
        </button>
        <button
          onClick={() => {
            setTimeFormat("7d");
          }}
          className="btn btn-outline btn-secondary btn-sm mx-1"
        >
          7d
        </button>
        <button
          onClick={() => {
            setTimeFormat("1y");
          }}
          className="btn btn-outline btn-secondary btn-sm"
        >
          1y
        </button>
      </div>
    </div>
  );
};

export default HistoryChart;
