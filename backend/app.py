from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity
from flask_cors import CORS
from flask_pymongo import PyMongo
from config import Config
from routes.auth import auth_bp  # Ensure this path is correct

app = Flask(__name__)
app.config.from_object(Config)

# Enable Cross-Origin Resource Sharing
CORS(app)

# Print the Mongo URI to verify it's loaded correctly
print("Mongo URI:", app.config.get("MONGO_URI"))

# Initialize PyMongo using the URI from app.config
mongo = PyMongo(app)

# Initialize JWT Manager
jwt = JWTManager(app)

# Register the authentication blueprint (login, dashboard, etc.)
app.register_blueprint(auth_bp, url_prefix='/api/auth')

# Explicitly select your target database (name 'db' as in your URI)
db_main = mongo.cx['db']

# -------------------------------
# Option 1: Generalized Orders Route
# -------------------------------
# Use this endpoint for any type of order by providing the order type in the URL.
# Example: POST to /api/orders/hospital or /api/orders/restaurant
@app.route('/api/orders/<order_type>', methods=['POST'])
@jwt_required()  # Requires a valid JWT token
def add_order(order_type):
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    try:
        # Get the logged-in user's identity (e.g., username)
        current_user = get_jwt_identity()
        # Add order type and user details to the incoming data
        data["order_type"] = order_type
        data["user"] = current_user
        # Insert the data into the "orders" collection
        result = db_main.orders.insert_one(data)
        print("Inserted document ID:", result.inserted_id)
        return jsonify({
            'message': 'Data saved successfully',
            'id': str(result.inserted_id)
        }), 201
    except Exception as e:
        print("Error during insertion:", str(e))
        return jsonify({'error': str(e)}), 500

# -------------------------------
# Option 2: Alias Route for Hospitals
# -------------------------------
# If your frontend is calling /api/hospitals, this route sets the order type to "hospital".
@app.route('/api/hospitals', methods=['POST'])
@jwt_required()  # Requires a valid JWT token
def add_hospital_alias():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    try:
        current_user = get_jwt_identity()
        data["order_type"] = "hospital"
        data["user"] = current_user
        result = db_main.orders.insert_one(data)
        print("Inserted document ID:", result.inserted_id)
        return jsonify({
            'message': 'Data saved successfully',
            'id': str(result.inserted_id)
        }), 201
    except Exception as e:
        print("Error during insertion:", str(e))
        return jsonify({'error': str(e)}), 500

# -------------------------------
# Optional Test Route (Not Protected)
# -------------------------------
@app.route('/api/test', methods=['GET'])
def test_db():
    try:
        test_result = db_main.orders.insert_one({'test': 'data'})
        test_doc = db_main.orders.find_one({'_id': test_result.inserted_id})
        return jsonify({
            'message': 'Test insertion successful',
            'document': test_doc
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
