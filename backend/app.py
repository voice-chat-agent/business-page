from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from config import Config
from routes.auth import auth_bp

app = Flask(__name__)
app.config.from_object(Config)

# Enable Cross-Origin Resource Sharing
CORS(app)

# Initialize JWT Manager
jwt = JWTManager(app)

# Register the authentication blueprint with a prefix
app.register_blueprint(auth_bp, url_prefix='/api/auth')

if __name__ == '__main__':
    app.run(debug=True)
