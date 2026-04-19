

import { useEffect, useState } from "react";
import "./App.css";

const API = "https://projectrepo-c6oa.onrender.com";

function App() {
  const [orders, setOrders] = useState([]);
  const [dashboard, setDashboard] = useState({});
  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    garments: [{ type: "Shirt", quantity: 1 }]
  });

  const fetchOrders = async () => {
    const res = await fetch(`${API}/orders`);
    const data = await res.json();
    setOrders(data);
  };

  const fetchDashboard = async () => {
    const res = await fetch(`${API}/orders/dashboard`);
    const data = await res.json();
    setDashboard(data);
  };

  useEffect(() => {
    fetchOrders();
    fetchDashboard();
  }, []);

 const createOrder = async () => {
    // 1. Validation Check: Make sure fields aren't empty
    if (!form.customerName.trim() || !form.phone.trim()) {
      alert("Please fill in both the Customer Name and Phone Number.");
      return; // 2. Stop the function from proceeding if fields are missing
    }

    // 3. If validation passes, proceed with the API call
    await fetch(`${API}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    // 4. Reset the form
    setForm({ customerName: "", phone: "", garments: [{ type: "Shirt", quantity: 1 }] });

    // 5. Refresh the data
    fetchOrders();
    fetchDashboard();
  };

  const updateStatus = async (id, status) => {
    await fetch(`${API}/orders/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status })
    });

    fetchOrders();
    fetchDashboard();
  };

  return (
    <div className="container">
      <h1>Laundry Management</h1>

      <div className="layout-grid">
        {/* Left Column for Dashboard and Form */}
        <div className="left-column">
          
          {/* Dashboard styled as the deep teal card */}
          <div className="section dashboard-section">
            <h2>Dashboard Overview</h2>
            <div className="dashboard-stats">
              <div className="stat-box">
                <span className="stat-label">Total Orders</span>
                <span className="stat-value">{dashboard.totalOrders || 0}</span>
              </div>
              <div className="stat-box">
                <span className="stat-label">Total Revenue</span>
                <span className="stat-value">₹{dashboard.totalRevenue || 0}</span>
              </div>
            </div>
          </div>

          {/* Create Order */}
          <div className="section form-section">
            <h2>Create New Order</h2>
            <input
              placeholder="Customer Name"
              value={form.customerName}
              onChange={(e) =>
                setForm({ ...form, customerName: e.target.value })
              }
            />
            <input
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />
            <br />
            <button className="primary-btn" onClick={createOrder}>Create Order</button>
          </div>
        </div>

        {/* Right Column for Orders */}
        <div className="right-column">
          <div className="section orders-section">
            <h2>Recent Orders</h2>
            
            <div className="orders-list">
              {orders.map((o) => (
                <div key={o.id} className="card">
                  <div className="card-header">
                    <p className="customer-info">
                      <strong>{o.customerName}</strong> <span>({o.phone})</span>
                    </p>
                    <p className={`status ${o.status}`}>
                      {o.status}
                    </p>
                  </div>
                  <p className="total-amount">Total: ₹{o.totalAmount}</p>

                  <div className="action-buttons">
                    <button onClick={() => updateStatus(o.id, "PROCESSING")}>
                      PROCESSING
                    </button>
                    <button onClick={() => updateStatus(o.id, "READY")}>
                      READY
                    </button>
                    <button onClick={() => updateStatus(o.id, "DELIVERED")}>
                      DELIVERED
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;