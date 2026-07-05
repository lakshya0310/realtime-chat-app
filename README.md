# Real-Time Chat Application

A full-stack real-time chat application built using the **MERN Stack** and **Socket.IO**. The application enables users to communicate instantly through one-to-one messaging with real-time updates, file sharing, typing indicators, online status tracking, and profile customization.

## Live Demo

**Frontend:** [Frontend Link](https://realtime-chat-app-gold-gamma.vercel.app/)

**Backend:** [Backend Link](https://realtime-chat-app-bx40.onrender.com/)

---

#  Features

### Authentication
- User Registration
- Secure Login using JWT Authentication
- Protected Routes
- Persistent Login
- Logout Functionality

### Real-Time Messaging
- Instant messaging using Socket.IO
- Typing indicators
- Online/Offline status
- Message delivery status
- Read receipts

### Conversations
- Create new conversations
- Search users
- Conversation sidebar
- Latest message preview

### File Sharing
- Upload images
- Upload PDF and document files
- Drag & Drop file upload
- Image preview before sending
- Download shared files

### User Profiles
- Upload profile avatar
- Avatar displayed throughout the application
- Responsive profile page

### User Interface
- Responsive design
- Emoji picker
- Loading states
- Empty states
- Modern interface built with Tailwind CSS

---

#  Tech Stack

## Frontend

- React.js
- React Router
- Axios
- Socket.IO Client
- Tailwind CSS
- Emoji Picker React
- Lucide React

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO
- JWT Authentication
- Multer
- bcrypt.js

## Database

- MongoDB Atlas

## Deployment

- Frontend: Vercel
- Backend: Render

---

#  Project Structure

```
Realtime-Chat-App
│
├── client
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── context
│   │   ├── hooks
│   │   └── utils
│   └── package.json
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── socket
│   ├── uploads
│   ├── utils
│   └── server.js
│
└── README.md
```

---

#  Getting Started

## Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/realtime-chat-app.git

cd realtime-chat-app
```

---

## Backend Setup

```bash
cd server

npm install
```

Create a `.env` file inside the `server` directory.

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_ATLAS_URI

JWT_SECRET=YOUR_SECRET_KEY

CLIENT_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

---

## Frontend Setup

```bash
cd client

npm install
```

Create a `.env` file inside the `client` directory.

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

The application will be available at:

```
Frontend: http://localhost:5173

Backend: http://localhost:5000
```

---

#  API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Get current user |

## Conversations

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/conversations` | Fetch conversations |
| POST | `/api/conversations` | Create a conversation |

## Messages

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/messages/:conversationId` | Fetch messages |
| POST | `/api/messages` | Send message |

## Upload

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/upload` | Upload file |

## Profile

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/profile/avatar` | Upload avatar |

---

#  Deployment

The application is deployed using:

- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

Environment variables are used for production configuration.

---

#  What I Learned

This project provided hands-on experience with:

- Building full-stack MERN applications
- Designing RESTful APIs
- JWT Authentication & Authorization
- Real-time communication using Socket.IO
- MongoDB data modeling with Mongoose
- File uploads using Multer
- React Context API
- Responsive UI development with Tailwind CSS
- Production deployment using Vercel and Render
- Environment variable management
- Git branching and collaborative workflow

---

# Future Improvements

- Group chats
- Message editing
- Message deletion
- Voice messages
- Video calling
- Push notifications
- Cloudinary/AWS S3 for persistent file storage
- Dark mode
- End-to-end encryption

---

#  Author

**Lakshya Jindal**

- GitHub: https://github.com/lakshya0310
- LinkedIn: https://linkedin.com/in/lakshyaj03

---

# 📄 License

This project is licensed under the MIT License.

---

If you found this project useful, consider giving it a ⭐ on GitHub.
