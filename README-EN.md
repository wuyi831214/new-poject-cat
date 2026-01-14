# PawPals Pet Adoption Application

A full-stack pet adoption application built with React, TypeScript, and Supabase.

## Features

- 🐕 Browse and search pets available for adoption
- 📝 Submit adoption applications with detailed forms
- ❤️ Save favorite pets
- 💬 AI-powered pet matching assistant
- 👤 User profile with application tracking
- 📱 Responsive mobile-first design

## Tech Stack

### Frontend
- React 19
- TypeScript 5.8
- Vite 6.2
- Tailwind CSS

### Backend & Database
- Supabase (PostgreSQL)
- RESTful API
- Real-time subscriptions

## Getting Started

### Prerequisites

- Node.js 18+
- Supabase account
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pawpals-pet-adoption
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key
```

4. Run database migrations:
   - Go to [Supabase Dashboard](https://app.supabase.com)
   - Navigate to SQL Editor
   - Run migration files in order from `migrations/` directory

5. Start development server:
```bash
npm run dev
```

6. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure

```
pawpals-pet-adoption/
├── components/          # Reusable components
├── hooks/              # Custom React hooks
├── services/           # API service layer
├── pages/              # Page components
├── lib/                # Utilities and configurations
├── migrations/         # Database migrations
└── types-extended.ts  # TypeScript type definitions
```

## API Services

### PetService
- Get all pets with filters
- Get pet by ID
- Search pets
- CRUD operations

### ApplicationService
- Get applications
- Create application
- Update application status
- Delete application

### FavoriteService
- Get user favorites
- Add/remove favorites
- Toggle favorite status

### MessageService
- Get user messages
- Send messages
- Clear messages

## Database Schema

### pets
- Pet information, breed, age, gender, etc.
- Status tracking (待领养, 审核中, 已通过)
- Price and location data

### applications
- Adoption application data
- User information
- Application status tracking

### favorites
- User favorite pets
- Unique constraint on user_id + pet_id

### messages
- AI chat messages
- User and assistant roles

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to Vercel

```bash
npm install -g vercel
vercel
```

## Development

### Type Checking
```bash
npm run type-check
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License

## Support

For issues and questions, please open an issue on GitHub.
