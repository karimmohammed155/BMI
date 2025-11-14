# 📘 BMI Calculator API

A Node.js + Express backend that calculates Body Mass Index (BMI) for
both guest users and authenticated users. The system allows saving BMI
history, retrieving previous records, and deleting entries.\
Includes JWT authentication, error-handling middleware, and MongoDB
database integration.

------------------------------------------------------------------------

## 🚀 Features

-   BMI calculation (Guest + Authenticated Users)\
-   BMI category classification\
-   Save BMI history for logged-in users\
-   Retrieve user BMI history\
-   Delete saved BMI entries\
-   JWT Authentication\
-   Centralized error handling\
-   Modular folder structure

------------------------------------------------------------------------

## 📂 Project Structure

    BMI/
    │── index.js
    │── package.json
    │── vercel.json
    │── .env
    │── /DB
    │── /src
          │── /modules
          │      ├── calculations
          │      │      ├── calculate.controller.js
          │      │      └── calculate.route.js
          │      └── user (auth)
          │── /middlewares
          │── /utils

------------------------------------------------------------------------

## 🛠️ Installation & Setup

``` bash
git clone https://github.com/yourusername/BMI.git
cd BMI
npm install
```

### Create a `.env` file:

    DB_URL=your_mongodb_url
    JWT_SECRET=your_jwt_secret
    PORT=5000

### Start the server:

``` bash
npm start
```

------------------------------------------------------------------------

## 📡 API Endpoints

### Base URL:

/api/calculate

------------------------------------------------------------------------

### 🔹 1. Calculate BMI (Guest)

**POST** `/calculate_guest`\
Calculate BMI without authentication. Does not save data.

#### Request Body

``` json
{
  "weight": 80,
  "height": 180
}
```

#### Response

``` json
{
  "bmi": 24.69,
  "category": "Normal weight"
}
```

------------------------------------------------------------------------

### 🔹 2. Calculate BMI (Authenticated)

**POST** `/calculate_user`\
Requires JWT token. Saves BMI result in MongoDB.

#### Headers

    Authorization: Bearer <token>

#### Request Body

``` json
{
  "weight": 90,
  "height": 175
}
```

#### Response

``` json
{
  "message": "Bmi saved successfully",
  "data": {
    "bmi": 29.39,
    "category": "Overweight"
  }
}
```

------------------------------------------------------------------------

### 🔹 3. Get BMI History

**GET** `/history`\
Fetch all saved BMI records for logged-in user.

#### Headers

    Authorization: Bearer <token>

#### Response

``` json
{
  "history": [
    {
      "_id": "65a1c9...",
      "weight": 82,
      "height": 178,
      "bmi": 25.89,
      "category": "Overweight"
    }
  ]
}
```

------------------------------------------------------------------------

### 🔹 4. Delete BMI Entry

**DELETE** `/delete/:user_id`\
Deletes a specific BMI record for the authenticated user.

#### Headers

    Authorization: Bearer <token>

#### Response

``` json
{
  "message": "Bmi deleted successfully"
}
```

------------------------------------------------------------------------

## 🔐 Authentication (User Module)

This project includes:

-   User registration\
-   Login\
-   JWT token generation\
-   Protected routes with `auth()` middleware

(Located in `src/modules/user`)

------------------------------------------------------------------------

## 🧩 Middleware

### `error_handle`

Wraps controllers to handle errors centrally.

### `auth()`

Validates JWT token and attaches user info to `req.authUser`.

------------------------------------------------------------------------

## 🧪 Example BMI Formula

    BMI = weight (kg) / (height (m)²)

The controller converts height from cm → meters automatically.
