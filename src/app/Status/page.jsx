"use client"
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { ref, get, update } from "firebase/database";
import { database, auth } from "../firebaseConfig";
import { useRouter } from "next/navigation";

const Status = () => {
  const [wifi, setWifi] = useState("");
  const [pumpStatus, setPumpStatus] = useState(false);
  const [tapStatus, setTapStatus] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const router = useRouter();

  const fetchControlData = async () => {
    const controlRef = ref(database);
    const snapshot = await get(controlRef);
    if (snapshot.exists()) {
      const data = snapshot.val();

      // Mengambil semua kunci dari objek WiFi
      const wifiKeys = data.WiFi ? Object.keys(data.WiFi) : [];
      if (wifiKeys.length > 0) {
        // Mengambil kunci terbaru
        const latestKey = wifiKeys[wifiKeys.length - 1];
        // Mengambil nilai dari kunci terbaru
        const latestWifi = data.WiFi[latestKey];

        setWifi(latestWifi || "");
      } else {
        setWifi("");
      }

      setPumpStatus(data.pompa || false);
      setTapStatus(data.kran || false);
    }
  };

  const fetchUserData = async () => {
    const user = auth.currentUser;
    if (user) {
      setUsername(user.email); // Menggunakan email sebagai contoh
      setLoggedIn(true);
      fetchControlData();
    } else {
      setLoggedIn(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Anda harus login untuk mengakses halaman ini!",
      }).then(() => {
        router.push("/Login");
      });
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleAddData = async () => {
    try {
      const controlRef = ref(database);
      const newData = {
        WiFi: wifi,
        pompa: pumpStatus ? 1 : 0,
        kran: tapStatus ? 1 : 0,
      };

      await update(controlRef, newData);

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Control Updated Successfully!",
      });
    } catch (error) {
      console.error("Firebase Error: ", error);
    }
  };

  const handlePumpToggle = () => {
    setPumpStatus(!pumpStatus);
  };

  const handleTapToggle = () => {
    setTapStatus(!tapStatus);
  };

  const handleLogout = async () => {
    const confirmResult = await Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You will be logged out.",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Logout",
      cancelButtonText: "Cancel",
    });

    if (confirmResult.isConfirmed) {
      try {
        await auth.signOut();
        router.push("/Login");
      } catch (error) {
        console.error("Logout Error: ", error);
      }
    }
  };

  const ControlInput = ({ label, id, placeholder, value, onChange }) => {
    return (
      <div className="text-center text-white text-2xl font-bold m-5">
        <label htmlFor={id}>{label}</label>
        <div className="md:flex justify-center items-center gap-5 mt-3 md:mt-4 md:mb-5">
          <input
            placeholder={`${placeholder}`}
            id={id}
            value={value}
            onChange={onChange}
            readOnly
            className="md:w-full rounded-full border-0 md:py-3 py-1.5 text-center text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm md:text-2xl md:font-bold sm:leading-6"
          />
        </div>
      </div>
    );
  };

  if (!loggedIn) {
    return null; // Menampilkan peringatan sudah ditangani dengan SweetAlert dan push ke halaman login
  }

  return (
    <div className="container items-center justify-center max-w-6xl mx-auto mt-10 mb-10 md:mt-12 md:mb-16">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl font-bold text-white bg-green-500 p-2 rounded-lg md:mx-5 mx-8">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg md:mx-5 mx-8"
        >
          Logout
        </button>
      </div>
      <div className="text-white md:text-2xl mb-5 font-mono md:mx-5 mx-10 text-2xl bg-cyan-700 rounded-xl p-1 md:w-fit md:p-2">Welcome, {username}</div>
      <form>
        <ControlInput
          label="Nama WiFi"
          id="wifi"
          value={wifi}
          onChange={(e) => setWifi(e.target.value)}
        />

        <div className="md:flex flex-row md:m-6">
          <ControlSwitch
            label="Pompa"
            id="control_pompa"
            isChecked={pumpStatus}
            onToggle={handlePumpToggle}
          />

          <ControlSwitch
            label="Keran"
            id="control_keran"
            isChecked={tapStatus}
            onToggle={handleTapToggle}
          />
        </div>

        <div className="md:flex w-fit mx-auto">
          <button
            className="w-full mt-1 md:mb-10 mb-6 justify-center rounded-xl bg-slate-800 hover:bg-slate-900 transition-all p-4 text-2xl md:text-2xl font-bold leading-6 text-slate-100 hover:text-white hover:scale-105 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="button"
            onClick={handleAddData}
          >
            Kirim
          </button>
        </div>
      </form>
    </div>
  );
};

const ControlSwitch = ({ label, id, isChecked, onToggle }) => {
  const handleToggle = () => {
    onToggle();
  };

  const Indicator = isChecked ? "ON" : "OFF";

  return (
    <div className="md:mt-15 mt-10 mb-10 flex gap-2 max-w-6xl mx-auto items-center justify-center text-center text-white md:text-3xl text-2xl font-bold md:w-72 w-56 bg-cyan-600 hover:bg-cyan-700 rounded-lg md:p-4 p-3 transition-all ">
      <label htmlFor={id}>{label}</label>
      <div className="flex items-center">
        <span className={`px-2 py-1 text-sm font-semibold ${isChecked ? "bg-green-500" : "bg-red-500"} rounded-md text-white`}>
          {Indicator}
        </span>
      </div>
      <input
        id={id}
        type="checkbox"
        checked={isChecked}
        role="switch"
        onChange={handleToggle}
        className="me-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-black/25 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-white after:shadow-switch-2 after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ms-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-switch-1 checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-switch-3 focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ms-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-switch-3 checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-white/25 dark:after:bg-surface-dark dark:checked:bg-primary dark:checked:after:bg-primary"
      />
    </div>
 

  );
};

export default Status;
