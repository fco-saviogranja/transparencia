# PNTP 2025 Dashboard

This project is a dashboard application designed for public transparency alerts regarding PNTP 2025. It includes user registration for managers, notification mechanisms for deadlines, and an admin access level for internal control analysts. The application is built with React and integrates with a backend database.

## Features

- User registration and authentication for managers
- Notification system for deadlines and updates
- Admin panel for internal control analysts to manage users and system status
- Responsive design aligned with the identity of the Prefeitura de Jardim

## Project Structure

```
pntp2025-dashboard
├── public
│   ├── index.html         # Main HTML document
│   └── favicon.ico        # Favicon for the application
├── src
│   ├── components         # React components for the application
│   ├── pages              # Page components for routing
│   ├── services           # API and authentication services
│   ├── styles             # CSS styles for the application
│   ├── App.js             # Main application component
│   └── index.js           # Entry point for the React application
├── package.json           # npm configuration file
├── .env                   # Environment variables
└── README.md              # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd pntp2025-dashboard
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables.

4. Start the development server:
   ```
   npm start
   ```

## Usage

- Access the application at `http://localhost:3000`.
- Managers can register and log in to receive notifications.
- Admins can access the admin panel to manage users and view system status.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.