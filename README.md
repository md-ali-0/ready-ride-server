# Bike Rental Reservation System Backend

## Overview

The Bike Rental Reservation System is a backend project that allows users to rent bikes and manage their bookings. It features user authentication, bike management, and rental handling. The system supports both users and admin roles, providing different functionalities based on the role.

## Technologies

-   **Programming Language**: TypeScript
-   **Web Framework**: Express.js
-   **ODM**: Mongoose
-   **Validation Library**: Zod
-   **Authentication**: JWT (JSON Web Token)
-   **Password Hashing**: bcrypt
-   **Environment Management**: dotenv
-   **Other Libraries**: cors, cookie-parser, http-status

## Features

-   **User Management**: Sign up, login, view profile, update profile
-   **Bike Management**: Admins can add, update, delete, and view bikes
-   **Rental Management**: Users can create rentals, return bikes, and view their rental history
-   **Authentication Middleware**: Ensures secure access to routes
-   **Error Handling**: Comprehensive error responses and global error handling
-   **Data Validation**: Ensures data consistency using Zod

## API Endpoints

### User Routes

-   **Sign Up**: `/api/auth/signup` (POST)
-   **Login**: `/api/auth/login` (POST)
-   **Get Profile**: `/api/users/me` (GET)
-   **Update Profile**: `/api/users/me` (PUT)

### Bike Routes

-   **Create Bike (Admin Only)**: `/api/bikes` (POST)
-   **Get All Bikes**: `/api/bikes` (GET)
-   **Update Bike (Admin Only)**: `/api/bikes/:id` (PUT)
-   **Delete Bike (Admin Only)**: `/api/bikes/:id` (DELETE)

### Rental Routes

-   **Create Rental**: `/api/rentals` (POST)
-   **Return Bike (Admin Only)**: `/api/rentals/:id/return` (PUT)
-   **Get All Rentals for User**: `/api/rentals` (GET)

## Project Setup

### Prerequisites

-   Node.js (version >= 14.x)
-   MongoDB

### Installation

1. **Clone the repository**
    ```bash
    git clone https://github.com/md-ali-0/Bike-Rental-Reservation-System-Backend.git
    cd Bike-Rental-Reservation-System-Backend
    ```
2. **Install dependencies**
    ```bash
    npm install
    ```
3. **Set up environment variables**

    Create a `.env` file in the root directory and add the following variables:

    ```bash
    NODE_ENV = development
    PORT = 8080
    DB_URI = mongodb+srv://userName:Password@cluster0.daanzm4.mongodb.net
    DB_NAME = BikeRentalServiceDB
    JWT_ACCESS_SECRET = accessSecret
    JWT_ACCESS_EXPIRE_IN = 00h
    ```

4. **Run the server**
    ```bash
    npm run build
    npm run start
    ```
5. **Running in Development Mode**

    To run the server with automatic reloading:

    ```bash
    npm run dev
    ```

## Database Setup

Make sure MongoDB is running on your local machine or provide a remote MongoDB URI in the `.env` file.

## Authentication

The project uses JWT for authentication. Ensure you have a secure JWT_ACCESS_SECRET set in your .env file.

## Zod Validation

The API uses Zod for validating incoming request data. Make sure the validation schemas match your data models to prevent inconsistencies.
