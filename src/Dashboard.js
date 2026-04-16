import "./Dashboard.css";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // 🔥 TAMBAH INI

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

import {
  FaHome,
  FaUserMd,
  FaCalendar,
  FaMoneyBill,
  FaCog,
  FaMoon,
  FaSun,
} from "react-icons/fa";

ChartJS.register(CategoryScale, LinearScale, BarElement);

function Dashboard() {
  const [p1, setP1] = useState(0);
  const [p2, setP2] = useState(0);
  const [dark, setDark] = useState(false);

  const navigate = useNavigate(); // 🔥 TAMBAH INI

  // 🔥 ANIMASI PERSEN
  useEffect(() => {
    const duration = 800;
    const start = performance.now();

    const animate = (time) => {
      const progress = Math.min((time - start) / duration, 1);

      setP1(Math.floor(progress * 72));
      setP2(Math.floor(progress * 54));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  // DATA CHART
  const data = {
    labels: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"],
    datasets: [
      {
        data: [20, 60, 65, 15, 80, 45, 50],
        backgroundColor: "#7b61ff",
        borderRadius: 8,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className={dark ? "dashboard dark" : "dashboard"}>

      {/* SIDEBAR */}
      <div className="sidebar">
        <div className="menu active">
          <FaHome /> Dashboard
        </div>

        {/* 🔥 FIX NAVIGASI */}
        <div className="menu" onClick={() => navigate("/doctor")}>
          <FaUserMd /> Dokter
        </div>

        <div className="menu">
          <FaCalendar /> Jadwal
        </div>

        <div className="menu">
          <FaMoneyBill /> Pembayaran
        </div>

        <div className="menu">
          <FaCog /> Setting
        </div>

        <div className="profile">
          <div className="avatar">A</div>
          <p>ANIESHG</p>
        </div>
      </div>

      {/* MAIN */}
      <div className="main">

        {/* TOP BAR */}
        <div className="topbar">

          <div className="search-box">
            <span>🔍</span>
            <input type="text" placeholder="Search..." />
          </div>

          <button
            className={`dark-toggle ${dark ? "active" : ""}`}
            onClick={() => setDark(!dark)}
          >
            {dark ? <FaSun /> : <FaMoon />}
          </button>

        </div>

        {/* CONTENT */}
        <div className="content-top">

          <div className="chart-box fade-in">
            <Bar data={data} options={options} />
          </div>

          <div className="side-cards">

            <div className="info-card">
              <h3>JANJI TEMU SELESAI</h3>
              <div
                className="circle"
                style={{
                  background: `conic-gradient(#7b61ff ${p1}%, #eee ${p1}%)`,
                }}
              >
                {p1}%
              </div>
            </div>

            <div className="info-card">
              <h3>JANJI TEMU MENDESAK</h3>
              <div
                className="circle"
                style={{
                  background: `conic-gradient(#4facfe ${p2}%, #eee ${p2}%)`,
                }}
              >
                {p2}%
              </div>
            </div>

          </div>
        </div>

        {/* TABLE */}
        <div className="table fade-in">
          <h3>JANJI TEMU MENDATANG</h3>

          <table>
            <thead>
              <tr>
                <th>WAKTU</th>
                <th>NAMA</th>
                <th>TELEPON</th>
                <th>DOKTER</th>
                <th>STATUS</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>09:00</td>
                <td>ANDI</td>
                <td>08123</td>
                <td>DR A</td>
                <td>
                  <span className="status selesai">Selesai</span>
                </td>
              </tr>

              <tr>
                <td>10:00</td>
                <td>BUDI</td>
                <td>08234</td>
                <td>DR B</td>
                <td>
                  <span className="status proses">Proses</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;