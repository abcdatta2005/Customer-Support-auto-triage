import sys
import joblib
import os
import time  

# Get project root directory
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Load trained artifacts
model = joblib.load(os.path.join(BASE_DIR, "ticket_model.pkl"))
vectorizer = joblib.load(os.path.join(BASE_DIR, "tfidf.pkl"))

if len(sys.argv) < 2:
    print("ERROR")
    sys.exit(1)

text = sys.argv[1]

# ⏱️ Start latency timer
start_time = time.time()

# Prediction
vec = vectorizer.transform([text])
prediction = model.predict(vec)

# ⏱️ End latency timer
end_time = time.time()

latency_ms = (end_time - start_time) * 1000

print(f"{prediction[0]} | Latency: {latency_ms:.2f} ms")
