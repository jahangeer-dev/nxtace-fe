# Mini SaaS Template Store - Frontend

A modern React frontend application for browsing and managing design templates. Built as part of a fullstack intern assessment task.

## 🚀 Features

- **User Authentication**: Register and login with JWT-based authentication
- **Template Browsing**: View a collection of design templates with search and filtering
- **Favorites Management**: Save and manage favorite templates
- **Responsive Design**: Mobile-first responsive UI with TailwindCSS
- **Modern Tech Stack**: React 19, TypeScript, Vite, TailwindCSS v4

## 🛠 Tech Stack

- **Frontend Framework**: React 19.1.1 with TypeScript
- **Build Tool**: Vite 7.1.7 with SWC plugin
- **Styling**: TailwindCSS v4.1.17
- **Routing**: React Router DOM v7.9.5
- **State Management**: Zustand v5.0.8
- **Data Fetching**: TanStack React Query v5.90.7
- **HTTP Client**: Axios v1.13.2
- **Forms**: React Hook Form v7.66.0

## 🏗 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Header.tsx
│   ├── TemplateCard.tsx
│   ├── Loader.tsx
│   └── ProtectedRoute.tsx
├── pages/              # Page components
│   ├── HomePage.tsx
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── TemplatesPage.tsx
│   └── FavoritesPage.tsx
├── store/              # Zustand stores
│   └── index.ts
├── services/           # API services
│   └── api.ts
├── hooks/              # Custom React hooks
│   └── useApi.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── utils/              # Utility functions
│   └── index.ts
└── App.tsx            # Main app component
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nxtace-fe
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```
   Update the `.env.local` file with your backend API URL:
   ```
   VITE_API_BASE_URL=http://localhost:3000/api
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Pages & Features

### 🏠 Home Page (`/`)
- Landing page with app introduction
- Quick access to templates and registration

### 🔐 Authentication
- **Login** (`/login`): User login with email/password
- **Register** (`/register`): New user registration

### 📋 Templates (`/templates`)
- Browse all available templates
- Search templates by name/description
- Filter by category
- Add/remove templates from favorites

### ⭐ My Favorites (`/favorites`) 
- View saved favorite templates (Protected route)
- Remove templates from favorites
- Empty state with call-to-action

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:3000/api` |

### Backend API Requirements

The frontend expects the following API endpoints:

**Authentication**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

**Templates**
- `GET /api/templates` - Get all templates
- `GET /api/templates/:id` - Get template by ID

**Favorites**
- `GET /api/favorites` - Get user's favorites (authenticated)
- `POST /api/favorites/:templateId` - Add to favorites (authenticated)
- `DELETE /api/favorites/:templateId` - Remove from favorites (authenticated)

## 🎨 UI Components

### Button Component
```tsx
<Button variant="primary" size="md" loading={false}>
  Click me
</Button>
```

### Input Component
```tsx
<Input 
  label="Email" 
  type="email" 
  error="Invalid email"
  placeholder="Enter email..."
/>
```

### Template Card
- Displays template thumbnail, name, description, and category
- Favorite/unfavorite functionality
- Preview button (ready for future implementation)

## 🔒 Authentication Flow

1. **Registration**: User creates account with email/password
2. **Login**: JWT token stored in localStorage via Zustand persistence
3. **Protected Routes**: Favorites page requires authentication
4. **Auto-redirect**: Unauthenticated users redirected to login
5. **Token Management**: Automatic token inclusion in API requests

## 📊 State Management

### Auth Store
- User information and authentication state
- JWT token persistence
- Login/logout actions

### Template Store
- Templates collection
- Favorites management
- Optimistic updates for better UX

## 🚦 Routing

- **Public routes**: Home, Login, Register, Templates
- **Protected routes**: Favorites (requires authentication)
- **Auto-redirect**: Unknown routes redirect to home

## 🎯 Assessment Criteria Covered

✅ **Code Structure** (25%): Clean, modular components and services
✅ **Functionality** (25%): All required features implemented  
✅ **UI & UX** (20%): Responsive design with TailwindCSS
✅ **API Integration** (20%): Axios + React Query for data fetching
✅ **Bonus Features** (10%): Search, filters, protected routes

## 🚀 Deployment Ready

The application is production-ready and can be deployed to:
- **Vercel**: `vercel --prod`
- **Netlify**: Build command: `npm run build`, Publish directory: `dist`
- **Any static hosting**: Deploy the `dist` folder after `npm run build`

## 👨‍💻 Author

**[Your Name]**
- Email: [your-email@example.com]
- GitHub: [your-github-username]

---

## 🔗 Related

This frontend is designed to work with a Node.js + Express backend. See the backend repository for API implementation details.
# nxtace-fe
