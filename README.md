# 🎓 CampusCare

**CampusCare** is a student support platform designed to help university students submit and track support requests in one place.

The project is also being developed as a practical **DevOps & Cloud portfolio project**, demonstrating application development, version control, containerization, CI/CD, testing, deployment, monitoring, and security practices.

## 🚀 Features

* 📝 Submit student support requests
* 📋 View submitted support requests
* 🏷️ Categorize requests
* 📊 Track request status
* ❤️ API health check
* 💾 SQLite database storage
* 🌐 Web-based frontend
* 🔌 REST API backend

## 🛠️ Tech Stack

### Application

* HTML
* CSS
* JavaScript
* Node.js
* Express.js
* SQLite

### DevOps

* Git
* GitHub
* Docker
* Docker Compose
* GitHub Actions
* CI/CD
* Cloud Deployment
* Monitoring
* Health Checks

## 📁 Project Structure

```text
CampusCare/
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── app.js
│
├── .gitignore
├── package.json
└── README.md
```

## ⚙️ Run Locally

### 1. Clone the repository

```bash
git clone https://github.com/vikum-2/campuscare.git
```

### 2. Open the project

```bash
cd campuscare
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the server

```bash
node backend/server.js
```

The application will be available at:

```text
http://localhost:3000
```

## 🔌 API Endpoints

### Health Check

```http
GET /api/health
```

Example response:

```json
{
  "status": "OK",
  "service": "CampusCare API"
}
```

### Create Support Ticket

```http
POST /api/tickets
```

### Get Support Tickets

```http
GET /api/tickets
```

## 🗺️ DevOps Roadmap

This project will be progressively improved with:

* [x] Application development
* [x] REST API
* [x] SQLite database
* [x] Git version control
* [x] GitHub repository
* [ ] Docker containerization
* [ ] Docker Compose
* [ ] Automated testing
* [ ] GitHub Actions CI/CD
* [ ] Cloud deployment
* [ ] Health monitoring
* [ ] Security improvements
* [ ] Production deployment

## 🎯 Project Goal

The goal of CampusCare is to build a useful student-support application while demonstrating real-world **DevOps and Cloud Engineering practices**.

## 👨‍💻 Author

**Vikum Prabodya**

IT Undergraduate — Networking & Mobile Computing

GitHub: [vikum-2](https://github.com/vikum-2)
