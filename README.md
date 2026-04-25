# WhatsApp Chatbot Backend (Spring Boot)

## Overview

This project is a backend simulation of a WhatsApp chatbot built using Spring Boot. It demonstrates how a webhook-based messaging system processes incoming messages and returns predefined responses.

The application exposes a REST API endpoint that accepts JSON input, applies simple business logic, and responds accordingly. It is designed to showcase core backend development concepts such as RESTful API design, request handling, and service-layer architecture.

---

## Technology Stack

* Java 17
* Spring Boot
* Maven
* Lombok

---

## Project Structure

```
src/main/java/com/Internship_project/whatsapp_chatbot/

├── controller/        Handles HTTP requests  
├── service/           Contains business logic  
├── models/            Defines request and response DTOs  
└── WhatsappChatbotApplication.java
```

---

## API Endpoint

### POST /webhook

#### Request Body

```json
{
  "message": "Hi"
}
```

#### Response Body

```json
{
  "reply": "Hello"
}
```

---

## Supported Inputs

| Input           | Response                   |
| --------------- | -------------------------- |
| Hi              | Hello                      |
| Bye             | Goodbye                    |
| Any other input | Sorry, I don't understand. |

---

## Application Flow

1. A client sends a POST request to the `/webhook` endpoint.
2. The controller receives and maps the JSON request to a data transfer object.
3. The message is passed to the service layer for processing.
4. The service determines the appropriate response using predefined mappings.
5. The response is returned to the client in JSON format.
6. All incoming messages are logged to the console.


## Author

sanket more
