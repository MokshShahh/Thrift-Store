from flask import Flask, request, url_for, send_file
from flask_cors import CORS
from pymongo import MongoClient
from io import BytesIO
from dotenv import load_dotenv
import os
import gridfs
import google.generativeai as genai


load_dotenv()
app = Flask(__name__)
CORS(app)
#setup of monogo
conn = MongoClient(os.getenv("MONGO_URI"))
db = conn.Products

fs = gridfs.GridFS(db,collection="images")

# fs = gridfs.GridFS(db)
@app.route("/")
def test():
    return """
    <form method="POST" action="/add" enctype="multipart/form-data">
    <label>name</label>
    <input type="text" name="username">
    <label>condition</label>
    <input type="text" name="condition">
    <label>Title</label>
    <input type="text" name="Title">
    <label>category</label>
    <input type="text" name="category">
    <label>Size</label>
    <input type="text" name="size">
    <label>Material</label>
    <input type="text" name="Material">
    <label>price</label>
    <input type="text" name="price">
    <label>negotiable</label>
    <input type="text" name="negotiable">
    <label>specialNote</label>
    <input type="text" name="specialNote">
    <input type="file" name="product_pic">
    <input type="submit">

    </form>
    """

@app.route("/add" ,methods=["POST"])
def add():
    if "product_pic" in request.files:
        image = request.files["product_pic"]
        
        image_id = fs.put(image, filename=image.filename)
        db.products.insert_one({"username": request.form.get("username"), "product_image": image_id,
        "condition": request.form.get("condition"),
        "Title": request.form.get("Title"),
        "category": request.form.get("category"),
        "size": request.form.get("size"),
        "Material": request.form.get("Material"),
        "price": request.form.get("price"),
        "negotiable": request.form.get("negotiable"),
        "specialNote": request.form.get("specialNote")})
        return "done"
    return "not done"

from flask import Flask, jsonify, send_file
from bson import ObjectId
from io import BytesIO

@app.route("/getAllProducts")
def get_all_products():
    # Fetch all products from the database (no filtering by username)
    products = db.products.find()
    product_list = []

    for product in products:
        # Constructing the image URL for each product
        product_data = {
            "product_id": str(product["_id"]),
            "username": product.get("username", ""),
            "condition": product.get("condition", ""),
            "Title": product.get("Title", ""),
            "category": product.get("category", ""),
            "size": product.get("size", ""),
            "Material": product.get("Material", ""),
            "price": product.get("price", ""),
            "negotiable": product.get("negotiable", ""),
            "specialNote": product.get("specialNote", ""),
            # Generate the image URL from the product's GridFS file ID
            "image": f"/image/{str(product['product_image'])}"  
        }
        product_list.append(product_data)

    return jsonify(product_list)

@app.route("/image/<image_id>")
def get_image(image_id):
    # Retrieve the image from GridFS by its ObjectId
    file_data = fs.get(ObjectId(image_id))
    if file_data:
        return send_file(BytesIO(file_data.read()), mimetype='image/png')  # Adjust mimetype if necessary
    return jsonify({"error": "Image not found"}), 404


@app.route("/chatresponse", methods=["POST"])
def get_response():
    try:
        prompt = request.json.get("query")
        if not prompt:
            return jsonify({"error": "Missing 'query' in request body"}), 400
        
        # Initialize the Google Generative AI client
        api_key = os.getenv("API_KEY")
        if not api_key:
            return jsonify({"error": "API_KEY not found in environment variables"}), 500
        
        genai.configure(api_key=api_key)  # Replace with your actual API key
        model = genai.GenerativeModel("gemini-1.5-flash")
        prompt_template = f"""You are a helpful and trendy bot for a Gen Z-focused thrift store. You assist customers by answering their questions, providing details about the store’s trendy clothing items, and offering product suggestions. Always be friendly, fun, and informative, keeping the vibe casual and approachable.

        Here are some key points to consider:
        - The store sells second-hand **jeans**, **pants**, **jerseys**, **t-shirts**, **accessories**, **hoodies**, and **oversized clothing**.
        - The store's clothing items are trendy and cater to Gen Z, so items are stylish, comfortable, and eco-friendly.
        - Customers may inquire about **price**, **size**, **condition**, **material**, or **availability**.
        - If asked about the availability of an item, respond by saying whether it is in stock or not.
        - The store may have sales, special promotions, or discounts. You can mention them if applicable (e.g., "Buy 2, get 1 free!" or "20% off all hoodies this weekend!").
        - The store may also have new arrivals, and you can suggest popular items or collections.
        - If customers ask about the store’s **return policies**, **shipping options**, or any **other policies**, answer them clearly and politely.

        Examples of customer inquiries:
        - "Do you have any oversized hoodies in medium?"
        - "How much is that vintage denim jacket?"
        - "Are your t-shirts eco-friendly?"
        - "Do you have any jerseys from the 90s?"
        - "What’s the deal with your sale on jeans?"
        - "Can I return a hoodie if it doesn’t fit?"

        Personalized recommendations could be:
        - "I’m looking for a comfy hoodie for this winter, do you have any?"
        - "Can you help me find some oversized pants?"
        - "I love vintage t-shirts! Do you have any cool graphic tees?"
        - "I'm into retro jerseys. Got any from the 90s or 80s?"

        Feel free to use fun and engaging language, keep the responses casual and friendly, and focus on the latest trends that Gen Z is into.

        Your task is to generate a response based on the user’s query while keeping the tone fun, friendly, and trendy.
       user query : {prompt}
       DO NO USE ANY EMOJIES IN YOUR RESPONSE AND NOT IN MARKDOWN FORMAT return only the response and nothing else
"""
        # Generate content using the prompt
        response = model.generate_content(prompt_template)
        
        # Check the response structure and return appropriate data
        if hasattr(response, 'text'):  # Ensure the response has the 'text' field
            generated_text = response.text  # Adjust this based on the response format
            return jsonify({"response": generated_text})

        return jsonify({"error": "Unexpected response format"}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500



if __name__=="__main__":
    app.run(debug = "True")

