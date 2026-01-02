import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function CreateInvoice() {
  const [clients, setClients] = useState([]);
  const [clientId, setClientId] = useState("");
  const [items, setItems] = useState([]);
  const [desc, setDesc] = useState("");
  const [amount, setAmount] = useState("");

  const fetchClients = async () => {
    const { data } = await supabase.from("client").select("*");
    setClients(data || []);
  };

  useEffect(() => {
    (async () => {
      await fetchClients();
    })();
  }, []);

  const addItem = () => {
    if (!desc || !amount) return alert("Enter item details");
    setItems([...items, { desc, amount }]);
    setDesc("");
    setAmount("");
  };

  const saveInvoice = async () => {
    if (!clientId || items.length === 0)
      return alert("Select client and add items");

    const { data } = await supabase.auth.getUser();
    if (!data.user) return;

    await supabase.from("invoices").insert({
      client_id: clientId,
      user_id: data.user.id,
      items,
      status: "pending",
    });

    alert("Invoice saved");
    setItems([]);
    setClientId("");
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>Create Invoice</h2>

      {/* CLIENT SELECT */}
      <select
        style={styles.select}
        value={clientId}
        onChange={(e) => setClientId(e.target.value)}
      >
        <option value="">Select Client</option>
        {clients.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* ADD ITEM */}
      <div style={styles.card}>
        <h3>Add Item</h3>
        <div style={styles.row}>
          <input
            style={styles.input}
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <input
            style={styles.input}
            placeholder="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button style={styles.addBtn} onClick={addItem}>
            Add
          </button>
        </div>

        {/* ITEM LIST */}
        {items.map((i, idx) => (
          <div key={idx} style={styles.item}>
            {i.desc} — ₹{i.amount}
          </div>
        ))}
      </div>

      <button style={styles.saveBtn} onClick={saveInvoice}>
        Save Invoice
      </button>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  page: {
    padding: "30px",
    maxWidth: "800px",
  },
  title: {
    marginBottom: "20px",
  },
  select: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginBottom: "20px",
    width: "250px",
  },
  card: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    marginBottom: "20px",
  },
  row: {
    display: "flex",
    gap: "10px",
    marginBottom: "10px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    flex: 1,
  },
  addBtn: {
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  item: {
    padding: "8px",
    borderBottom: "1px solid #eee",
  },
  saveBtn: {
    background: "#16a34a",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "15px",
  },
};
