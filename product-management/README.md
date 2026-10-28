# Product Management API

A RESTful Product Management API built with **Spring Boot, Spring Security, JWT authentication, Spring Data JPA, and PostgreSQL**. The application provides secure user authentication and role-based access control for managing products.

## Features

- **User Registration & Login** — Register users and authenticate using email and password.
- **JWT Authentication** — Secure API endpoints using JSON Web Tokens.
- **Password Encryption** — Passwords are hashed using BCrypt.
- **Role-Based Authorization** — Separate permissions for `USER` and `ADMIN` roles.
- **Product Management** — Create, retrieve, update, and delete products.
- **Database Persistence** — Store users and products in PostgreSQL using Spring Data JPA and Hibernate.
- **Input Validation** — Validate product fields and incoming request data.
- **HTTP Error Handling** — Return appropriate HTTP status codes for authentication, authorization, validation, and resource errors.
- **Automated Tests** — Unit tests for authentication and product services, plus an application context test.

## Technology Stack

| Technology | Purpose |
|---|---|
| Java 17 | Programming language |
| Spring Boot 4 | Application framework |
| Spring Security | Authentication and authorization |
| JWT | Stateless authentication |
| Spring Data JPA | Data access |
| Hibernate | ORM |
| PostgreSQL | Relational database |
| Maven | Build and dependency management |
| JUnit & Mockito | Automated testing |

## Requirements

Before running the application, install:

- JDK 17 or a compatible supported JDK
- PostgreSQL
- Git (optional)
- Postman or another API client

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/moreboi10/PROJectRepo.git
cd PROJectRepo/product-management/product-management
```

### 2. Create the PostgreSQL database

Open PostgreSQL and execute:

```sql
CREATE DATABASE product_management;
```

The application connects to the database at:

```text
jdbc:postgresql://localhost:5432/product_management
```

The default configuration expects the PostgreSQL username to be `postgres`. Change the username in `src/main/resources/application.yaml` if your setup differs.

### 3. Configure environment variables

The application reads the database password and JWT signing secret from environment variables rather than storing them in source code.

In Windows PowerShell:

```powershell
$env:DB_PASSWORD = Read-Host "Enter PostgreSQL password"

$bytes = New-Object byte[] 32
$rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
$rng.GetBytes($bytes)
$env:JWT_SECRET = [Convert]::ToBase64String($bytes)
$rng.Dispose()
```

These variables remain available only in the current PowerShell session. Generate a secure secret and keep it private. Restart the application and log in again if the JWT secret changes, because tokens signed with the previous secret will no longer validate.

### 4. Run the application

From the directory containing `pom.xml`:

```powershell
.\mvnw.cmd spring-boot:run
```

The API runs at:

```text
http://localhost:8080
```

Hibernate is configured with `ddl-auto: update` in the development configuration, so the application can update its database schema automatically. For production deployments, use a managed schema migration approach.

## API Endpoints

Base URL: `http://localhost:8080`

### Authentication

| Method | Endpoint | Description | Expected status |
|---|---|---|---|
| POST | `/api/v1/auth/register` | Register a new user | `201 Created` |
| POST | `/api/v1/auth/login` | Authenticate and obtain a JWT | `200 OK` |

#### Register a user

**Request**

```http
POST /api/v1/auth/register
Content-Type: application/json
```

```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "StrongPassword123"
}
```

A successful response contains the authentication token and user information. New registrations receive the `USER` role by default; users cannot grant themselves the `ADMIN` role through registration.

#### Login

**Request**

```http
POST /api/v1/auth/login
Content-Type: application/json
```

```json
{
  "email": "test@example.com",
  "password": "StrongPassword123"
}
```

The response includes a JWT token and user details.

### Products

| Method | Endpoint | Permission | Description |
|---|---|---|---|
| GET | `/api/v1/products` | Authenticated users | Retrieve products |
| GET | `/api/v1/products/{id}` | Authenticated users | Retrieve a product by ID |
| POST | `/api/v1/products` | `ADMIN` | Create a product |
| PUT | `/api/v1/products/{id}` | `ADMIN` | Update a product |
| DELETE | `/api/v1/products/{id}` | `ADMIN` | Delete a product |

> These endpoint paths reflect the intended API structure. Confirm them against `ProductController.java` before submission if your mappings differ.

#### Example: Create a product

```http
POST /api/v1/products
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json
```

```json
{
  "name": "Wireless Mouse",
  "description": "Wireless mouse with adjustable DPI",
  "price": 799.00,
  "stockQuantity": 50
}
```

Use an `ADMIN` token for product creation, updates, and deletion.

### Using JWT Authentication

1. Register a user.
2. Log in to receive a JWT.
3. Copy the token from the response.
4. In Postman, select **Authorization → Bearer Token**.
5. Paste the token and send the protected request.
6. Use an administrator account to test restricted product operations.

## Authorization Rules

| Scenario | Expected status |
|---|---|
| Valid token and permitted operation | `200 OK`, `201 Created`, or another appropriate success status |
| Missing or invalid token on a protected endpoint | `401 Unauthorized` |
| Authenticated `USER` attempts an admin-only operation | `403 Forbidden` |
| Invalid request data | `400 Bad Request`, if handled by the applicable validation handler |
| Resource does not exist | `404 Not Found`, if handled by the applicable resource handler |

Exact error response bodies depend on the application's configured exception handlers.

## Database Schema

The application uses PostgreSQL and JPA entities for users and products.

The repository includes `schema.sql` as a database schema reference or export. Check that file before using it to initialize a fresh database; the application's Hibernate configuration may also create or update tables.

## Running Tests

Run the complete verification lifecycle:

```powershell
.\mvnw.cmd clean verify
```

Run selected service and application tests:

```powershell
.\mvnw.cmd clean test "-Dtest=AuthServiceTest,ProductServiceTest,ProductManagementApplicationTests"
```

The selected test command runs the specified test classes only. Run `clean verify` before submission to verify the complete project, including all tests and Maven verification steps.

## Project Structure

```text
product-management/
├── README.md
└── product-management/
    ├── pom.xml
    ├── schema.sql
    └── src/
        ├── main/
        │   ├── java/com/ikaansh/product_management/
        │   │   ├── controller/
        │   │   ├── dto/
        │   │   ├── entity/
        │   │   ├── repository/
        │   │   ├── security/
        │   │   └── service/
        │   └── resources/
        │       └── application.yaml
        └── test/
            └── java/com/ikaansh/product_management/
```

The structure above is representative; retain any additional packages and files present in the repository.

## Security Notes

- Never commit real database passwords, JWT signing secrets, or other credentials.
- Keep local environment files out of version control.
- Use a strong, randomly generated JWT signing secret.
- Use HTTPS and managed secrets in deployed environments.
- For production, use database migrations rather than relying on automatic schema updates.

## Future Improvements

Potential enhancements include:

- Pagination and sorting for product listings
- More comprehensive controller and security integration tests
- Product image uploads using local storage or Amazon S3
- API documentation using OpenAPI/Swagger
- Database migration management with Flyway or Liquibase

## Author

**Sanket More**

GitHub: [moreboi10](https://github.com/moreboi10)

## License

This project was developed as an internship assignment. Add a license if one is required for public distribution.
