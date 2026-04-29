import React, { useState } from "react";
import { addLead } from "../api";

const LeadForm = ({ refresh }) => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    source: "Call",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.phone.trim()) {
      alert("All fields required");
      return;
    }

    await addLead(form);
    setForm({ name: "", phone: "", source: "Call" });
    refresh();
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 15px",
    margin: "8px 0",
    borderRadius: "8px",
    border: "1px solid #ddd",
    outline: "none",
    fontSize: "14px"
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(135deg, #ff6b81 0%, #ff8e9e 100%)",
    color: "white",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer"
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Lead</h2>

      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        style={inputStyle}
      />

      <input
        placeholder="Phone"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
        style={inputStyle}
      />

      <select
        value={form.source}
        onChange={(e) => setForm({ ...form, source: e.target.value })}
        style={inputStyle}
      >
        <option value="Call">Call</option>
        <option value="WhatsApp">WhatsApp</option>
        <option value="Field">Field</option>
      </select>

      <button type="submit" style={buttonStyle}>
        Add Lead
      </button>
    </form>
  );
};

export default LeadForm;