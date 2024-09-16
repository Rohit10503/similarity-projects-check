# from flask import Flask, request, jsonify
# import numpy as np
# import pandas as pd
# from sklearn.metrics.pairwise import cosine_similarity
# from sentence_transformers import SentenceTransformer

# app = Flask(__name__)

# # Load a pre-trained sentence embedding model
# model = SentenceTransformer('paraphrase-MiniLM-L6-v2')

# # Load the DataFrame from the CSV file
# df = pd.read_csv('paper_abstracts.csv')

# # Combine columns 'id' and 'abstract'
# df['combined'] = df['id'].astype(str) + ' ' + df['abstract'].astype(str)

# # Convert the combined column to a list
# sentences = df['combined'].tolist()[:100]

# # Convert the list of sentences to embeddings
# sentence_embeddings = model.encode(sentences)

# @app.route("/")
# def hello_world():
#     return "<p>Hello, World!</p>"


# @app.route('/similarity', methods=['POST'])
# def get_similarity():
#     # Get the input sentence from the POST request
#     input_data = request.get_json()
#     input_sentence = input_data.get('sentence')

#     if not input_sentence:
#         return jsonify({"error": "No sentence provided"}), 400

#     # Convert the input sentence to an embedding
#     input_embedding = model.encode([input_sentence])

#     # Calculate cosine similarity between the input sentence and all other sentences
#     similarity_scores = cosine_similarity(input_embedding, sentence_embeddings).flatten()

#     # Get the indices that would sort the similarity scores in descending order
#     sorted_indices = np.argsort(similarity_scores)[::-1]

#     # Sort the similarity scores and sentences based on the sorted indices
#     sorted_scores = similarity_scores[sorted_indices][:5]
#     sorted_sentences = [sentences[i] for i in sorted_indices][:5]

    

#     # Prepare the response data
#     response_data = [
#         {"score": float(score), "sentence": sentence}
#         for score, sentence in zip(sorted_scores, sorted_sentences)
#     ]

#     return jsonify(response_data)

# if __name__ == '__main__':
#   app.run(host='0.0.0.0', port=5000)


from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

# Load a pre-trained sentence embedding model
model = SentenceTransformer('paraphrase-MiniLM-L6-v2')

# Load the DataFrame from the CSV file
df = pd.read_csv('paper_abstracts.csv')

# Combine columns 'id' and 'abstract'
df['combined'] = df['id'].astype(str) + ' ' + df['abstract'].astype(str)

# Convert the combined column to a list and encode the sentences
sentences = df['combined'].tolist()[:100]
sentence_embeddings = model.encode(sentences)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route('/similarity', methods=['POST'])
def get_similarity():
    # Get the input sentence from the POST request
    input_data = request.get_json()
    input_sentence = input_data.get('sentence')

    if not input_sentence:
        return jsonify({"error": "No sentence provided"}), 400

    # Convert the input sentence to an embedding
    input_embedding = model.encode([input_sentence])

    # Calculate cosine similarity between the input sentence and all other sentences
    similarity_scores = cosine_similarity(input_embedding, sentence_embeddings).flatten()

    # Get the indices of the top 5 scores
    top_indices = np.argpartition(similarity_scores, -5)[-5:]

    # Sort the top indices by similarity scores in descending order
    top_indices = top_indices[np.argsort(-similarity_scores[top_indices])]

    # Use the top indices to get the top 5 sentences and scores
    top_scores = similarity_scores[top_indices]
    top_sentences = np.array(sentences)[top_indices]

    # Prepare the response data
    response_data = [
        {"score": float(score), "sentence": sentence}
        for score, sentence in zip(top_scores, top_sentences)
    ]

    return jsonify(response_data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
