# Customer Support Auto-Triage

Welcome! This repository is a small demo app that classifies customer support tickets into categories so you can route them faster. It uses a TF‑IDF text vectorizer and a Logistic Regression classifier, and includes:

- a simple Python training script and CLI predictor
- a tiny Flask alternative API (`app.py`)
- a Node backend that calls the Python predictor (`backend/server.js`)
- a React frontend for quick demos (`frontend/`)

**Project layout (top-level)**

- app.py — small Flask server exposing `POST /predict` (alternative to the Node backend)
- src/trainmodel.py — trains the vectorizer + model from `data/tickets.csv`
- src/predict.py — CLI predictor used by the Node backend
- data/tickets.csv — dataset used for training (should contain `Subject`, `Description`, `Category`)
- frontend/ — React demo UI
- backend/ — Node server that shells out to `src/predict.py`

Getting started
---------------

Prerequisites

- Python 3.8+ (Windows: `python` on PATH)
- Node.js 16+ and `npm`

Recommended Python packages: `pandas`, `scikit-learn`, `joblib`, and `flask`.

Quick setup (recommended)

```bash
# From project root
python -m venv .venv
.venv\Scripts\activate     # Windows
# macOS / Linux: source .venv/bin/activate

pip install pandas scikit-learn joblib flask

# Install Node deps
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
```

Train the model
---------------

Training is intentionally simple. The script expects `data/tickets.csv` in the repo and will save `ticket_model.pkl` and `tfidf.pkl` to the current working directory.
