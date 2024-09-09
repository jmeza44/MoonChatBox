# MoonChatBox

## Overview

MoonChatBox is a real-time chat application designed to offer an engaging and interactive messaging experience. Built using ASP.NET Core, SQL Server, Angular, SignalR, and Tailwind CSS, ChatBox provides dynamic chat rooms, customizable user profiles, and instant message delivery.

## Features

- **Real-Time Messaging:** Instant message exchange with SignalR.
- **Chat Rooms:** Join and leave different chat rooms seamlessly.
- **User Profiles:** Customize nicknames and select avatars for personalization.
- **Responsive Design:** Modern UI using Tailwind CSS for a smooth experience on all devices.

## Technology Stack

- **ASP.NET Core:** Handles server-side logic and interactions.
- **SQL Server:** Manages data storage for user profiles and chat history.
- **Angular:** Provides a dynamic and responsive frontend.
- **SignalR:** Enables real-time messaging.
- **Tailwind CSS:** Styles the application with a modern, utility-first approach.

## Getting Started

### Prerequisites

- .NET SDK (version 8.X or later)
- Node.js (version 20.X or later)
- SQL Server
- Angular CLI (version 18.X or later)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jmeza44/MoonChatBox.git
   cd MoonChatBox
   ```

2. **Install backend dependencies:**
   ```bash
   cd MoonChatBox.WebApi
   dotnet restore
   ```

3. **Set up the database:**
   - Configure your SQL Server connection in `appsettings.json`.
   - Apply migrations: Auto-applied on Run.

4. **Install frontend dependencies:**
   ```bash
   cd ../MoonChatBox.WebApp
   npm install
   ```

5. **Run the application:**
   - **Backend:**
     ```bash
     cd ../MoonChatBox.WebApi
     dotnet run
     ```
   - **Frontend:**
     ```bash
     cd ../MoonChatBox.WebApp
     npm start
     ```

## Usage

- Navigate to `http://localhost:4200` to access the ChatBox web application.
- Sign in, select a chat room, set your nickname and avatar, and start chatting in real time.

## Contributing

Feel free to open issues or submit pull requests to contribute to the project.

## Contact

For any questions or support, please contact [jaimealbertomeza@hotmail.com](mailto:jaimealbertomeza@hotmail.com).
