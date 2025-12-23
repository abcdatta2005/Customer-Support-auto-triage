import { useState } from "react";
import "./TicketPredict.css";

function TicketPredict() {
  const [ticket, setTicket] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const predictTicket = async () => {
    if (!ticket.trim()) return;

    setLoading(true);
    const res = await fetch("http://localhost:5000/api/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ticket })
    });

    const data = await res.json();
    setResult(data.category);
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Customer Support Ticket Classifier</h2>

        <textarea
          placeholder="Enter customer ticket description..."
          value={ticket}
          onChange={(e) => setTicket(e.target.value)}
        />

        <button onClick={predictTicket} disabled={loading}>
          {loading ? "Predicting..." : "Predict Category"}
        </button>

        {result && (
          <div className="result">
            Predicted Category: {result}
          </div>
        )}
      </div>
    </div>
  );
}

export default TicketPredict;
