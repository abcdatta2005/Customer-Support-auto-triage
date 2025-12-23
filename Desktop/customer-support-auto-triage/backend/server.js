const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.post("/api/predict", (req, res) => {
  const { ticket } = req.body;

  if (!ticket) {
    return res.status(400).json({ error: "Ticket is required" });
  }

  const pythonPath = "python";
  const scriptPath = path.join(__dirname, "../src/predict.py");

  exec(
    `${pythonPath} "${scriptPath}" "${ticket}"`,
    (error, stdout, stderr) => {
      if (error) {
        console.error("Python error:", stderr);
        return res.status(500).json({ error: "Prediction failed" });
      }

      res.json({ category: stdout.trim() });
    }
  );
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
