import { useState } from "react";
import "./Dokter.css";

const doctors = [
  { name: "DR. TIRTA", img: "/images/dokter1.png" },
  { name: "DR. GIGI HADID", img: "/images/dokter2.png" },
  { name: "DR. ANWAR KOPLO", img: "/images/dokter3.png" },
  { name: "DR. BILLIE NGAWI", img: "/images/dokter4.png" },
  { name: "DR. WINDAH B.", img: "/images/dokter5.png" },
  { name: "DR. JENNY B.", img: "/images/d6.jpg" },
];

function Doctor() {
  const [search, setSearch] = useState("");

  const filteredDoctors = doctors.filter((doc) =>
    doc.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dokter-page">

      <div className="dokter-top">
        <div className="search-box">
          <span>🔍</span>
          <input
            type="text"
            placeholder="Search dokter..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

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
  );
}

export default Doctor;