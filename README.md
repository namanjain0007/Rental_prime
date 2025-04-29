# Rental Prime

A rental marketplace application built with Node.js, Express, and PostgreSQL.

## Project Structure

```
Rental_prime/
├── backend/
│   ├── controller/      # Route controllers
│   ├── database/        # Database configuration and schema
│   ├── middleware/      # Express middleware
│   ├── Models/          # Database models
│   ├── router/          # Express routes
│   ├── utlis/           # Utility functions
│   ├── .env             # Environment variables (not in git)
│   ├── .env.example     # Example environment variables
│   ├── package.json     # Project dependencies
│   └── server.js        # Entry point
```

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Database Setup

1. Create a PostgreSQL database:

```sql
CREATE DATABASE rental_prime;
```

2. Connect to the database:

```
\c rental_prime
```

3. Run the schema file to create tables:

```
psql -U your_username -d rental_prime -f backend/database/schema.sql
```

4. (Optional) Run the seed file to populate initial data:

```
psql -U your_username -d rental_prime -f backend/database/seed.sql
```

## Environment Variables

1. Copy the example environment file:

```
cp backend/.env.example backend/.env
```

2. Update the `.env` file with your database credentials and JWT secret:

```
PG_HOST=localhost
PG_PORT=5432
PG_USER=your_username
PG_PASSWORD=your_password
PG_DATABASE=rental_prime

JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1d

PORT=3000
```

## Installation

1. Clone the repository:

```
git clone https://github.com/your-username/Rental_prime.git
cd Rental_prime
```

2. Install dependencies:

```
cd backend
npm install
```

## Running the Application

Development mode:

```
npm run dev
```

Production mode:

```
npm start
```

The server will run at http://localhost:3000 by default.

## API Endpoints

### User Routes
- `POST /users` - Create a new user
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Authentication Routes
- `POST /auth/user/login` - User login
- `GET /auth/user/protected_route` - Protected user route

### Admin Routes
- `POST /admin` - Create admin user
- `GET /admin` - Get all admin users
- `GET /admin/:id` - Get admin by ID
- `PATCH /admin/:id` - Update admin
- `DELETE /admin/:id` - Delete admin

### Admin Authentication Routes
- `POST /auth/admin/login` - Admin login
- `GET /auth/admin/protected_route` - Protected admin route

### Vendor Listing Routes
- `POST /vendor_listing` - Create listing
- `GET /vendor_listing` - Get all listings
- `GET /vendor_listing/:id` - Get listing by ID
- `PATCH /vendor_listing/:id` - Update listing
- `DELETE /vendor_listing/:id` - Delete listing

### Category Routes
- `POST /category` - Create category
- `GET /category` - Get all categories
- `GET /category/:categoryId` - Get category by ID
- `PUT /category/:categoryId` - Update category
- `DELETE /category/:categoryId` - Delete category

### Pricing Plan Routes
- `POST /pricing_plans` - Create pricing plan
- `GET /pricing_plans` - Get all pricing plans
- `PATCH /pricing_plans/:planId` - Update pricing plan
- `DELETE /pricing_plans/:planId` - Delete pricing plan
