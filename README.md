# 🚀 NASA Flight Scheduler Simulator

A dockerized web application that simulates NASA flight scheduling and integrates with SpaceX API to provide a comprehensive view of space mission schedules.

##  Overview

This project provides a platform for scheduling and managing rocket launches while also displaying real-time data about other companies' scheduled flights through the SpaceX API integration. Perfect for space enthusiasts and organizations interested in space mission planning.

##  Features

- **Launch Schedule Management**
  - Create and manage rocket launch schedules
  - View detailed launch information
  - Track mission status

- **SpaceX Integration**
  - Real-time data from SpaceX API
  - View upcoming SpaceX launches
  - Compare schedules with other space companies

- **Interactive Dashboard**
  - User-friendly interface for launch management
  - Visual calendar of scheduled launches
  - Detailed mission analytics

##  Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js with Express
- **Database**: MongoDB
- **Containerization**: Docker

### Getting Started

### Prerequisites

- Docker and Docker Compose
- Node.js (for local development)
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/ksXV/nasa-project.git
cd nasa-project
```

2. Start the containerized application:
```bash
docker-compose up --build
```

3. Access the application:
```
Frontend: http://localhost:3000
Backend API: http://localhost:8000
```

##  Project Structure

```
nasa-project/
├── client/            # React frontend
├── server/            # Node.js backend
├── docker-compose.yml # Docker composition
└── README.md
```

##  Development

To run the application in development mode:

1. Start the backend:
```bash
cd server
npm install
npm run dev
```

2. Start the frontend:
```bash
cd client
npm install
npm start
```

## Docker Support

The application is fully dockerized for easy deployment. Use the following commands:

- Build and start: `docker-compose up --build`
- Stop containers: `docker-compose down`
- View logs: `docker-compose logs`

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

