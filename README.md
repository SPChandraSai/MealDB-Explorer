# 🍽️ TheMealDB Explorer

A full-stack recipe exploration application built using **Node.js**, **Express**, **React**, and **TheMealDB API**.  
This project fulfills the **TheMealDB Explorer assignment** requirements by implementing:

- A backend **Web Service API** (Node.js + Express)
- A frontend **UI Layer** (React + TailwindCSS)
- Search, Category Browsing, Random Meal, and Recipe Details
- In-memory caching for improved performance

---

## 🚀 Project Overview

**TheMealDB Explorer** allows users to browse and search recipes using a clean UI powered by a custom backend service.

### ⭐ Features
- 🔍 Search meals by name  
- 📂 Browse by categories  
- 🎲 Random recipe generator (“I’m Feeling Hungry”)  
- 📘 Detailed recipe pages:
  - Ingredients  
  - Measures  
  - Instructions  
  - Thumbnail  
  - YouTube video  
- ⚡ Fast performance with caching  
- 📱 Fully responsive UI  

---

## 🏗️ Tech Stack

### **Frontend**
- React (Vite)
- React Router
- TailwindCSS
- shadcn/ui components
- Lucide Icons

### **Backend**
- Node.js
- Express.js
- In-memory caching
- Native Fetch API

### **External API**
- TheMealDB API (https://www.themealdb.com/api.php)

---

## 📁 Project Structure

📦 TheMealDB Explorer
│
├── Backend/
│ ├── server.js
│ ├── app.js
│ ├── src/
│ │ ├── controllers/
│ │ │ └── meals.controller.js
│ │ ├── routers/
│ │ │ └── meals.router.js
│ │ ├── services/
│ │ │ ├── meals.service.js
│ │ │ └── cache.service.js
│ │ ├── utils/
│ │ │ └── api.js
│
└── Frontend/
├── src/
│ ├── pages/
│ ├── components/
│ ├── hooks/
│ ├── utils/
│ ├── App.jsx
│ └── main.jsx


---

## 🔌 Backend API Documentation

Base URL:

```
http://localhost:5000/api/meals
```


### **GET /categories**
Returns list of meal categories.

### **GET /random**
Returns a random meal.

### **GET /search?q=<query>**
Search for meals by name.

### **GET /category/:category**
Get meals from a specific category.

### **GET /:id**
Return a full recipe with:
- Basic info
- Ingredients list
- Measures list
- Instructions
- Thumbnail
- YouTube link

---

## ⚡ Caching System

The backend includes an **in-memory caching engine** that stores:

- Categories  
- Search results  
- Category meals  
- Single meal details  
- Random meals  

Caching reduces API calls and improves performance.

---

## 🖥️ Running the Project

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/SPChandraSai/MealDB-Explorer.git
cd TheMealDB-Explorer
```

# 🛠️ Backend Setup
```
cd Backend
npm install
node server.js
```

Backend runs at:
```
http://localhost:5000
```

# 🎨 Frontend Setup
```
cd Frontend
npm install
npm run dev
```

Frontend runs at:
```
http://localhost:5173
```