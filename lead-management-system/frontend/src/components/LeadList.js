import React from "react";
import { updateLeadStatus, deleteLead } from "../api";

const LeadList = ({ leads, refresh }) => {
  return (
    <div>
      <h2>Leads</h2>

      {leads.map((lead) => (
        <div
          key={lead.id}
          style={{
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "10px",
            background: "#f7f8ff",
            boxShadow: "0 4px 10px rgba(0,0,0,0.05)"
          }}
        >
          <p><b>{lead.name}</b> ({lead.phone})</p>
          <p>Source: {lead.source}</p>

          {/* Status Badge */}
          <span
            style={{
              padding: "5px 10px",
              borderRadius: "20px",
              display: "inline-block",
              marginBottom: "10px",
              background:
                lead.status === "Converted"
                  ? "#d4edda"
                  : lead.status === "Not Interested"
                  ? "#f8d7da"
                  : "#ffe4e9",
              color: lead.status === "Converted" ? "#155724" : lead.status === "Not Interested" ? "#721c24" : "#d6336c",
              fontWeight: "500"
            }}
          >
            {lead.status}
          </span>

          <br />

          <select
            value={lead.status}
            onChange={async (e) => {
              await updateLeadStatus(lead.id, e.target.value);
              refresh();
            }}
            style={{ marginRight: "10px", padding: "6px 10px" }}
          >
            <option value="Interested">Interested</option>
            <option value="Not Interested">Not Interested</option>
            <option value="Converted">Converted</option>
          </select>

          <button
            className="delete"
            onClick={async () => {
              await deleteLead(lead.id);
              refresh();
            }}
            style={{ padding: "6px 12px" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default LeadList;