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




