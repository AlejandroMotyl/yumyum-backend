# 🍽️ YumYum Backend

YumYum Backend is an Express + MongoDB API for the YumYum recipes application.
It provides public and authenticated endpoints for browsing recipes, managing favorites, and working with user-created recipes.

---

## 🚀 Features

- Public recipes listing with pagination and filters
- Single recipe details endpoint
- User recipes (“own” recipes)
- Favorites: add / remove / list
- Recipe creation with:
  - Image upload (via Multer + Cloudinary)
  - Ingredients parsing
  - Payload validation (Celebrate/Joi)
- JWT-based authentication (via middleware)
- Centralized error handling
- Structured logging (Pino)

---

## 🧱 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **Database:** MongoDB (via Mongoose)
- **Auth:** JWT
- **Uploads:** Multer (+ Cloudinary)
- **Validation:** Celebrate/Joi
- **Logging:** Pino

---

## Endponts Overview

### Auth Routes

- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/logout
- POST /api/auth/refresh

### Categories & Ingredients

- GET /api/categories
- GET /api/ingredients

### Recipes Routes

- GET /api/recipes
- GET /api/recipes/id/:recipeId
- POST /api/recipes/create-recipe
- GET /api/recipes/own
- POST /api/recipes/favorites/:recipeId
- DELETE /api/recipes/favorites/:recipeId
- GET /api/recipes/favorites
- DELETE /api/recipes/own/delete/:recipeId

### User Routes

- GET /api/users

---

## 📦 Key Dependencies

These are the main packages that will be installed via `npm install`:

| Package         | Version | Purpose                                           |
| --------------- | ------- | ------------------------------------------------- |
| `bcrypt`        | ^6.0.0  | Password hashing for secure user credentials      |
| `celebrate`     | ^15.0.3 | Request payload validation (wrapper around Joi)   |
| `cloudinary`    | ^2.8.0  | Image storage and CDN for recipe thumbnails       |
| `cookie-parser` | ^1.4.7  | Parse cookies in incoming requests                |
| `cors`          | ^2.8.5  | Enable Cross-Origin Resource Sharing              |
| `dotenv`        | ^17.2.3 | Load environment variables from `.env`            |
| `express`       | ^5.1.0  | Web server and routing framework                  |
| `handlebars`    | ^4.7.8  | Templating (often for emails or HTML generation)  |
| `http-errors`   | ^2.0.0  | HTTP-friendly error objects (used in controllers) |
| `jsonwebtoken`  | ^9.0.2  | JWT creation and verification for auth            |
| `mongoose`      | ^8.19.1 | MongoDB ODM (schemas, models, queries)            |
| `multer`        | ^2.0.2  | Handling multipart/form-data (file uploads)       |
| `nodemailer`    | ^7.0.10 | Sending emails (notifications, confirmations)     |
| `pino-http`     | ^11.0.0 | HTTP request logging middleware (Pino)            |
| `pino-pretty`   | ^13.1.2 | Human-readable formatting for Pino logs           |

---

## 📂 Project Structure
