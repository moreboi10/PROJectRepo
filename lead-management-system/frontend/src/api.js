const BASE_URL = "https://your-backend.onrender.com/api/leads";

export const getLeads = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const addLead = async (lead) => {
  const res = await fetch(`${BASE_URL}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead),
  });
  return res.json();
};

export const updateLeadStatus = async (id, status) => {
  await fetch(`${BASE_URL}/update/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
};

export const deleteLead = async (id) => {
  await fetch(`${BASE_URL}/delete/${id}`, {
    method: "DELETE",
  });
};