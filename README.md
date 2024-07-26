# PollStream

PollStream is a dynamic web application designed for creating and managing polls. It features user authentication, poll creation, voting functionality, and real-time updates of vote counts. The application ensures a seamless and interactive user experience through modern technologies like JWT and Socket.IO.

## Features

1. **User Authentication with JWT**
   - Secure user authentication using JSON Web Tokens (JWT) for login and registration.

2. **Poll Creation**
   - Authenticated users can create polls with multiple voting options.

3. **Voting Functionality**
   - Users can cast their votes on polls. Each user is restricted to a single vote per poll.

4. **Real-Time Vote Updates**
   - Vote counts are updated in real-time for poll creators using Socket.IO, reflecting changes as users vote.

5. **User Login and Registration**
   - Comprehensive user management with login and registration capabilities.

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- MongoDB

### Setup

1. **Clone the Repository**

   ```sh
   git clone https://github.com/Agniv25/PollStream.git
   cd PollStream
Install Client Dependencies
cd client
npm install



Configure Server
cd ../server

Create a .env file in the server directory and add the following environment variables:
MONGOPASSWORD=your_mongodb_password
JWTSECRET=your_jwt_secret
npm install



start the client using npm run dev
start the server using nodemon index.js
