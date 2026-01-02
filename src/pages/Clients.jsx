import { useEffect, useState } from "react";
import { supabase } from "../supabase";

function Clients() {
  const [clients, setClients] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const fetchClients = async () => {
    const { data } = await supabase.from("client").select("*");
    setClients(data || []);
  };

  const addClient = async () => {
    if (!name || !email) return alert("Enter name & email");

    const { data } = await supabase.auth.getUser();
    if (!data.user) return alert("Login required");

    await supabase.from("client").insert({
      name,
      email,
      user_id: data.user.id,
    });

    setName("");
    setEmail("");
    fetchClients();
  };

  useEffect(() => {
    (async () => {
      await fetchClients();
    })();
  }, []);

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>Add Client</h2>

      <div style={styles.form}>
        <input
          style={styles.input}
          placeholder="Client Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          style={styles.input}
          placeholder="Client Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button style={styles.button} onClick={addClient}>
          Add Client
        </button>
      </div>

      <h3 style={styles.subtitle}>Client List</h3>

      {/* WRAPPED GRID */}
      <div style={styles.grid}>
        {clients.map((c) => (
          <div
            key={c.id}
            style={styles.card}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-4px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            <div style={styles.cardName}>{c.name}</div>
            <div style={styles.cardEmail}>{c.email}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "30px",
    background: "#f4f6f8",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    marginBottom: "15px",
  },
  subtitle: {
    marginTop: "30px",
    marginBottom: "15px",
  },
  form: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    width: "220px",
  },
  button: {
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  /* ✅ GRID WRAP FIX */
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "15px",
  },

  card: {
    background: "white",
    padding: "16px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    transition: "0.2s ease",
  },
  cardName: {
    fontWeight: "600",
    marginBottom: "5px",
  },
  cardEmail: {
    color: "#555",
    fontSize: "14px",
  },
};

export default Clients;
