from flask import Flask, request, jsonify
import joblib

app = Flask(__name__)

# Load saved model & vectorizer
model = joblib.load("ticket_model.pkl")
vectorizer = joblib.load("tfidf.pkl")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    text = data.get("ticket")

    if not text:
        return jsonify({"error": "No ticket text provided"}), 400

    text_vec = vectorizer.transform([text])
    prediction = model.predict(text_vec)[0]

    return jsonify({"category": prediction})

if __name__ == "__main__":
    app.run(debug=True)
