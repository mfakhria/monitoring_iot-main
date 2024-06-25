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
  const [sensorData, setSensorData] = useState({ ph: [], ppm: [], suhu: [] });
  const [labels, setLabels] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const sensorDataRef = ref(database, "Sensor");

    const fetchData = () => {
      onValue(sensorDataRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const dates = Object.keys(data);

          let phValues = [];
          let ppmValues = [];
          let suhuValues = [];
          let timeLabels = [];

          dates.forEach((date) => {
            const times = Object.keys(data[date]);
            times.forEach((time) => {
              const sensorValues = data[date][time];
              phValues.push(sensorValues.PH);
              ppmValues.push(sensorValues.PPM);
              suhuValues.push(sensorValues.SUHU);
              timeLabels.push(`${date} ${time}`);
            });
          });

          setSensorData({
            ph: phValues,
            ppm: ppmValues,
            suhu: suhuValues,
          });
          setLabels(timeLabels);
        } else {
          console.log("No Data Available");
        }
      });
    };

    fetchData();

    const interval = setInterval(fetchData, 60000); // 1 menit = 60000 ms

    return () => {
      clearInterval(interval);
      off(sensorDataRef);
    };
  }, []);

  const filteredLabels = labels.filter((label) =>
    label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPhValues = filteredLabels.map((label) => {
    const index = labels.indexOf(label);
    return sensorData.ph[index];
  });

  const filteredPpmValues = filteredLabels.map((label) => {
    const index = labels.indexOf(label);
    return sensorData.ppm[index];
  });

  const filteredSuhuValues = filteredLabels.map((label) => {
    const index = labels.indexOf(label);
    return sensorData.suhu[index];
  });

  const data = {
    labels: labels,
    datasets: [
      {
        label: "pH",
        data: sensorData.ph,
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
        data: sensorData.ppm,
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
        data: sensorData.suhu,
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

      <div className="rounded-lg p-5 bg-white items-center justify-center container mx-auto max-w-6xl mt-6 md:mt-5 mb-10 md:mb-10">
        <Line data={data} options={options}></Line>
      </div>
      <div className="bg-white p-5 rounded-lg shadow-md w-full max-w-6xl mb-6">
        <h2 className="text-xl font-semibold mb-4">Daily Data Summary</h2>
        <input
          type="text"
          placeholder="Search by date"
          className="mb-4 p-2 border border-gray-300 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="overflow-y-auto" style={{ maxHeight: "200px" }}>
          {filteredLabels.map((date, index) => (
            <div key={index} className="mb-2">
              <p>
                <strong>Date:</strong> {date}
              </p>
              <p>
                <strong>pH:</strong> {filteredPhValues[index].toFixed(2)}
              </p>
              <p>
                <strong>PPM:</strong> {filteredPpmValues[index].toFixed(2)}
              </p>
              <p>
                <strong>Suhu:</strong> {filteredSuhuValues[index].toFixed(2)}°C
              </p>
              <hr className="my-2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SensorChart;
