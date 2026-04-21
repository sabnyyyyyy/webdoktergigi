import "./Dashboard.css";
import { Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { useNavigate, Routes, Route, useLocation } from "react-router-dom";

import Pembayaran from "./Pembayaran";
import Doctor from "./Dokter";

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
  const [dark, setDark] = useState(false);
  const [janji, setJanji] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  // LOAD DATA
  useEffect(() => {
    const loadData = () => {
      const data = JSON.parse(localStorage.getItem("janji")) || [];
      setJanji(data);
    };

    loadData();
    window.addEventListener("storage", loadData);

    return () => window.removeEventListener("storage", loadData);
  }, []);

  // UPDATE STATUS
  const updateStatus = (index) => {
    const updated = [...janji];

    updated[index].status =
      updated[index].status === "Proses" ? "Selesai" : "Proses";

    setJanji(updated);
    localStorage.setItem("janji", JSON.stringify(updated));
  };

  // HITUNG STATUS
  const selesai = janji.filter(j => j.status === "Selesai").length;
  const proses = janji.filter(j => j.status === "Proses").length;
  const total = janji.length || 1;

  const persenSelesai = Math.round((selesai / total) * 100);
  const persenProses = Math.round((proses / total) * 100);

  // SUMMARY PER DOKTER
  const dokterSummary = Object.entries(
    janji.reduce((acc, curr) => {
      acc[curr.dokter] = (acc[curr.dokter] || 0) + 1;
      return acc;
    }, {})
  ).sort((a, b) => b[1] - a[1]);

  // CHART PER HARI
  const hariMap = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
  const harianChart = [0,0,0,0,0,0,0];

  janji.forEach((item) => {
    const date = new Date(item.waktu);
    const hari = date.getDay();
    harianChart[hari]++;
  });

  const dataChart = {
    labels: hariMap,
    datasets: [
      {
        data: harianChart,
        backgroundColor: "#7b61ff",
        borderRadius: 8,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
  };

  // 🔥 HITUNG PENDING (buat badge)
  const pendingCount = janji.filter(j => j.status === "Pending").length;

  return (
    <div className={dark ? "dashboard dark" : "dashboard"}>

      {/* SIDEBAR */}
      <div className="sidebar">

        <div
          className={`menu ${location.pathname === "/dashboard" ? "active" : ""}`}
          onClick={() => navigate("/dashboard")}
        >
          <FaHome /> Dashboard
        </div>

        <div
          className={`menu ${location.pathname === "/dashboard/dokter" ? "active" : ""}`}
          onClick={() => navigate("/dashboard/dokter")}
        >
          <FaUserMd /> Dokter
        </div>

        <div className="menu">
          <FaCalendar /> Jadwal
        </div>

        {/* 🔥 PEMBAYARAN (SUDAH NYAMBUNG) */}
        <div
          className={`menu ${location.pathname === "/dashboard/pembayaran" ? "active" : ""}`}
          onClick={() => navigate("/dashboard/pembayaran")}
        >
          <FaMoneyBill /> Pembayaran
          {pendingCount > 0 && (
            <span className="badge">{pendingCount}</span>
          )}
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

        {/* TOPBAR */}
        <div className="topbar">
          <div className="search-box">
            <span>🔍</span>
            <input type="text" placeholder="Search..." />
          </div>

          <button
            className="dark-toggle"
            onClick={() => setDark(!dark)}
          >
            {dark ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        <Routes>

          {/* DASHBOARD */}
          <Route
            index
            element={
              <>
                <div className="content-top">

                  <div className="chart-box">
                    <Bar data={dataChart} options={options} />
                  </div>

                  <div className="side-cards">

                    <div className="info-card">
                      <h3>JANJI SELESAI</h3>
                      <div
                        className="circle"
                        style={{
                          background: `conic-gradient(#7b61ff ${persenSelesai}%, #eee ${persenSelesai}%)`,
                        }}
                      >
                        {persenSelesai}%
                      </div>
                    </div>

                    <div className="info-card">
                      <h3>JANJI PROSES</h3>
                      <div
                        className="circle"
                        style={{
                          background: `conic-gradient(#4facfe ${persenProses}%, #eee ${persenProses}%)`,
                        }}
                      >
                        {persenProses}%
                      </div>
                    </div>

                  </div>
                </div>

                {/* RINGKASAN DOKTER */}
                <div className="table">
                  <h3>RINGKASAN DOKTER</h3>
                  <h4>Total Permintaan: {janji.length}</h4>

                  <table>
                    <thead>
                      <tr>
                        <th>DOKTER</th>
                        <th>JUMLAH PASIEN</th>
                      </tr>
                    </thead>

                    <tbody>
                      {dokterSummary.length > 0 ? (
                        dokterSummary.map(([dokter, total], i) => (
                          <tr key={i}>
                            <td>{dokter}</td>
                            <td>{total}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="2" style={{ textAlign: "center" }}>
                            Belum ada data
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* DETAIL */}
                <div className="table">
                  <h3>DETAIL JANJI</h3>

                  <table>
                    <thead>
                      <tr>
                        <th>WAKTU</th>
                        <th>NAMA</th>
                        <th>DOKTER</th>
                        <th>STATUS</th>
                      </tr>
                    </thead>

                    <tbody>
                      {janji.length > 0 ? (
                        janji.map((item, i) => (
                          <tr key={i}>
                            <td>{item.waktu}</td>
                            <td>{item.nama}</td>
                            <td>{item.dokter}</td>
                            <td>
                              <span
                                className={`status ${item.status.toLowerCase()}`}
                                onClick={() => updateStatus(i)}
                                style={{ cursor: "pointer" }}
                              >
                                {item.status}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" style={{ textAlign: "center" }}>
                            Belum ada janji
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            }
          />

          {/* DOKTER */}
          <Route path="dokter" element={<Doctor />} />

          {/* 🔥 PEMBAYARAN */}
          <Route path="pembayaran" element={<Pembayaran />} />

        </Routes>

      </div>
    </div>
  );
}

export default Dashboard;