from flask import Flask, request, jsonify
from credential import db
from PIL import Image
import torch
import json
from model import embed, embed_t, create_pattern
import clip
from google.cloud.firestore_v1.base_vector_query import DistanceMeasure
from google.cloud.firestore_v1.vector import Vector



app = Flask(__name__)

@app.route('/search', methods=['POST'])
def search():
    # Check if the request contains JSON data
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 400
    
    # Get the JSON data from the request
    data = request.get_json()

    collection = db.collection("Post")

    col1 = None
    if (data["image"]):
        col1 = collection.find_nearest(
            vector_field="embedding",
            query_vector=embed(data["image"]),
            distance_measure=DistanceMeasure.EUCLIDEAN,
            limit=30)
        
    col2 = None
    if (data["text"]):
        col2 = collection.find_nearest(
            vector_field="embedding",
            query_vector=embed_t(data["text"]),
            distance_measure=DistanceMeasure.EUCLIDEAN,
            limit=30)

    if (data["method"]):
        collection = collection.where("method", "==", data["method"])

    if (data["duration"]):
        collection = collection.where("duration", "==", data["duration"])

    if (data["portion"]):
        collection = collection.where("pax", "==", data["portion"])
  
    docs = collection.stream()
    filter = []
    if (data["ingredients"]):
        pattern = create_pattern(data["ingredients"])
        filter = [doc.id for doc in docs if ((doc.to_dict().get("ingredients", []) is not None) and any(pattern.match(ingredients) for ingredients in doc.to_dict().get("ingredients", [])))]
    else:
        filter = [doc.id for doc in docs]

    result_list = []
    if ((col1 is not None) and (col2 is not None)):
        col1 = [element.id for element in col1.get()]
        col2 = [element.id for element in col2.get()]
        overallset = set(col1 + col2)
        result_list = [element for element in filter if element in overallset]
    elif (col1 is not None):
        col1 = [element.id for element in col1.get()]
        overallset = set(col1)
        result_list = [element for element in filter if element in overallset]
    elif (col2 is not None):
        col2 = [element.id for element in col2.get()]
        overallset = set(col2)
        result_list = [element for element in filter if element in overallset]
    else: 
        print("d")
        result_list = filter

    result = {'doc_ids': result_list}
    # print(result)

    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=False)
