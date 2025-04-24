
# Online Pharmacy System

This is a full-stack **Online Pharmacy System** designed to ease the sale of medications and includes user authentication, order processing, product management, and payment integration. It features a modular backend with a separate **MongoDB** container for database storage. The backend is built with **Node.js** and **Express**, while the frontend will be implemented separately.

## Table of Contents

- [Online Pharmacy System](#online-pharmacy-system)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Steps to Run Locally](#steps-to-run-locally)
  - [Docker Setup](#docker-setup)
  - [Folder Structure](#folder-structure)
  - [License](#license)

## Features

- **Authentication**: User login, signup, and JWT-based authorization.
- **Order Management**: Ability to create, update, and view orders.
- **Product Management**: CRUD operations for pharmacy products.
- **Payment Integration**: Integration with payment providers.
- **Alternative Medicine**: Suggesting alternatives for medicines.
- **Wishlist**: Users can add products to their wishlist.
- **Cart**: Add and manage products in the cart.
- **Error Handling & Validation**: Includes custom error handling middleware and Joi validation for inputs.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose)
- **Containerization**: Docker (for backend and MongoDB)
- **Validation**: Joi
- **Authorization**: JWT (JSON Web Tokens)

## Installation

### Prerequisites

- **Docker**: You need Docker installed to run the application in containers.
- **Node.js & npm** (optional for local dev).

### Steps to Run Locally

1. **Clone the repository**:

   ```bash
   git clone https://github.com/MustafaShokry/online-pharmacy-system.git
   cd online-pharmacy-system
   ```

2. **Install dependencies (if not using Docker)**:

   ```bash
   npm install
   ```

3. **Start the app (local)**:

   ```bash
   npm run dev
   ```

## Docker Setup

**Start using Docker Compose**:

   ```bash
   docker-compose up --build
   ```

> This will start the backend on `http://localhost:3000` and MongoDB on port `27017`.

**To stop the containers**:

   ```bash
   docker-compose down
   ```

## Folder Structure

```
.
├── src
│   ├── config        # MongoDB connection, environment config
│   ├── modules       # Feature-based modules (auth, orders, products, etc.)
│   │   └── auth
│   │       ├── auth.controller.js
│   │       ├── auth.service.js
│   │       ├── auth.routes.js
│   │       └── auth.model.js
│   ├── middleware    # Error handling, validation, etc.
│   ├── utils         # Utility functions
│   └── app.js        # Express app setup
├── index.js          # Entry point
├── Dockerfile
├── docker-compose.yml
├── .env
└── README.md
```

## License

[MIT License](LICENSE)

---
