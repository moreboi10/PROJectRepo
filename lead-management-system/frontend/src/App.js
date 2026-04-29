import React, { useEffect, useState } from "react";
import { getLeads } from "./api";
import LeadForm from "./components/LeadForm";
import LeadList from "./components/LeadList";

function App() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");

  const fetchLeads = async () => {
    const data = await getLeads();
    setLeads(data);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const filteredLeads = leads.filter((lead) =>
    lead.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto" }}>
      <h1 style={{ 
        textAlign: "center",
        fontSize: "2.5rem",
        fontWeight: "800",
        color: "#fff",
        textShadow: "2px 2px 4px rgba(0,0,0,0.2), 0 0 30px rgba(255,183,197,0.5)",
        marginBottom: "30px",
        letterSpacing: "2px"
      }}>
        Lead Management System
      </h1>

      {/* Dashboard */}
      <div className="card" style={{ display: "flex", gap: "20px", justifyContent: "space-around", flexWrap: "wrap" }}>
        <div style={{ textAlign: "center" }}><h3 style={{ color: "#333", margin: 0 }}>{leads.length}</h3><span style={{ color: "#666" }}>Total</span></div>
        <div style={{ textAlign: "center" }}><h3 style={{ color: "#28a745", margin: 0 }}>{leads.filter(l => l.status === "Converted").length}</h3><span style={{ color: "#666" }}>Converted</span></div>
        <div style={{ textAlign: "center" }}><h3 style={{ color: "#ffc107", margin: 0 }}>{leads.filter(l => l.status === "Interested").length}</h3><span style={{ color: "#666" }}>Interested</span></div>
      </div>

      {/* Search */}
      <input
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "12px 15px",
          borderRadius: "8px",
          border: "none",
          marginBottom: "20px",
          fontSize: "16px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
        }}
      />
      <div className="card">
        <LeadForm refresh={fetchLeads} />
      </div>

      <div className="card">
        <LeadList leads={filteredLeads} refresh={fetchLeads} />
      </div>
    </div>
  );
}

export default App;