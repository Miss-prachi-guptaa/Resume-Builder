# 📝 Resume Builder

A web application to **create professional resumes** quickly and efficiently. Users can fill in their details, customize sections, and download their resume in PDF format. Built with Node.js, Express, and MongoDB, with **JWT + Session hybrid authentication** for secure user management.

---

## 🚀 Features

- 🧑‍💼 Add personal information, education, work experience, skills, and projects  
- 👀 Real-time resume preview  
- 📄 Download resume as a PDF  
- 🔐 **User authentication with JWT + Session hybrid**  
- 🌐 Environment variables support for configuration  
- ⚡ Easy to deploy locally or on a server  

---

## 🛠 Technologies Used

- **Backend:** Node.js, Express  
- **Database:** MongoDB (Mongoose)  
- **Authentication:** JWT + Session hybrid  
- **Frontend:** HTML, CSS, JavaScript (React optional)  
- **Other:** dotenv for environment variables, PDF generation libraries  

---

## 🏗 Getting Started

### Prerequisites
- Node.js installed  
- MongoDB installed or MongoDB Atlas account  

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/resume-builder.git
cd resume-builder

```

1.**Install dependencies**

npm install


2.**Create a .env file based on .env.example and fill in your values**

PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/resumeBuilderMongoose
JWT_SECRET=your_jwt_secret_here
SESSION_SECRET=your_session_secret_here


Start the server

npm start
