# 🏡 Dream-Key Estate

A Full-Stack real estate web application that allows users to browse, search, and manage property listings. Built with the MERN stack (MongoDB, Express, React, Node.js) and styled with Tailwind CSS.

🔗 **Live Demo:** [dream-key-estate.onrender.com](https://dream-key-estate.onrender.com/)
💻 **Repository:** [github.com/FathimaNufla2000/Dream-Key-Estate](https://github.com/FathimaNufla2000/Dream-Key-Estate)

---

## 📌 Project Overview

Dream-Key Estate is a property listing platform where users can create accounts, browse available properties for sale or rent, search and filter listings, and manage their own property listings through a personal profile dashboard. The application supports secure authentication, full CRUD functionality for listings, and cloud-based image storage.

---

## ✨ Features

### 👤 User Features
- Sign up / Sign in with email and password
- Sign in with Google (OAuth)
- Update profile information and profile picture
- Delete account
- Create, edit, and delete property listings
- View personal listing history

### 🏠 Listing Features
- Create listings with multiple images (up to 6 per listing)
- Mark listings as **For Sale** or **For Rent**
- Add amenities: parking spot, furnished, special offer/discount pricing
- Automatic discount price validation (cannot exceed regular price)
- View detailed listing pages with an image gallery
- Contact the listing owner directly via a contact form

### 🔍 Search & Discovery
- Search listings by keyword
- Filter by type (rent/sale), offer status, parking, and furnished status
- Sort listings by price or date
- "Show more" pagination for browsing large result sets

---

## 🛠 Technology Stack

**Frontend**
- React (Vite)
- Redux Toolkit (state management)
- React Router
- Tailwind CSS
- Firebase Authentication (Email/Password + Google OAuth)

**Backend**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT (JSON Web Tokens) for session handling

**Image Storage**
- Cloudinary (unsigned upload preset for direct browser-to-cloud uploads)

**Deployment**
- Render (Web Service, Node runtime)
- MongoDB Atlas (cloud database)

---

## 📂 Project Structure

```
Dream-Key Estate/
├── api/
│   ├── controller/
│   │   ├── auth.controller.js
│   │   ├── listing.controller.js
│   │   └── user.controller.js
│   ├── models/
│   │   ├── listing.model.js
│   │   └── user.model.js
│   ├── routes/
│   │   ├── auth.route.js
│   │   ├── listing.route.js
│   │   └── user.route.js
│   ├── utils/
│   │   ├── error.js
│   │   └── verifyUser.js
│   └── index.js
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Contact.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── ListingItem.jsx
│   │   │   ├── OAuth.jsx
│   │   │   └── PrivateRoute.jsx
│   │   ├── pages/
│   │   │   ├── About.jsx
│   │   │   ├── CreateListing.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Listing.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Search.jsx
│   │   │   ├── SignIn.jsx
│   │   │   ├── SignUp.jsx
│   │   │   └── UpdateListing.jsx
│   │   ├── redux/
│   │   │   ├── user/userSlice.js
│   │   │   └── store.js
│   │   ├── App.jsx
│   │   ├── firebase.js
│   │   └── main.jsx
│   └── package.json
└── package.json
```

---

## ⚙️ Installation & Local Setup

### Prerequisites
- Node.js (v18 or higher)
- A MongoDB Atlas account (free tier works)
- A Firebase project (for authentication)
- A Cloudinary account (for image uploads)

### 1. Clone the repository
```bash
git clone https://github.com/FathimaNufla2000/Dream-Key-Estate.git
cd "Dream-Key Estate"
```

### 2. Backend setup
```bash
npm install
```

Create a `.env` file in the root directory:
```env
MONGO=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 3. Frontend setup
```bash
cd client
npm install
```

Create a `.env` file inside `client/`:
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
```

### 4. Run the application

**Backend** (from the root folder):
```bash
npm run dev
```

**Frontend** (from the `client/` folder, in a separate terminal):
```bash
npm run dev
```

The frontend will run on `http://localhost:5173` and proxy API requests to the backend.

---

## ☁️ Image Uploads — Cloudinary

Property and profile images are uploaded directly from the browser to Cloudinary using an **unsigned upload preset**, which avoids exposing any secret keys on the client side. Uploaded image URLs are then stored in MongoDB alongside each listing/user document.

> **Note:** This project originally used Firebase Cloud Storage for image uploads. It was migrated to Cloudinary after Firebase began requiring a billing account (Blaze plan) for Cloud Storage access, even on small free-tier usage.

---

## 🚀 Deployment Notes

- The app is deployed as a single Render Web Service, with the Express server also serving the built React frontend in production.
- MongoDB Atlas is used as the cloud database, with network access configured to allow connections from anywhere (required since Render doesn't use static IPs on the free tier).
- Environment variables (`MONGO`, `JWT_SECRET`, `VITE_FIREBASE_API_KEY`) are configured directly in the Render dashboard.

---

## 🔒 Security Notes

- Passwords are hashed using bcrypt before being stored.
- JWT tokens are stored in HTTP-only cookies for authenticated sessions.
- Protected routes (creating/editing/deleting listings, profile updates) require a valid token, verified via middleware.

---

## 🚧 Future Enhancements

- Pagination improvements for large listing sets
- In-app messaging between buyers/renters and listing owners
- Map-based property search
- Email notifications for new listings matching saved searches
- Admin moderation dashboard

---

## 👩‍💻 Author

**Fathima Nufla**
[GitHub](https://github.com/FathimaNufla2000) · [LinkedIn](https://www.linkedin.com/in/fathima-nufla-a8a421243/)

---

## 📄 License

This project is developed for educational and portfolio purposes.
