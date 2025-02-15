# 🚀 My Website: Full-Stack Application with Flask & React

## 📖 Overview
This is a professional full-stack web application with a Flask backend (using JWT-based authentication and MongoDB Atlas for data storage) and a React frontend (using React Router v6). The application includes features for user sign-up, login, a protected dashboard, and logout functionality.

---

## 📌 Prerequisites

### 🔹 Backend Requirements
- **Python 3.7+**
- **pip** (Python package manager)
- **MongoDB Atlas account** (or any MongoDB instance)

### 🔹 Frontend Requirements
- **Node.js (v14+ recommended)**
- **npm** (comes with Node.js)

---

## 💻 Setup & Run

### 1️⃣ Clone the Repository
```bash
git clone <your-repo-url>
cd my_website
```

---

### 2️⃣ Setup and Run the Backend
Navigate to the backend folder:
```bash
cd backend
```

#### (Optional) Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate
```

#### Install Python dependencies:
```bash
pip install -r requirements.txt
```

#### Configure Environment Variables:
Create a `.env` file in the backend folder with the following content (update placeholders accordingly):
```ini
MONGO_URI=<your_mongodb_atlas_connection_string>
SECRET_KEY=your_flask_secret_key
JWT_SECRET_KEY=your_jwt_secret_key
```

#### Run the Flask Server:
```bash
python app.py
```
The backend server will run at [http://localhost:5000](http://localhost:5000).

---

### 3️⃣ Setup and Run the Frontend
Navigate to the frontend folder:
```bash
cd ../frontend
```

#### Install npm dependencies:
```bash
npm install
```

#### Start the React Development Server:
```bash
npm start
```
The React app will open in your browser (usually at [http://localhost:3000](http://localhost:3000)).

---

## 🚀 Application Usage

### 🔹 Sign Up:
Navigate to [http://localhost:3000/signup](http://localhost:3000/signup) to create a new user account. Provide a username, email, phone, country, address, and password.

### 🔹 Login:
Go to [http://localhost:3000/login](http://localhost:3000/login) and log in with your credentials. The system supports login using username, email, or phone with a password.

### 🔹 Dashboard:
After logging in, you will be redirected to the Dashboard ([http://localhost:3000/dashboard](http://localhost:3000/dashboard)), which is a protected route that fetches your user data from the backend using JWT.

### 🔹 Logout:
Once logged in, a "Logout" button will appear in the navigation bar. Clicking it will remove your JWT token and reset your session.

---

## 🛠️ Additional Notes

### 🔹 CORS:
The backend uses **Flask-Cors** to enable cross-origin requests from the React frontend. Ensure both servers are running for seamless communication.

### 🔹 Security:
- This project uses **JWT for authentication**.
- In production, ensure **HTTPS** is used.
- Handle **token storage securely**.
- Consider adding **token refresh** mechanisms.

### 🔹 Deployment:
For production, consider hosting the backend on platforms like **Heroku, AWS, or DigitalOcean** and the frontend on services like **Vercel, Netlify, or GitHub Pages** (if configured appropriately).

---

## 📜 License
This project is licensed under the **MIT License**.

---

## 🤝 Contributing
Contributions are welcome! Follow these steps:
1. **Fork the repository** 📌
2. **Create a feature branch** 🔀
3. **Commit your changes** ✨
4. **Push to your fork** 🚀
5. **Submit a pull request** 🔥

---

## 📬 Contact
If you have any questions, feel free to reach out:

- 📧 **Email**: your-email@example.com
- 🐦 **Twitter**: [@yourhandle](https://twitter.com/yourhandle)
- 🌐 **Website**: [your-website.com](https://your-website.com)