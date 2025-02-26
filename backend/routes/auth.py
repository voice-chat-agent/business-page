from flask import Blueprint, request, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId
from flask_jwt_extended import (
    create_access_token, jwt_required, get_jwt_identity
)
from config import Config
from models import hash_password, verify_password

auth_bp = Blueprint('auth', __name__)

# Connect to MongoDB Atlas using the URI from config
client = MongoClient(Config.MONGO_URI)
db = client['mydatabase']  # Change this to your desired database name

# Collections for users and orders
users_collection = db['users']
orders_collection = db['orders']

@auth_bp.route('/signup', methods=['POST'])
def signup():
    """
    Expects JSON payload with:
      - username
      - email
      - phone
      - country_address
      - password
    """
    data = request.get_json()
    required_fields = ['username', 'email', 'phone', 'country_address', 'password']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400

    username = data['username']
    email = data['email']
    phone = data['phone']
    country_address = data['country_address']
    password = data['password']

    # Check if a user already exists with any of the provided identifiers
    if users_collection.find_one({
        '$or': [{'username': username}, {'email': email}, {'phone': phone}]
    }):
        return jsonify({'error': 'User already exists'}), 400

    user = {
        'username': username,
        'email': email,
        'phone': phone,
        'country_address': country_address,
        'password': hash_password(password)
    }
    result = users_collection.insert_one(user)
    return jsonify({
        'message': 'User created successfully',
        'user_id': str(result.inserted_id)
    }), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    """
    Expects JSON payload with:
      - login_identifier (username, email, or phone)
      - password
    Returns a JWT access token upon successful authentication.
    """
    data = request.get_json()
    login_identifier = data.get('login_identifier')
    password = data.get('password')
    if not login_identifier or not password:
        return jsonify({'error': 'Missing login identifier or password'}), 400

    user = users_collection.find_one({
        '$or': [
            {'username': login_identifier},
            {'email': login_identifier},
            {'phone': login_identifier}
        ]
    })
    if user and verify_password(user['password'], password):
        # Use the user's _id as the identity in the JWT.
        access_token = create_access_token(identity=str(user['_id']))
        return jsonify({
            'message': 'Login successful',
            'access_token': access_token,
            'user': {
                'id': str(user['_id']),
                'username': user['username'],
                'email': user['email'],
                'phone': user['phone']
            }
        }), 200
    else:
        return jsonify({'error': 'Invalid credentials'}), 401

@auth_bp.route('/dashboard', methods=['GET'])
@jwt_required()  # This route requires a valid JWT in the Authorization header
def dashboard():
    current_user_id = get_jwt_identity()
    user = users_collection.find_one({'_id': ObjectId(current_user_id)})
    if not user:
        return jsonify({'error': 'User not found'}), 404
    return jsonify({
        'message': f'Welcome to your dashboard, {user["username"]}!',
        'user': {
            'id': str(user['_id']),
            'username': user['username'],
            'email': user['email'],
            'phone': user['phone'],
            'country_address': user['country_address']
        }
    }), 200

# -------------------------------
# New Orders Endpoints
# -------------------------------

@auth_bp.route('/orders/<order_type>', methods=['POST'])
@jwt_required()
def add_order(order_type):
    """
    Generalized endpoint for saving an order.
    The URL parameter <order_type> indicates the type of order (e.g., hospital, restaurant).
    Retrieves the full user details from the database and adds them to the order document.
    """
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    try:
        # Get the current user's ID from the JWT token
        current_user_id = get_jwt_identity()
        # Retrieve the full user details from the database
        user = users_collection.find_one({'_id': ObjectId(current_user_id)})
        if not user:
            return jsonify({'error': 'User not found'}), 404

        # Add order type and full user details to the order data
        data["order_type"] = order_type
        data["user"] = {
            "id": str(user['_id']),
            "username": user.get('username'),
            "email": user.get('email'),
            "phone": user.get('phone'),
            "country_address": user.get('country_address')
        }
        result = orders_collection.insert_one(data)
        print("Inserted document ID:", result.inserted_id)
        return jsonify({
            'message': 'Order saved successfully',
            'id': str(result.inserted_id)
        }), 201
    except Exception as e:
        print("Error during order insertion:", str(e))
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/hospitals', methods=['POST'])
@jwt_required()
def add_hospital_alias():
    """
    Alias endpoint specifically for hospital orders.
    This automatically sets order_type to 'hospital' and retrieves the full user details
    (username, email, phone, country_address) to add to the order document.
    """
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No data provided'}), 400

    try:
        current_user_id = get_jwt_identity()
        user = users_collection.find_one({'_id': ObjectId(current_user_id)})
        if not user:
            return jsonify({'error': 'User not found'}), 404

        data["order_type"] = "hospital"
        data["user"] = {
            "id": str(user['_id']),
            "username": user.get('username'),
            "email": user.get('email'),
            "phone": user.get('phone'),
            "country_address": user.get('country_address')
        }
        result = orders_collection.insert_one(data)
        print("Inserted document ID:", result.inserted_id)
        return jsonify({
            'message': 'Order saved successfully',
            'id': str(result.inserted_id)
        }), 201
    except Exception as e:
        print("Error during hospital order insertion:", str(e))
        return jsonify({'error': str(e)}), 500
