import React, { useContext, useEffect, useState } from "react";
import {
  Chart as Chartjs,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
} from "chart.js";
import { Line } from "react-chartjs-2";
import DataContext from "../context/DataContext";

Chartjs.register(
  CategoryScale,
  BarElement,
  LinearScale,
  LineElement,
  PointElement
);

function Charts() {
  const context = useContext(DataContext);
  const { country } = context;
  const [label, setLabel] = useState([]);
  const [active, setActive] = useState([]);
  const [died, setDied] = useState([]);
  const [confirmed, setConfirmed] = useState();
  console.log(country);
  useEffect(() => {
    if (country) {
      const getData = async () => {
        let data = await fetch(
          `https://api.covid19api.com/total/country/${country}`
        );
        let parsedData = await data.json();
        setActive(parsedData.map((e) => e.Active));
        setDied(parsedData.map((e) => e.Deaths));
        setConfirmed(parsedData.map((e) => e.Confirmed));
        setLabel(parsedData.map((e) => e.Date));
      };

      getData();
    }
  }, [country]);

  const data = {
    labels: label,
    datasets: [
      {
        data: active,
        label: "infected",
        borderColor: "blue",
        fill: true,
        lineTension: 0,
      },
      {
        data: died,
        label: "died",
        borderColor: "gray",
        borderWidth: 1,
        fill: true,
        lineTension: 0,
      },
      {
        data: confirmed,
        label: "infected",
        borderColor: "red",
        borderWidth: 1,
        fill: true,
        lineTension: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    // bezierCurve: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <div className="mx-5">
      <Line data={data} height={450} width={2100} options={options} />
    </div>
  );
}

export default Charts;
