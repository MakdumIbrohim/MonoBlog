# MonoBlog

A full-stack blog application built with Laravel (backend) and Next.js (frontend). This monorepo provides a complete blogging platform with user authentication, post management, comments, and role-based access control.

## Features

- **User Authentication**: Registration, login, email verification, password reset
- **Post Management**: Create, read, update, delete blog posts
- **Comments System**: Add comments to posts
- **Role-Based Access**: Different user roles with permissions
- **Responsive Design**: Modern UI with theme toggle
- **API-Driven**: RESTful API backend with Next.js frontend

## Tech Stack

### Backend
- **Laravel**: PHP framework for robust backend development
- **MySQL**: Database for data persistence
- **Sanctum**: API authentication
- **Eloquent ORM**: Database interactions

### Frontend
- **Next.js**: React framework for the frontend
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **React Hooks**: State management

## Installation

### Prerequisites
- PHP 8.1 or higher
- Composer
- Node.js 18 or higher
- npm, yarn, or pnpm
- MySQL database

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install PHP dependencies:
   ```bash
   composer install
   ```

3. Copy the environment file and configure it:
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your database credentials and other settings.

4. Generate application key:
   ```bash
   php artisan key:generate
   ```

5. Run database migrations:
   ```bash
   php artisan migrate
   ```

6. (Optional) Seed the database:
   ```bash
   php artisan db:seed
   ```

7. Start the Laravel development server:
   ```bash
   php artisan serve
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install Node.js dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Copy the environment file and configure it:
   ```bash
   cp .env.local.example .env.local
   ```
   Update the `.env.local` file with your API base URL (usually `http://localhost:8000/api`).

4. Start the Next.js development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

## Usage

1. Ensure both backend and frontend servers are running.
2. Open your browser and navigate to `http://localhost:3000` for the frontend.
3. Register a new account or login with existing credentials.
4. Create and manage blog posts from the dashboard.
5. View posts on the blogs page and add comments.

## API Documentation

The backend provides a RESTful API. Key endpoints include:

- `POST /api/register` - User registration
- `POST /api/login` - User login
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create a new post
- `GET /api/posts/{id}/comments` - Get comments for a post
- `POST /api/posts/{id}/comments` - Add a comment to a post

For detailed API documentation, refer to the Laravel API routes in `backend/routes/api.php`.

## Project Structure

```
MonoBlog/
├── backend/          # Laravel application
│   ├── app/          # Application code
│   ├── database/     # Migrations and seeders
│   ├── routes/       # API and web routes
│   └── ...
├── frontend/         # Next.js application
│   ├── app/          # Next.js app directory
│   ├── components/   # React components
│   ├── hooks/        # Custom React hooks
│   ├── services/     # API service functions
│   └── ...
└── README.md         # This file
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.