import torch
import clip
from PIL import Image
import base64
from io import BytesIO
from google.cloud.firestore_v1.vector import Vector
import re

device = "cuda" if torch.cuda.is_available() else "cpu"
model, preprocess = clip.load("RN50", device=device)

def fetch_image_from_base64(imgbase64):
    try:
        # Decode the base64 string
        image_data = base64.b64decode(imgbase64)

        # Convert the response content into an image
        img = preprocess(Image.open(BytesIO(image_data)).convert("RGB")).unsqueeze(0).to(device)
        return img
    except Exception as e:
        print(f"An error occurred: {e}")
        return None

def embed(imgbase64):
    image = fetch_image_from_base64(imgbase64)
    if (image==None):
        return Vector([0])
    with torch.no_grad():
        image_features = model.encode_image(image)
    image_features = image_features.tolist()[0]
    image_features = Vector(image_features)
    return image_features

def embed_t(text):
    text = clip.tokenize(text).to(device)
    with torch.no_grad():
        text_features = model.encode_text(text)
    return Vector(text_features.tolist()[0])

def create_pattern(list_ingre): 
    # Define the regular expression pattern with case insensitivity
    re_str = list_ingre[0]
    for i in range(1, len(list_ingre)):
        re_str = '|' + list_ingre[i]
    pattern = re.compile(re_str, re.IGNORECASE)

    return pattern