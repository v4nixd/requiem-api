# Requiem API

---

[![Node.js](https://img.shields.io/badge/Node.js-22+-brightgreen?style=flat-square)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=flat-square)](https://www.typescriptlang.org/)
[![Fastify](https://img.shields.io/badge/Fastify-v5.6.2-orange?style=flat-square)](https://www.fastify.io/)
[![Prisma](https://img.shields.io/badge/Prisma-v7.1.0-lightblue?style=flat-square)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16+-blue?style=flat-square)](https://www.postgresql.org/)
[![Postman](https://img.shields.io/badge/Postman-Collection-lightgrey?style=flat-square)](https://www.postman.com/)
[![Docker](https://img.shields.io/badge/Docker-Compose-blue?style=flat-square)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

---

## Overview

Requiem API is the central backend hub for all Requiem projects. It hosts the shared services, data, and contracts that every product consumes, giving all apps one consistent platform to build on.

| Feature                  | Description                                                            |
| ------------------------ | ---------------------------------------------------------------------- |
| **Fastify + TypeScript** | High-performance Node.js server framework with full TypeScript support |
| **Prisma ORM**           | Type-safe database access with PostgreSQL integration                  |
| **Docker Compose**       | Ready-to-use local PostgreSQL setup                                    |

---

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/v4nixd/requiem-api.git
cd requiem-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Edit .env as needed. Key variables include:

- DATABASE_URL - PostgreSQL connection string
- POSTGRES_PASSWORD - Database password
- API_KEY - Key for vulnerable routes

### 4. Start PostgreSQL using Docker

```bash
docker compose up -d
```

or in some cases

```bash
docker-compose up -d
```

### 5. Generate Prisma client

```bash
npx prisma generate
```

### 6. Run database migrations

```bash
npx prisma migrate dev --name init --env-file .env
```

- This will create the necessary tables and apply Prisma schema

### 7. Start the development server

```bash
npm run dev
```

- The server will run at http://localhost:3000

- Optional: To stop Docker containers:

```bash
docker-compose down
```

## API Endpoints

The backend provides the following endpoints. All responses are JSON.
Protected routes require API key.

### Users

| Method | Endpoint       | Description                                   |
| ------ | -------------- | --------------------------------------------- |
| POST   | `/users/sync`  | Register a new user or Update an existing one |
| GET    | `/users/:id`   | Get user by discord ID                        |
| GET    | `/users/count` | Get total user count in database              |
| GET    | `/users`       | Get paginated list of users                   |

### Logs

- In development, not really intended for use

| Method | Endpoint | Description                                 |
| ------ | -------- | ------------------------------------------- |
| POST   | `/logs`  | Create a new log                            |
| GET    | `/logs`  | Get log by Type\|discordID with limit 1-500 |

### Testing

- Use **Postman** or **curl** to test endpoints
- Include the API key in `x-api-key` header for protected routes
- `Content-Type` should always be `application/json`

## Tech Stack & Features

This backend is a solid foundation for new modern full-stack applications made for [Requiem](https://discord.gg/rqm). Key technologies and features include:

### Core Technologies

| Technology                  | Purpose                                            |
| --------------------------- | -------------------------------------------------- |
| **Node.js 22+**             | JavaScript runtime for server-side development     |
| **TypeScript 5+**           | Strong typing and modern JS features               |
| **Fastify v5**              | High-performance web framework                     |
| **PostgreSQL 16+**          | Relational database                                |
| **Prisma ORM**              | Database schema management & query builder         |
| **Snowflake**               | Distributed unique ID generation algorithm         |
| **Docker & Docker Compose** | Containerized database and development environment |

### Features

- **User Module**:

  - Sync users from Discord payloads via `/users/sync` (API key protected)
  - Fetch a user by Discord ID via `/users/:id`
  - Paginated user listing with `page/limit/total/totalPages/data`
  - Total user count via `/users/count`

- **Validation & Schemas**:

  - Zod request/response schemas for payloads and params
  - Query coercion for `page` (default 1) and `limit` (default 20, max 100)
  - ISO timestamp normalization for user `createdAt`/`updatedAt`

- **Data Layer**:

  - Prisma-backed upsert by `discordId` with Snowflake IDs
  - Ordered listings by newest users
  - DTO mapper to keep responses consistent

This setup provides a **professional, modular, and scalable foundation** to quickly bootstrap API modules for new projects, with clean separation of concerns (routes, services, controllers, schemas) and best practices integrated.

## Contributing

We welcome contributions to improve this project. To contribute, please follow these guidelines:

1. **Fork the repository** and create your own branch:

```bash
git checkout -b feature/your-feature-name
```

2. **Install dependencies** and set up your development environment:

```bash
npm install
cp .env.example .env
```

3. **Make your changes**

- Follow the existing project structure (controllers, routes, schemas, services).

- Keep code modular, clean, and professional.

- Add or update TypeScript types where necessary.

- Ensure proper input validation using Zod schemas.

- Write tests for new features if applicable.

4. **Run the development server and verify your changes:**

```bash
npm run dev
```

5. **Commit your changes** with **clear** and descriptive messages:

```bash
git add .
git commit -m "Add meaningful description of your change"
```

6. **Push your branch** and create a **pull request** against the **main** branch:

```bash
git push origin feature/your-feature-name
```

7. **Pull requests review**

- PRs should be reviewed by at least one collaborator.

- Ensure all CI checks pass before merge.

- Rebase if necessary to keep history clean.

By following these guidelines, you help maintain a **professional, high-quality, and maintainable codebase.**

## License

This project is licensed under the MIT License.

You are free to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of this software, subject to the following conditions:

- The above copyright notice and this permission notice shal be included in all copies or substantial portions of the Software.
- The software is provided "as is", without warranty of any kind, express or implied.

For full license text, see the [LICENSE](LICENSE) file.
