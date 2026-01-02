import { useState } from "react";
import { supabase } from "../supabase";
import Clients from "./Clients";
import CreateInvoice from "./CreateInvoice";
import Invoices from "./Invoices";

const styles = {
  navbar: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "14px 24px",
    background: "#2563eb",
    color: "white",
  },
  brand: {
    fontSize: "20px",
    fontWeight: "700",
    marginRight: "30px",
  },
  content: {
    padding: "30px",
  },
  logout: {
    marginLeft: "auto",
    padding: "8px 16px",
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "500",
  },
};

const navBtn = (active) => ({
  padding: "8px 16px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: "500",
  background: active ? "white" : "transparent",
  color: active ? "#2563eb" : "white",
  transition: "all 0.2s ease",
});

export default function Dashboard() {
  const [page, setPage] = useState("clients");

  return (
    <div>
      {/* NAVBAR */}
      <div style={styles.navbar}>
        <div style={styles.brand}>Flash Invoice</div>

        {/* CLIENTS */}
        <button
          style={navBtn(page === "clients")}
          onMouseEnter={(e) => {
            if (page !== "clients")
              e.target.style.background = "rgba(255,255,255,0.2)";
          }}
          onMouseLeave={(e) => {
            if (page !== "clients")
              e.target.style.background = "transparent";
          }}
          onClick={() => setPage("clients")}
        >
          Clients
        </button>

        {/* CREATE INVOICE */}
        <button
          style={navBtn(page === "create")}
          onMouseEnter={(e) => {
            if (page !== "create")
              e.target.style.background = "rgba(255,255,255,0.2)";
          }}
          onMouseLeave={(e) => {
            if (page !== "create")
              e.target.style.background = "transparent";
          }}
          onClick={() => setPage("create")}
        >
          Create Invoice
        </button>

        {/* INVOICES */}
        <button
          style={navBtn(page === "invoices")}
          onMouseEnter={(e) => {
            if (page !== "invoices")
              e.target.style.background = "rgba(255,255,255,0.2)";
          }}
          onMouseLeave={(e) => {
            if (page !== "invoices")
              e.target.style.background = "transparent";
          }}
          onClick={() => setPage("invoices")}
        >
          Invoices
        </button>

        {/* LOGOUT */}
        <button
          style={styles.logout}
          onClick={() => supabase.auth.signOut()}
        >
          Logout
        </button>
      </div>

      {/* PAGE CONTENT */}
      <div style={styles.content}>
        {page === "clients" && <Clients />}
        {page === "create" && <CreateInvoice />}
        {page === "invoices" && <Invoices />}
      </div>
    </div>
  );
}
