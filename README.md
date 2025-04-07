# GenomeMed Portal: Project Details

## Project Overview

GenomeMed Portal is an AI-powered genome-to-treatment platform that connects genetic data with clinical applications. The system links genomic information (genes, variants, mutations) with symptoms, conditions, treatments, and provides AI-driven recommendations for healthcare providers, researchers, and patients.

## Core Components

1. **Frontend**: React.js application with TypeScript
2. **Backend**: Node.js/Express API server
3. **Database**: PostgreSQL via Supabase
4. **AI Service**: Integration with OpenAI or Claude API
5. **Cache**: Redis for performance optimization

## Environment Setup

### Required Environment Variables

**Backend (.env file)**
```
# Server Configuration
PORT=3001
NODE_ENV=development

# Database Configuration (Supabase)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-supabase-key
DATABASE_URL=postgresql://postgres:password@localhost:5432/genomemed

# Authentication
JWT_SECRET=your-secret-key
JWT_EXPIRY=24h

# AI Service
AI_PROVIDER=openai  # or 'claude'
OPENAI_API_KEY=your-openai-key
CLAUDE_API_KEY=your-claude-key

# Redis Cache
REDIS_URL=redis://localhost:6379
```

**Frontend (.env file)**
```
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Installation Commands

### Prerequisites
- Node.js (v16+)
- PostgreSQL (v13+)
- Redis
- Docker & Docker Compose (optional)

### Install and Run (Development)

```bash
# Clone repository
git clone https://github.com/yourusername/genomemed-portal.git
cd genomemed-portal

# Backend setup
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration

# Initialize database
npm run db:migrate
npm run db:seed

# Start backend server
npm run dev

# Frontend setup (in a new terminal)
cd ../frontend
npm install
cp .env.example .env
# Edit .env with your configuration

# Start frontend server
npm start
```

### Docker Setup (Alternative)

```bash
# Create .env files as above, then:
docker-compose up -d
```

## Database Setup

```bash
# Using PostgreSQL CLI
psql -U postgres
CREATE DATABASE genomemed;

# Or using Docker
docker exec -it postgres psql -U postgres -c "CREATE DATABASE genomemed;"

# Run migrations (from backend directory)
npm run db:migrate
```

## API Endpoints

The API will be available at `http://localhost:3001/api` with the following main endpoints:

- `/api/auth` - Authentication routes
- `/api/genes` - Genomic data endpoints
- `/api/conditions` - Medical conditions endpoints
- `/api/symptoms` - Symptoms management
- `/api/treatments` - Treatment options
- `/api/recommendations` - AI recommendation service

## Common Commands

```bash
# Start development servers
npm run dev          # Backend server
npm start            # Frontend server

# Run database migrations
npm run db:migrate   # Apply migrations
npm run db:rollback  # Revert last migration

# Run tests
npm test             # Run all tests
npm run test:unit    # Run unit tests only
npm run test:e2e     # Run end-to-end tests

# Build for production
npm run build        # Create production build

# Docker commands
docker-compose up -d             # Start all services
docker-compose down              # Stop all services
docker-compose logs -f backend   # View backend logs
```

## Troubleshooting

**Database Connection Issues**
```bash
# Check database status
docker ps | grep postgres
# or
pg_isready -h localhost -p 5432

# Verify credentials in .env file
# Ensure PostgreSQL service is running
```

**API Connection Issues**
```bash
# Check API status
curl http://localhost:3001/api/health

# Check server logs
npm run logs
```

**Frontend Build Issues**
```bash
# Clear cache and reinstall
rm -rf node_modules
npm cache clean --force
npm install
```
