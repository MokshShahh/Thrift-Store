from flask import Flask, request, url_for, send_file
from flask_cors import CORS
from pymongo import MongoClient
from io import BytesIO
from dotenv import load_dotenv
import os
import gridfs


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



if __name__=="__main__":
    app.run(debug = "True")

