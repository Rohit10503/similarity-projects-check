

from flask import Flask, request, jsonify
from pymongo import MongoClient
import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# MongoDB connection
try:
    client = MongoClient('mongodb+srv://rohitpandey10503:Rohit1234@cluster0.oknc0ab.mongodb.net/Similarity_prj?retryWrites=true&w=majority&appName=Cluster0')
    db = client['Similarity_prj']  # replace with your database name
    collection = db['projects']  # replace with your collection name
except Exception as e:
    print(f"MongoDB connection error: {e}")
    db = None
    collection = None

# Load a pre-trained sentence embedding model
model = SentenceTransformer('all-mpnet-base-v2')

# Function to load data from MongoDB into a pandas DataFrame
def load_data():
    try:
        if collection is not None:
            data_cursor = collection.find()  # You can specify query parameters here
            df = pd.DataFrame(list(data_cursor))  # Convert the MongoDB cursor to a pandas DataFrame
            if df.empty:
                raise Exception("No data found in the collection")
            df['combined'] =df['Abstract'].astype(str)
            return df
        else:
            return pd.DataFrame()  # Return empty DataFrame if MongoDB connection fails
    except Exception as e:
        print(f"Error occurred while loading data: {e}")
        return pd.DataFrame()  # Return empty DataFrame if an error occurs

# Load the data into the DataFrame initially
df = load_data()

# Precompute sentence embeddings once (only on successful data load)
if not df.empty:
    sentences = df['combined'].tolist()
    sentence_embeddings = model.encode(sentences)
else:
    sentence_embeddings = np.array([])  # Empty array if no data is loaded

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route('/similarity', methods=['POST'])
def get_similarity():
    # Get the input sentence and department (branch) from the POST request
    input_data = request.get_json()
    input_sentence = input_data.get('sentence')
    input_department = input_data.get('branch')

    if not input_sentence:
        return jsonify({"error": "No sentence provided"}), 400
    if not input_department:
        return jsonify({"error": "No department provided"}), 400

    # Ensure the DataFrame is loaded correctly
    if df.empty:
        return jsonify({"error": "No data loaded from the database"}), 500

    # Filter the DataFrame for rows where the tag matches the input department
    filtered_df = df[df['Tag'] == input_department]
    print(input_department,input_data)

    if filtered_df.empty:
        return jsonify({"error": f"No records found for department: {input_department}"}), 404

    # Get the sentences from the filtered DataFrame
    filtered_sentences = filtered_df['combined'].tolist()

    # Convert the input sentence to an embedding
    input_embedding = model.encode([input_sentence])
    filtered_sentence_embeddings = model.encode(filtered_sentences)

    # Calculate cosine similarity between the input sentence and filtered sentences
    similarity_scores = cosine_similarity(input_embedding, filtered_sentence_embeddings).flatten()

    # Get the indices of the top 5 scores
    top_indices = np.argpartition(similarity_scores, -5)[-5:]

    # Sort the top indices by similarity scores in descending order
    top_indices = top_indices[np.argsort(-similarity_scores[top_indices])]

    # Use the top indices to get the top 5 sentences, scores, and their IDs
    top_scores = similarity_scores[top_indices]
    top_sentences = np.array(filtered_sentences)[top_indices]
    top_ids = np.array(filtered_df['Unique ID'])[top_indices]  # Extract corresponding IDs 

    # Prepare the response data
    response_data = [
        {"id": int(id_), "score": float(score), "sentence": sentence}
        for id_, score, sentence in zip(top_ids, top_scores, top_sentences)
    ]

    return jsonify(response_data)

# Reload data function to refresh the DataFrame and embeddings
def reload_data():
    global df, sentence_embeddings
    df = load_data()
    if not df.empty:
        sentences = df['combined'].tolist()
        sentence_embeddings = model.encode(sentences)
    else:
        sentence_embeddings = np.array([])  # Empty array if no data is loaded

# Route to trigger the reload of data and sentence embeddings
@app.route('/reload', methods=['POST'])
def trigger_reload():
    try:
        reload_data()
        return jsonify({"message": "Data reloaded and sentence embeddings recalculated."}), 200
    except Exception as e:
        return jsonify({"error": f"Error during data reload: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
