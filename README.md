# BlogSpace: A Minimalist Full-Stack Blogging Platform

*Live Demo:* [Frontend on Vercel](https://your-frontend.vercel.app) • [Backend on Railway](https://your-backend.railway.app/api/posts/)

## Overview
*BlogSpace* is a sleek, minimalist full-stack blog application where users can sign up, log in, create, edit, and delete blog posts. It features JWT authentication, a clean responsive UI, and is deployed on the cloud.

---

## Features
- ✅ User authentication with JWT
- 📝 Create, read, update, delete (CRUD) blog posts
- 🎨 Responsive and minimalist UI
- ☁ Hosted on Vercel (frontend) and Railway (backend)

---

## Tech Stack
### Frontend
- *React* (with TypeScript)
- *Tailwind CSS*
- *React Router DOM*
- *Vercel* for deployment

### Backend
- *Django* + *Django REST Framework*
- *PostgreSQL* (hosted via Railway)
- *Simple JWT* for authentication
- *CORS headers & Whitenoise* for production readiness
- *Railway* for deployment

---

## 🛠 Local Development Setup

### 1. Clone the Repository
bash
git clone https://github.com/yourusername/blogspace
cd blogspace


### 2. Backend Setup
bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt


#### Environment Variables
Create a .env file in the backend directory:
env
SECRET_KEY=your-django-secret-key
DEBUG=True
DATABASE_URL=your-local-or-railway-db-url


#### Run Migrations and Start Server
bash
python manage.py migrate
python manage.py runserver


### 3. Frontend Setup
bash
cd frontend
npm install


#### Environment Variables
Create a .env file in the frontend directory:
env
VITE_API_URL=https://your-backend-service-url/api


#### Start Frontend
bash
npm run dev


---

## 🌍 Deployment Guide

### Backend (Railway)
1. Push backend to GitHub
2. Connect GitHub repo to [Railway](https://railway.app)
3. Add environment variables in Railway settings
4. Set build command: pip install -r requirements.txt
5. Set start command: python manage.py migrate && gunicorn blog_backend.wsgi
6. Add PostgreSQL plugin and connect

### Frontend (Vercel)
1. Push frontend to GitHub
2. Import repo into [Vercel](https://vercel.com)
3. Add VITE_API_URL environment variable
4. Deploy

---

## 📁 Folder Structure

/blogspace
  /frontend     # React app
  /backend      # Django app


---

## 🔐 Authentication
- JWT tokens are stored in localStorage
- Protected routes check for valid login
- Only the author can edit/delete their own posts

---

## 🤝 Contributions
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

---

## 📜 License
[MIT](LICENSE)

---

Crafted with care for clean code, performance, and an effortlessly chic aesthetic.

---

Feel free to ping me if you need the .env templates, mock user data, or a walkthrough video.
