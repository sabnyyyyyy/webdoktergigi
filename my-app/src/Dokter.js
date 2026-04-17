import { useEffect } from "react";
import "./Dashboard.css";
import "./Dokter.css";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import d1 from "./dokter1.png";
import d2 from "./dokter2.png";
import d3 from "./dokter3.png";
import d4 from "./dokter4.png";
import d5 from "./dokter5.png";
import d6 from "./dokter6.png";

import {
  FaHome,
  FaUserMd,
  FaCalendar,
  FaMoneyBill,
  FaCog,
} from "react-icons/fa";

function Dokter() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
  const saved = localStorage.getItem("dark");

  if (saved === "true") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
}, []);

  // 🔥 DATA SUDAH FIX (PAKAI IMPORT)
  const doctors = [
    { name: "DR. TIRTA", img: d1 },
    { name: "DR. GIGI HADID", img: d2 },
    { name: "DR. ANWAR KOPLO", img: d3 },
    { name: "DR. BILLIE NGAWI", img: d4 },
    { name: "DR. WINDAH B.", img: d5 },
    { name: "DR. JENNY B.", img: d6 },
  ];

  const filteredDoctors = doctors.filter((doc) =>
    doc.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard">

      {/* SIDEBAR */}
      <div className="sidebar">

        <div className="menu-list">

          <div
            className={`menu ${location.pathname === "/dashboard" ? "active" : ""}`}
            onClick={() => navigate("/dashboard")}
          >
            <FaHome /> Dashboard
          </div>

          <div
            className={`menu ${location.pathname === "/dokter" ? "active" : ""}`}
            onClick={() => navigate("/dokter")}
          >
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
            🔍
            <input
              placeholder="Search dokter..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* GRID */}
        <div className="dokter-grid">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doc, i) => (
              <div className="dokter-card" key={i}>
                <img src={doc.img} alt={doc.name} />
                <p>{doc.name}</p>
              </div>
            ))
          ) : (
            <p className="no-data">Dokter tidak ditemukan</p>
          )}
        </div>

      </div>
    </div>
  );
}

export default Dokter;