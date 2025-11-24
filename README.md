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

### Auth Endpoints

- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/logout
- POST /api/auth/refresh

### Categories & Ingredients Endpoints

- GET /api/categories
- GET /api/ingredients

### Recipes Endpoints

- GET /api/recipes
- GET /api/recipes/id/:recipeId
- POST /api/recipes/create-recipe
- GET /api/recipes/own
- POST /api/recipes/favorites/:recipeId
- DELETE /api/recipes/favorites/:recipeId
- GET /api/recipes/favorites
- DELETE /api/recipes/own/delete/:recipeId

### User Endpoints

- GET /api/users

---

## Environment Variables Overview

- PORT={your_preferable_port}
- NODE_ENV=development
- MONGO_URL={your_mongo_url}

- JWT_SECRET={your_JWT_secret}

- CLOUDINARY_CLOUD_NAME=dbnixmnsf
- CLOUDINARY_API_KEY={your_cloudinary_api_key}
- CLOUDINARY_API_SECRET={your_cloudinary_api_secret}
- FRONTEND_DOMAIN={you may use localhost or any other}

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

## 📄 License

This project is licensed under the MIT License.
You are free to use, modify, and distribute this code for learning or personal projects.

See the `LICENSE` file for details.

## 👥 Contributors [![Contributors](https://img.shields.io/github/contributors/AlejandroMotyl/yumyum-backend.svg)](https://github.com/AlejandroMotyl/yumyum-backend/graphs/contributors)

Thanks to all amazing members of the YumYum team!

<table>
  <tr>
    <td align="center"><a href="https://github.com/mad-jules"><img src="https://avatars.githubusercontent.com/mad-jules" width="70px;" alt=""/><br /><sub><b>mad-jules</b></sub></a></td>
    <td align="center"><a href="https://github.com/JustSanya1"><img src="https://avatars.githubusercontent.com/JustSanya1" width="70px;" alt=""/><br /><sub><b>JustSanya1</b></sub></a></td>
    <td align="center"><a href="https://github.com/Sasha-Velikorod"><img src="https://avatars.githubusercontent.com/Sasha-Velikorod" width="70px;" alt=""/><br /><sub><b>Sasha-Velikorod</b></sub></a></td>
    <td align="center"><a href="https://github.com/yehor-lytovchenko"><img src="https://avatars.githubusercontent.com/yehor-lytovchenko" width="70px;" alt=""/><br /><sub><b>yehor-lytovchenko</b></sub></a></td>
    <td align="center"><a href="https://github.com/RocketReact"><img src="https://avatars.githubusercontent.com/RocketReact" width="70px;" alt=""/><br /><sub><b>RocketReact</b></sub></a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/artem-v20"><img src="https://avatars.githubusercontent.com/artem-v20" width="70px;" alt=""/><br /><sub><b>artem-v20</b></sub></a></td>
    <td align="center"><a href="https://github.com/Djakyz"><img src="https://avatars.githubusercontent.com/Djakyz" width="70px;" alt=""/><br /><sub><b>Djakyz</b></sub></a></td>
    <td align="center"><a href="https://github.com/usernameRuslant"><img src="https://avatars.githubusercontent.com/usernameRuslant" width="70px;" alt=""/><br /><sub><b>usernameRuslant</b></sub></a></td>
    <td align="center"><a href="https://github.com/vitalii-cherukha"><img src="https://avatars.githubusercontent.com/vitalii-cherukha" width="70px;" alt=""/><br /><sub><b>vitalii-cherukha</b></sub></a></td>
    <td align="center"><a href="https://github.com/alex-dmytriev"><img src="https://avatars.githubusercontent.com/alex-dmytriev" width="70px;" alt=""/><br /><sub><b>alex-dmytriev</b></sub></a></td>
  </tr>
</table>
