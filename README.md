# 🚇 StationHub

StationHub is a real-time metro station announcement system.

The project allows passengers to view station announcements and receive new announcements instantly without refreshing the page.

Admins can securely log in and publish announcements to specific stations.

---

## 📌 Project Overview

StationHub was developed as a backend-focused project using Node.js, Express, MongoDB, JWT authentication, and Socket.io.

The system has two main users:

- 👤 Passengers
- 🛡️ Admins

### Passengers can:

- View available stations
- Search for stations
- View station announcements
- View announcement history
- Filter announcements by status
- Use pagination for announcements
- See the number of online viewers
- Receive new announcements in real time
- Receive updates without refreshing the page

### Admins can:

- Log in securely
- Authenticate using JWT
- Create station announcements
- Select the announcement status
- Send announcements to a specific station
- Access protected announcement routes

---

## ✨ Features

### Passenger Features

- View all stations
- Search stations
- View station announcements
- Pagination for announcements
- Filter announcements by status
- Real-time announcements using Socket.io
- Real-time viewer count
- No page refresh required for new announcements

### Admin Features

- Secure admin login
- Password verification using bcrypt
- JWT authentication
- Protected announcement creation
- Login rate limiting
- Request validation
- Role-based authentication

### Backend Features

- RESTful API
- MongoDB database
- Mongoose models
- Controller-Service architecture
- Central error handling
- Express validation
- Socket.io rooms
- Real-time presence tracking
- Automated integration tests

---

## 🛠️ Technologies Used

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.io
- JSON Web Token (JWT)
- bcryptjs
- express-validator
- express-rate-limit
- dotenv
- CORS

### Testing

- Jest
- Supertest

### Frontend

- HTML
- CSS
- JavaScript
- Socket.io Client
- Font Awesome
- Google Fonts

---

## 📁 Project Structure

```text
stationHub/
│
├── backend/
│   │
│   ├── controller/
│   │   ├── authController.js
│   │   ├── messageController.js
│   │   └── stationController.js
│   │
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   └── requireAdmin.js
│   │
│   ├── models/
│   │   ├── admin.js
│   │   ├── message.js
│   │   └── station.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── messageRoutes.js
│   │   └── stationRoutes.js
│   │
│   ├── services/
│   │   ├── authServices.js
│   │   ├── messageServices.js
│   │   └── stationServices.js
│   │
│   ├── sockets/
│   │   └── socket.js
│   │
│   ├── testes/
│   │   ├── auth.test.js
│   │   ├── message.test.js
│   │   ├── station.test.js
│   │   └── setup.js
│   │
│   ├── config/
│   │
│   ├── .gitignore
│   ├── app.js
│   ├── server.js
│   ├── package.json
│   └── seed.js
│
├── frontend/
│   │
│   ├── css/
│   ├── js/
│   ├── assets/
│   ├── index.html
│   └── admin-login.html
│
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/jihadahmedeid-cloud/stationHub.git
```

### 2. Open the Project

```bash
cd stationHub
```

### 3. Open the Backend Folder

```bash
cd backend
```

### 4. Install Dependencies

```bash
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file inside the `backend` folder.

Example:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
```

Depending on the authentication configuration, the project may also use additional environment variables for admin credentials.

### Important

The `.env` file contains sensitive information and must not be committed to GitHub.

Make sure `.env` is included in `.gitignore`.

Example:

```gitignore
.env
node_modules/
```

---

## 🗄️ Database

StationHub uses MongoDB with Mongoose.

The project contains a seed script that creates the initial station and message data.

Run the seed script with:

```bash
node seed.js
```

The seed script:

1. Connects to MongoDB.
2. Removes old station and message records.
3. Creates the initial stations.
4. Creates sample announcements.
5. Disconnects from MongoDB.

---

## ▶️ Running the Backend

Start the backend server:

```bash
npm start
```

For development with Nodemon:

```bash
npm run dev
```

The backend runs locally on:

```text
http://localhost:3000
```

---

## ❤️ Health Check

The backend provides a health endpoint:

```http
GET /health
```

Example response:

```json
{
  "status": "ok"
}
```

A successful response confirms that the backend server is running.

---

# 🔌 API Endpoints

All API routes use the following base path:

```text
/api/v1
```

---

## 🚉 Stations API

### Get All Stations

```http
GET /api/v1/stations
```

This endpoint returns all available stations.

The stations are returned sorted by:

1. Metro line
2. Station order

Example response:

```json
{
  "success": true,
  "data": [
    {
      "_id": "station_id",
      "name": "ramses",
      "status": "online",
      "line": "line1",
      "order": 1
    }
  ]
}
```

This endpoint is public and does not require authentication.

---

# 🔐 Authentication API

## Admin Login

```http
POST /api/v1/auth/login
```

The login endpoint authenticates an admin and returns a JWT.

### Request Body

```json
{
  "email": "admin@stationhub.com",
  "password": "your_password"
}
```

### Successful Response

The response contains a JWT token.

Example:

```json
{
  "success": true,
  "token": "your_jwt_token"
}
```

The password is verified using bcrypt.

The JWT contains authentication information such as:

- Admin ID
- Admin role

The JWT is signed using the secret stored in the environment variables.

---

## 🚦 Login Rate Limiting

The login endpoint is protected using `express-rate-limit`.

If too many login attempts are made from the same IP address, the server returns an error such as:

```json
{
  "success": false,
  "message": "Too many login attempts. Try again later."
}
```

---

# 📢 Announcements API

## Get Station Announcements

```http
GET /api/v1/stations/:station/updates
```

Example:

```http
GET /api/v1/stations/ramses/updates
```

This endpoint returns announcements for a specific station.

Announcements are sorted from newest to oldest.

### Pagination

The endpoint supports:

```text
?page=1&limit=10
```

Example:

```http
GET /api/v1/stations/ramses/updates?page=1&limit=10
```

### Filtering

Announcements can also be filtered by status.

Example:

```http
GET /api/v1/stations/ramses/updates?status=warning
```

Possible statuses include:

```text
info
warning
alert
```

### Example Response

```json
{
  "success": true,
  "data": [],
  "pagination": {
    "total": 0,
    "page": 1,
    "limit": 10,
    "pages": 0
  }
}
```

This endpoint is public.

---

## ➕ Create Announcement

```http
POST /api/v1/stations/:station/updates
```

Example:

```http
POST /api/v1/stations/ramses/updates
```

This endpoint is protected and requires an admin JWT.

### Authorization Header

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

### Request Body

```json
{
  "status": "warning",
  "message": "Live announcement from StationHub"
}
```

### Successful Response

The server returns HTTP status:

```text
201 Created
```

Example:

```json
{
  "success": true,
  "data": {
    "status": "warning",
    "message": "Live announcement from StationHub"
  }
}
```

After the announcement is successfully stored in MongoDB, it is broadcast to passengers connected to that station using Socket.io.

---

# 🛡️ Authentication Middleware

Protected routes use JWT authentication.

The client sends the token using the Bearer authentication scheme:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

The authentication middleware:

1. Reads the Authorization header.
2. Checks for the Bearer token.
3. Verifies the JWT signature.
4. Decodes the token.
5. Stores the decoded user information in `req.user`.
6. Allows the request to continue if authentication succeeds.

If the token is missing or invalid, the server returns:

```json
{
  "success": false,
  "message": "Unauthorized"
}
```

or:

```json
{
  "success": false,
  "message": "Invalid token"
}
```

---

# ⚡ Socket.io

StationHub uses Socket.io to provide real-time communication between the backend and frontend.

Passengers join a room based on their station.

---

## Join Station

The frontend emits:

```javascript
socket.emit("joinStation", "ramses");
```

The server places the socket inside the station room:

```text
ramses
```

If the passenger changes stations, the socket leaves the previous station room and joins the new one.

---

## 👥 Viewer Tracking

StationHub tracks the number of connected viewers for each station.

The server emits:

```text
presenceUpdate
```

Example payload:

```json
{
  "stationId": "ramses",
  "count": 3
}
```

The frontend uses this information to display the number of online viewers.

---

## 📢 New Announcement Event

When an admin successfully creates an announcement, the server emits:

```text
newMessage
```

to the station's Socket.io room.

Example payload:

```json
{
  "station": "station_id",
  "status": "warning",
  "message": "Live test from admin"
}
```

Passengers receive the announcement instantly without refreshing the page.

---

# 🔄 Real-Time Flow

The announcement flow works as follows:

```text
Admin
  │
  │ POST announcement
  ▼
Express Route
  │
  ▼
JWT Authentication
  │
  ▼
Validation
  │
  ▼
Message Service
  │
  ▼
MongoDB
  │
  │ successful save
  ▼
Socket.io
  │
  ▼
Station Room
  │
  ├── Passenger 1
  ├── Passenger 2
  └── Passenger 3
```

This ensures that the announcement is broadcast only after it has been successfully stored in the database.

---

# ✅ Validation

StationHub uses `express-validator` to validate incoming requests.

For announcement creation, the request is checked before the controller processes it.

For example, the announcement message cannot be empty.

Invalid requests are rejected before database operations are performed.

---

# ❌ Error Handling

The backend uses centralized error handling.

Errors are returned using a consistent JSON structure:

```json
{
  "success": false,
  "message": "Error message"
}
```

Common HTTP status codes include:

| Status | Meaning |
|--------|---------|
| 200 | Successful request |
| 201 | Resource created |
| 400 | Bad request |
| 401 | Unauthorized |
| 404 | Resource not found |
| 422 | Validation error |
| 500 | Internal server error |

---

# 🧪 Testing

StationHub uses:

- Jest
- Supertest

The project contains integration tests for the main API functionality.

Run all tests with:

```bash
npm test
```

Current test result:

```text
Test Suites: 3 passed, 3 total
Tests:       9 passed, 9 total
```

The tests cover:

- Stations API
- Authentication API
- Announcements API

The tests verify that the backend routes return the expected status codes and responses.

---

# 🧰 Development

For development, use:

```bash
npm run dev
```

This starts the server using Nodemon.

For normal execution:

```bash
npm start
```

---

# 🌐 Frontend

The frontend provides two main pages:

### Passenger Page

```text
frontend/index.html
```

Passengers can:

- Search stations
- Select stations
- View announcements
- See online viewers
- Receive real-time updates

### Admin Page

```text
frontend/admin-login.html
```

Admins can:

- Log in
- Select a station
- Select announcement priority
- Write an announcement
- Send the announcement

---

# 🔒 Security

StationHub includes several security measures:

- Password hashing with bcrypt
- JWT authentication
- Protected admin routes
- Input validation
- Login rate limiting
- Environment variables for secrets
- Centralized error handling

Sensitive values such as the MongoDB connection string and JWT secret are stored in `.env` and are not committed to the repository.

---

# 🚀 Project Status

StationHub currently includes:

- ✅ MongoDB database connection
- ✅ Station API
- ✅ Admin authentication
- ✅ JWT authentication
- ✅ Protected announcement route
- ✅ Announcement API
- ✅ Pagination
- ✅ Announcement filtering
- ✅ Input validation
- ✅ Central error handling
- ✅ Socket.io rooms
- ✅ Real-time announcements
- ✅ Real-time viewer tracking
- ✅ Jest and Supertest integration tests
- ⏳ Deployment

The project is currently designed and tested to run locally.

---

# 👩‍💻 Author

**Gehad Ahmed**

GitHub:

https://github.com/jihadahmedeid-cloud/stationHub

---

# 📄 License

This project was created as a final backend project for educational purposes.