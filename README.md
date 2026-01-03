## Craftora – Social Productivity Manager


Craftora is a MERN stack application that helps users manage tasks and reminders in a **social-media–centric way**.
Each user can create multiple social media apps (e.g., Instagram, LinkedIn, YouTube), and each app maintains its own **to-do list and reminders**, enabling focused and organized productivity.

---

## Project Status


This project is currently **in active development**.  
Core CRUD functionality for users, social media apps, reminders, and to-do lists is implemented.  
Future work includes advanced UI polish, analytics, and collaboration features.

---

## Project Screen Shot(s)
<img width="1899" height="917" alt="brave_screenshot_localhost (6)" src="https://github.com/user-attachments/assets/07bc251a-018c-40e6-b9ac-62cca8baa800" />

---

<img width="1900" height="917" alt="brave_screenshot_localhost (5)" src="https://github.com/user-attachments/assets/8f972f6c-a2e2-4c0b-aa05-bcd1b092e100" />

---

<img width="1894" height="911" alt="brave_screenshot_localhost (3)" src="https://github.com/user-attachments/assets/e6bf564e-1e2e-4504-9e89-dc0a686d205f" />

---

<img width="1893" height="913" alt="brave_screenshot_localhost (7)" src="https://github.com/user-attachments/assets/649066c0-0c2e-4142-bc00-9962855384d1" />

---

<img width="1893" height="558" alt="brave_screenshot_localhost (4)" src="https://github.com/user-attachments/assets/9b8ce3b1-2f50-424f-8299-74c0308eee03" />

## Installation and Setup Instructions


Clone down this repository. You will need `node` and `npm` installed globally on your machine.  

Installation:

### Backend Setup

`cd server`

## Installation
`npm install`

`touch .env`
- add mongodb url
for example : MONGO_URI=mongodb://localhost:27017/CRAFTORA

`npm start`
To Visit Backendserver:

`localhost:5000`

### Frontend Setup

## Installation
`npm install`

## Starting project
`npm run dev`


To Visit Frontend:

`localhost:5173`


## Reflection

### Context for this project

Craftora started as a personal side project to solve my own productivity problem—managing tasks across multiple social platforms without constantly switching between different apps and losing context.

### What I set out to build

My goal was to build a scalable, real-world **MERN stack application** with well-defined data relationships, where productivity is organized **per social media platform** instead of using a single flat to-do list.

### Why this project was challenging and a great learning experience

This project pushed me to think deeply about backend architecture. Designing MongoDB schemas with references, handling nested CRUD operations, and keeping frontend state in sync with backend APIs required careful planning and clean, maintainable code.

### Unexpected obstacles

Some of the key challenges included managing relational data in MongoDB, optimizing API responses, and structuring React components in a way that kept them reusable and easy to scale as the application grew.

### Tools and technologies used

- **React.js** – Component-driven frontend UI  
- **Node.js & Express.js** – RESTful backend APIs  
- **MongoDB & Mongoose** – Schema design and data relationships  
- **Postman** – API testing and debugging  
- **Git & GitHub** – Version control and collaboration  

I chose the MERN stack because it closely mirrors real-world full-stack development workflows and enables seamless data flow between the frontend and backend. The overall project structure was intentionally kept modular to make future feature additions easier and cleaner.
