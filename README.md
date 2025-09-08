# PGM Web New

A modern Next.js application built with TypeScript and TailwindCSS, featuring a clean architecture and developer-friendly setup.

## 🚀 Features

- ⚡ **Next.js 14** with App Router
- 🔷 **TypeScript** with strict mode enabled
- 🎨 **TailwindCSS** for styling
- 📱 **Responsive Design** out of the box
- 🔧 **ESLint** for code quality
- 📦 **Organized Folder Structure**
- 🌍 **Environment Variables** support
- 🚀 **PM2** deployment configuration
- 📚 **Developer Documentation**

## 📁 Project Structure

```
├── app/                    # Next.js App Router
├── components/             # Reusable UI components
├── config/                 # Application configuration
├── context/                # React Context providers
├── data/                   # Static or mock data
├── hooks/                  # Custom React hooks
├── lib/                    # Utility libraries
├── pages/                  # Next.js Pages Router (if needed)
├── public/                 # Static assets
├── services/               # API calls and external services
├── store/                  # State management
├── styles/                 # Global and module CSS
├── types/                  # TypeScript type definitions
└── utils/                  # General utility functions
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm 8+

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pgm-web-new
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.development
   # Edit .env.development with your values
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run type-check` - Run TypeScript checks
- `npm run clean` - Clean build artifacts
- `npm run dev:clean` - Clean and restart development environment
- `npm run restart:dev` - Restart development server

## 🔧 Configuration

### Environment Variables

Create `.env.development` for development and `.env` for production:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3001/api
DATABASE_URL=your_database_url
NEXTAUTH_SECRET=your_secret_key
API_KEY=your_api_key
```

### TailwindCSS

Customize your design in `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      // Your custom colors
    },
  },
}
```

## 🚀 Deployment

### Using PM2

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy with PM2**
   ```bash
   ./deploy.sh
   ```

### Using Vercel

1. **Connect your repository to Vercel**
2. **Set environment variables in Vercel dashboard**
3. **Deploy automatically on push**

## 🧪 Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Follow the coding conventions in `developer-guide.md`
   - Add types for new features
   - Update documentation if needed

3. **Test your changes**
   ```bash
   npm run type-check
   npm run lint
   ```

4. **Commit and push**
   ```bash
   git commit -m "feat: add your feature description"
   git push origin feature/your-feature-name
   ```

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)

## 🤝 Contributing

Please read `developer-guide.md` for detailed contribution guidelines.

## 📄 License

This project is licensed under the MIT License.
