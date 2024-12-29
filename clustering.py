from flask import Flask, request, jsonify
import spacy
from sklearn.cluster import DBSCAN
import numpy as np

# Load spaCy model
nlp = spacy.load("en_core_web_md")  # Medium-sized model with word vectors

# Initialize Flask app
app = Flask(__name__)

@app.route('/cluster_tags', methods=['POST'])
def cluster_tags():
    try:
        # Parse input JSON
        data = request.get_json()
        tags = data.get("tags", [])

        if not tags:
            return jsonify({"error": "No tags provided"}), 400

        # Get embeddings for the tags
        tag_vectors = [nlp(tag).vector for tag in tags]
        tag_vectors = np.array(tag_vectors)  # Convert to numpy array

        # Perform clustering using DBSCAN
        dbscan = DBSCAN(eps=0.5, min_samples=2, metric='cosine')  # Use cosine metric for similarity
        labels = dbscan.fit_predict(tag_vectors)

        # Organize clusters
        clusters = {}
        for tag, cluster_id in zip(tags, labels):
            if cluster_id != -1:  # -1 means the tag is considered noise
                clusters.setdefault(cluster_id, []).append(tag)

        # Organize noise tags
        noise = [tags[i] for i in range(len(tags)) if labels[i] == -1]

        # Prepare response
        response = {
            "clusters": clusters,
            "noise": noise
        }

        return jsonify(response)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
