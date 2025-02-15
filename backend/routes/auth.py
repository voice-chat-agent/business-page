from flask import Blueprint, request, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId
from flask_jwt_extended import (
    create_access_token, jwt_required, get_jwt_identity
)
from config import Config
from models import hash_password, verify_password

auth_bp = Blueprint('auth', __name__)

# Connect to MongoDB Atlas
client = MongoClient(Config.MONGO_URI)
db = client['mydatabase']  # Change this to your desired database name
users_collection = db['users']

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
