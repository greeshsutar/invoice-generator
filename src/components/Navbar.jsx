import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const navItem = (path) => ({
    padding: "10px 18px",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "600",
    color: location.pathname === path ? "#ffffff" : "#2563eb",
    backgroundColor:
      location.pathname === path ? "#2563eb" : "transparent",
    transition: "all 0.2s ease",
  });

  return (
    <div
      style={{
        height: "64px",
        backgroundColor: "#ffffff",
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        gap: "12px",
      }}
    >
      <Link to="/clients" style={navItem("/clients")}>
        Clients
      </Link>

      <Link to="/create-invoice" style={navItem("/create-invoice")}>
        Create Invoice
      </Link>

      <Link to="/invoices" style={navItem("/invoices")}>
        Invoices
      </Link>

      <div style={{ flex: 1 }} />

      <button
        style={{
          padding: "10px 18px",
          borderRadius: "8px",
          border: "none",
          background: "#ef4444",
          color: "#fff",
          fontWeight: "600",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;
