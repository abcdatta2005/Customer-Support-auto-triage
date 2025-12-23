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

Run:

```bash
python src/trainmodel.py
```

Output you can expect:

- Console accuracy and classification report
- Two files saved: `ticket_model.pkl` and `tfidf.pkl`

Use the predictor directly (CLI)
--------------------------------

You can try the predictor from the command line:

```bash
python src/predict.py "Customer cannot login to account; password reset failing"
# Example output: Auth | Latency: 10.23 ms
```

Run the API
-----------

Option A — Flask (Python)

```bash
python app.py
# Server listens on http://127.0.0.1:5000
```

Example request:

```bash
curl -X POST http://127.0.0.1:5000/predict \
	-H "Content-Type: application/json" \
	-d '{"ticket":"Customer cannot login to account; password reset failing"}'

# Response: {"category":"Auth"}
```

Option B — Node backend (calls Python CLI)

```bash
node backend/server.js
# or from backend/: node server.js
```

Example request to Node backend:

```bash
curl -X POST http://localhost:5000/api/predict \
	-H "Content-Type: application/json" \
	-d '{"ticket":"Unable to sync email on mobile"}'
```

Notes: `backend/server.js` executes `src/predict.py` using `child_process.exec`. Make sure `python` is on your PATH and the model files are present in the project root.

Run the frontend
----------------

```bash
cd frontend
npm start
# Open http://localhost:3000
```

By default the demo UI posts to `http://localhost:5000/api/predict`, so start the backend first.

Model details & dataset
-----------------------

- Algorithm: Logistic Regression (scikit-learn)
- Features: TF‑IDF (unigrams + bigrams), stop words='english', max_features=5000
- Labels: whatever is in `data/tickets.csv` `Category` column — check your CSV to see the exact labels

Improving the system
--------------------

- Add more labeled tickets and clean the CSV for better accuracy.
- Try other classifiers (`LinearSVC`, `RandomForest`) or a scikit-learn `Pipeline` with hyperparameter tuning.
- Preprocess text (lowercasing, contraction expansion, lemmatization) before vectorizing.

---The End---


