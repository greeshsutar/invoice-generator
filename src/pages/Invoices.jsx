import { useEffect, useState } from "react";
import { supabase } from "../supabase";

function Invoices() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      const { data, error } = await supabase
        .from("invoices")
        .select(`
          id,
          status,
          items,
          client:client_id ( name )
        `);

      if (error) {
        console.error(error.message);
      } else {
        setInvoices(data || []);
      }
    };

    fetchInvoices();
  }, []);

  return (
    <div>
      <h2>Invoices</h2>

      {invoices.length === 0 && <p>No invoices found</p>}

      <ul>
        {invoices.map((inv) => (
          <li key={inv.id}>
            <strong>Client:</strong> {inv.client?.name} <br />
            <strong>Status:</strong> {inv.status} <br />
            <strong>Items:</strong> {inv.items.length}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Invoices;
