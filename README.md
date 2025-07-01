# Monuma

Monuma is a web application that offers an interactive database and map-based frontend for discovering the history of Thessaloniki through its monuments. What makes Monuma unique is its collaborative approach: users can add or edit monuments, create and follow lists, and explore the city's history via search and interactive maps.

## Features

- **Interactive Map**: Discover monuments across Thessaloniki using a map interface.
- **Search & Tags**: Find monuments by name, tags, or categories.
- **User Contributions**: Add new monuments or edit existing ones.
- **Lists**: Create custom lists of monuments and follow lists made by other users.
- **Community**: Engage with other users by following their lists and contributions.

## Tech Stack

- **Frontend**: React, Mantine UI, TailwindCSS, Mapbox GL
- **Backend**: Node.js, Express
- **Database**: PostgreSQL (schema in `server/database.sql`)
- **Deployment**: 
  - Frontend: Vercel
  - Backend: Render
  - Database: Neon

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd πτυχιακη
   ```

2. **Install dependencies**

   - For the frontend:
     ```bash
     cd client
     npm install
     ```

   - For the backend:
     ```bash
     cd ../server
     npm install
     ```

3. **Database Setup**

   - Ensure you have a PostgreSQL instance running (locally or on Neon).
   - Run the SQL schema in `server/database.sql` to set up the database.

4. **Environment Variables**

   - Create a `.env` file in the `server` directory with your configuration (database URL, API keys, etc.).

5. **Running the App Locally**

   - Start the backend:
     ```bash
     cd server
     npm start
     ```
   - Start the frontend:
     ```bash
     cd client
     npm start
     ```

## Deployment

- The app is deployed on:
  - **Frontend**: Vercel
  - **Backend**: Render
  - **Database**: Neon

## License

This project is currently unlicensed. If you wish to use or contribute to this project, please contact the author.

## Author

Developed as an undergraduate thesis at Aristotle University of Thessaloniki.
