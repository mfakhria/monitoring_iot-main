"use client";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { onValue, ref, off } from "firebase/database";
import { database } from "@/app/firebaseConfig";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler
);

const SensorChart = () => {
  const [sensorData, setSensorData] = useState({});

  useEffect(() => {
    const sensorDataRef = ref(database);

    const fetchData = () => {
      onValue(sensorDataRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setSensorData(data);
        } else {
          console.log("No Data Available");
          setSensorData({});
        }
      });
    };

    fetchData();

    return () => {
      off(sensorDataRef);
    };
  }, []);

  const data = {
    labels: ["pH", "ppm", "suhu"],
    datasets: [
      {
        label: "pH",
        data: [sensorData.pH],
        borderColor: "#cb0c9f",
        borderWidth: 3,
        pointBorderColor: "#cb0c9f",
        pointBorderWidth: 3,
        tension: 0.5,
        fill: false,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "#f797e1");
          gradient.addColorStop(1, "white");
          return gradient;
        },
      },
      {
        label: "PPM",
        data: [sensorData.ppm],
        borderColor: "#4caf50",
        borderWidth: 3,
        pointBorderColor: "#4caf50",
        pointBorderWidth: 3,
        tension: 0.5,
        fill: false,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "#aed581");
          gradient.addColorStop(1, "white");
          return gradient;
        },
      },
      {
        label: "Suhu",
        data: [sensorData.suhu],
        borderColor: "#2196f3",
        borderWidth: 3,
        pointBorderColor: "#2196f3",
        pointBorderWidth: 3,
        tension: 0.5,
        fill: false,
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, "#64b5f6");
          gradient.addColorStop(1, "white");
          return gradient;
        },
      },
    ],
  };

  const options = {
    plugins: {
      legend: true,
    },
    responsive: true,
    scales: {
      y: {
        ticks: {
          font: {
            size: 17,
            weight: "bold",
          },
        },
        title: {
          display: true,
          text: "Sensor Values",
          color: "white",
          padding: {
            bottom: 10,
          },
          font: {
            size: 30,
            style: "italic",
            color: "white",
            family: "Arial",
          },
        },
        min: 0,
      },
      x: {
        ticks: {
          font: {
            size: 10,
            weight: "bold",
          },
        },
        title: {
          display: true,
          text: "Timestamp",
          color: "white",
          padding: {
            top: 10,
          },
          font: {
            size: 20,
            style: "italic",
            family: "Arial",
          },
        },
      },
    },
  };

  return (
    <div className="items-center justify-center container mx-auto max-w-6xl mt-6 md:mt-5 mb-10 md:mb-32">
      <h1 className="text-white font-light text-3xl text-center mt-6">
        Live Chart
      </h1>

      <div className="rounded-lg p-5 bg-white items-center justify-center container mx-auto max-w-6xl mt-6 md:mt-5 mb-10 md:mb-32">
        <Line data={data} options={options}></Line>
      </div>
    </div>
  );
};

export default SensorChart;
