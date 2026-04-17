import { useEffect, useState } from "react";

const API = "http://localhost:3000";

function App() {
  const [orders, setOrders] = useState([]);
  const [dashboard, setDashboard] = useState({});
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    garments: [{ type: "Shirt", quantity: 1 }]
  });

  // 🔹 API Calls
  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API}/orders`);
      setOrders(await res.json());
    } catch (err) {
      console.error("Fetch Orders Error:", err);
    }
  };

  const fetchDashboard = async () => {
    try {
      const res = await fetch(`${API}/orders/dashboard`);
      setDashboard(await res.json());
    } catch (err) {
      console.error("Fetch Dashboard Error:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchDashboard();
  }, []);

  // 🔹 Handlers
  const handleInputChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const createOrder = async () => {
    if (!form.customerName || !form.phone) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      await fetch(`${API}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      setForm({
        customerName: "",
        phone: "",
        garments: [{ type: "Shirt", quantity: 1 }]
      });

      fetchOrders();
      fetchDashboard();
    } catch (err) {
      console.error("Create Order Error:", err);
    }

    setLoading(false);
  };

  const updateStatus = async (id, status) => {
    try {
      await fetch(`${API}/orders/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });

      fetchOrders();
      fetchDashboard();
    } catch (err) {
      console.error("Update Status Error:", err);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🧺 Laundry Management System</h1>

      {/* 🔹 Create Order */}
      <div style={styles.card}>
        <h2>Create Order</h2>
        <div style={styles.row}>
          <input
            placeholder="Customer Name"
            value={form.customerName}
            onChange={e => handleInputChange("customerName", e.target.value)}
            style={styles.input}
          />
          <input
            placeholder="Phone"
            value={form.phone}
            onChange={e => handleInputChange("phone", e.target.value)}
            style={styles.input}
          />
          <button onClick={createOrder} style={styles.primaryBtn}>
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>

      {/* 🔹 Dashboard */}
      <div style={styles.card}>
        <h2>Dashboard</h2>
        <div style={styles.dashboard}>
          <Metric label="Total Orders" value={dashboard.totalOrders} />
          <Metric label="Total Revenue" value={`₹${dashboard.totalRevenue || 0}`} />
        </div>
      </div>

      {/* 🔹 Orders */}
      <div>
        <h2>Orders</h2>
        {orders.length === 0 && <p>No orders yet</p>}

        {orders.map(order => (
          <OrderCard key={order.id} order={order} updateStatus={updateStatus} />
        ))}
      </div>
    </div>
  );
}

export default App;


// 🔹 Small Components (Clean Separation)

const Metric = ({ label, value }) => (
  <div style={styles.metric}>
    <p>{label}</p>
    <h3>{value || 0}</h3>
  </div>
);

const OrderCard = ({ order, updateStatus }) => (
  <div style={styles.orderCard}>
    <div>
      <h3>{order.customerName}</h3>
      <p>{order.phone}</p>
    </div>

    <div>
      <p>Status:</p>
      <span style={getStatusStyle(order.status)}>
        {order.status}
      </span>
    </div>

    <div>
      <p>Total</p>
      <h3>₹{order.totalAmount}</h3>
    </div>

    <div style={styles.buttonGroup}>
      <button onClick={() => updateStatus(order.id, "PROCESSING")} style={styles.btn}>
        PROCESSING
      </button>
      <button onClick={() => updateStatus(order.id, "READY")} style={styles.btn}>
        READY
      </button>
      <button onClick={() => updateStatus(order.id, "DELIVERED")} style={styles.successBtn}>
        DELIVERED
      </button>
    </div>
  </div>
);


// 🔹 Styles (Outside Component)

const styles = {
  container: {
    padding: 20,
    fontFamily: "Arial",
    maxWidth: 900,
    margin: "auto"
  },
  title: {
    textAlign: "center",
    marginBottom: 20
  },
  card: {
    background: "#f9f9f9",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
  },
  row: {
    display: "flex",
    gap: 10
  },
  input: {
    padding: 10,
    borderRadius: 5,
    border: "1px solid #ccc",
    flex: 1
  },
  primaryBtn: {
    padding: "10px 15px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: 5,
    cursor: "pointer"
  },
  dashboard: {
    display: "flex",
    gap: 20
  },
  metric: {
    flex: 1,
    background: "white",
    padding: 15,
    borderRadius: 8,
    textAlign: "center"
  },
  orderCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    border: "1px solid #ddd",
    borderRadius: 10,
    marginBottom: 10,
    background: "white"
  },
  buttonGroup: {
    display: "flex",
    gap: 5
  },
  btn: {
    padding: "5px 10px",
    border: "none",
    borderRadius: 5,
    background: "#ccc",
    cursor: "pointer"
  },
  successBtn: {
    padding: "5px 10px",
    border: "none",
    borderRadius: 5,
    background: "green",
    color: "white",
    cursor: "pointer"
  }
};

const getStatusStyle = status => {
  const colors = {
    RECEIVED: "#6c757d",
    PROCESSING: "#ffc107",
    READY: "#17a2b8",
    DELIVERED: "#28a745"
  };

  return {
    padding: "5px 10px",
    borderRadius: 5,
    color: "white",
    background: colors[status] || "gray"
  };
};