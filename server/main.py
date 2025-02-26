from flask import Flask, request, url_for, send_file
from pymongo import MongoClient
from io import BytesIO
from dotenv import load_dotenv
import os
import gridfs


load_dotenv()
app = Flask(__name__)

#setup of monogo
conn = MongoClient(os.getenv("MONGO_URI"))
db = conn.Products

fs = gridfs.GridFS(db,collection="images")

# fs = gridfs.GridFS(db)
@app.route("/")
def test():
    return """
    <form method="POST" action="/add" enctype="multipart/form-data">
    <input type="text" name="username">
    <input type="file" name="product_pic">
    <input type="submit">

    </form>
    """

@app.route("/add" ,methods=["POST"])
def add():
    if "product_pic" in request.files:
        image = request.files["product_pic"]
        
        image_id = fs.put(image, filename=image.filename)
        db.products.insert_one({"username": request.form.get("username"), "product_image": image_id})
        return "done"
    return "not done"

@app.route("/get")
def get():
    data = db.products.find_one({"username":"test"})
    file_data = fs.get(data["product_image"])
    return send_file(BytesIO(file_data.read()), mimetype='image/png')

if __name__=="__main__":
    app.run(debug = "True")

