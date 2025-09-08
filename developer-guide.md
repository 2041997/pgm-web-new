# Developer Guide

This guide outlines the coding conventions, best practices, and development workflow for the PGM Web New project.

## 📁 Folder Structure and Purpose

### Core Directories

- **`app/`** - Next.js App Router pages and layouts
- **`components/`** - Reusable UI components
- **`lib/`** - Utility libraries and helper functions
- **`types/`** - TypeScript type definitions
- **`utils/`** - General utility functions

### Feature Directories

- **`hooks/`** - Custom React hooks
- **`context/`** - React Context providers for state management
- **`services/`** - API calls and external service integrations
- **`store/`** - Global state management (Redux, Zustand, etc.)

### Configuration

- **`config/`** - Application-level configuration files
- **`data/`** - Static data, mock data, and constants
- **`styles/`** - Global CSS and styling utilities

### Legacy

- **`pages/`** - Next.js Pages Router (maintain for backward compatibility)
- **`public/`** - Static assets (images, icons, fonts)

## 🎯 Coding Conventions

### TypeScript

1. **Use strict TypeScript**
   ```typescript
   // ✅ Good
   interface User {
     id: string
     name: string
     email: string
   }
   
   // ❌ Avoid
   const user: any = { ... }
   ```

2. **Export types and interfaces**
   ```typescript
   // types/user.ts
   export interface User {
     id: string
     name: string
   }
   
   export type UserRole = 'admin' | 'user' | 'guest'
   ```

3. **Use type imports when possible**
   ```typescript
   import type { User } from '@/types'
   import { getUserData } from '@/services/user'
   ```

### React Components

1. **Use functional components with TypeScript**
   ```typescript
   interface ButtonProps {
     children: React.ReactNode
     variant?: 'primary' | 'secondary'
     onClick?: () => void
   }
   
   export default function Button({ children, variant = 'primary', onClick }: ButtonProps) {
     return (
       <button onClick={onClick} className={`btn btn-${variant}`}>
         {children}
       </button>
     )
   }
   ```

2. **Component file naming**
   - Use PascalCase: `Button.tsx`, `UserProfile.tsx`
   - Keep components in dedicated files
   - Export as default when it's the main component

3. **Props destructuring**
   ```typescript
   // ✅ Good
   function UserCard({ name, email, avatar }: UserCardProps) {
     return <div>...</div>
   }
   
   // ❌ Avoid
   function UserCard(props: UserCardProps) {
     return <div>{props.name}</div>
   }
   ```

### Styling with TailwindCSS

1. **Use utility classes**
   ```tsx
   <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
     <h2 className="text-xl font-semibold text-gray-800">Title</h2>
   </div>
   ```

2. **Create reusable component variants**
   ```typescript
   const buttonVariants = {
     primary: 'bg-blue-600 text-white hover:bg-blue-700',
     secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
   }
   ```

3. **Use responsive design**
   ```tsx
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
   ```

### File Organization

1. **Barrel exports for clean imports**
   ```typescript
   // components/index.ts
   export { default as Button } from './Button'
   export { default as Card } from './Card'
   export { default as Modal } from './Modal'
   
   // Usage
   import { Button, Card } from '@/components'
   ```

2. **Group related files**
   ```
   components/
   ├── ui/
   │   ├── Button.tsx
   │   ├── Input.tsx
   │   └── index.ts
   ├── forms/
   │   ├── LoginForm.tsx
   │   └── index.ts
   └── index.ts
   ```

### API and Services

1. **Consistent API service structure**
   ```typescript
   // services/userService.ts
   import type { User, ApiResponse } from '@/types'
   
   export const userService = {
     getUser: async (id: string): Promise<User> => {
       const response = await fetch(`/api/users/${id}`)
       return response.json()
     },
     
     updateUser: async (id: string, data: Partial<User>): Promise<User> => {
       const response = await fetch(`/api/users/${id}`, {
         method: 'PATCH',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(data),
       })
       return response.json()
     },
   }
   ```

2. **Error handling**
   ```typescript
   try {
     const user = await userService.getUser(id)
     return user
   } catch (error) {
     console.error('Failed to fetch user:', error)
     throw new Error('Unable to load user data')
   }
   ```

### Custom Hooks

1. **Naming convention: use prefix**
   ```typescript
   // hooks/useUser.ts
   export function useUser(id: string) {
     const [user, setUser] = useState<User | null>(null)
     const [loading, setLoading] = useState(true)
     
     useEffect(() => {
       fetchUser(id).then(setUser).finally(() => setLoading(false))
     }, [id])
     
     return { user, loading }
   }
   ```

## 📝 Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect code meaning (formatting, etc.)
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to build process or auxiliary tools

### Examples

```bash
feat(auth): add user authentication with NextAuth
fix(ui): resolve button hover state issue
docs(readme): update installation instructions
refactor(utils): simplify date formatting function
```

## 🧪 Testing Guidelines

1. **Test file naming**
   ```
   components/
   ├── Button.tsx
   ├── Button.test.tsx
   └── __tests__/
       └── Button.test.tsx
   ```

2. **Test structure**
   ```typescript
   import { render, screen, fireEvent } from '@testing-library/react'
   import Button from './Button'
   
   describe('Button', () => {
     it('renders children correctly', () => {
       render(<Button>Click me</Button>)
       expect(screen.getByText('Click me')).toBeInTheDocument()
     })
     
     it('calls onClick when clicked', () => {
       const handleClick = jest.fn()
       render(<Button onClick={handleClick}>Click me</Button>)
       fireEvent.click(screen.getByText('Click me'))
       expect(handleClick).toHaveBeenCalledTimes(1)
     })
   })
   ```

## 🔍 Code Review Checklist

### Before Submitting

- [ ] Code follows TypeScript strict mode
- [ ] Components have proper TypeScript interfaces
- [ ] No console.log statements in production code
- [ ] Responsive design implemented
- [ ] Error handling implemented
- [ ] Performance considerations addressed

### Reviewer Checklist

- [ ] Code is readable and maintainable
- [ ] Proper error handling
- [ ] Type safety maintained
- [ ] No performance regressions
- [ ] Documentation updated if needed
- [ ] Tests pass

## 🚀 Performance Best Practices

1. **Image optimization**
   ```tsx
   import Image from 'next/image'
   
   <Image
     src="/hero-image.jpg"
     alt="Hero"
     width={800}
     height={600}
     priority
   />
   ```

2. **Code splitting**
   ```typescript
   import dynamic from 'next/dynamic'
   
   const DynamicComponent = dynamic(() => import('./HeavyComponent'), {
     loading: () => <p>Loading...</p>,
   })
   ```

3. **Memoization**
   ```typescript
   const MemoizedComponent = React.memo(({ data }: Props) => {
     return <div>{data.map(item => <Item key={item.id} {...item} />)}</div>
   })
   ```

## 🛠️ Development Workflow

1. **Start development**
   ```bash
   npm run dev
   ```

2. **Before committing**
   ```bash
   npm run type-check
   npm run lint:fix
   ```

3. **Clean environment (if needed)**
   ```bash
   npm run dev:clean
   ```

4. **Restart development server**
   ```bash
   npm run restart:dev
   ```

## 📚 Additional Resources

- [Next.js Best Practices](https://nextjs.org/docs/basic-features/pages)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [TailwindCSS Best Practices](https://tailwindcss.com/docs/reusing-styles)
- [React Patterns](https://reactpatterns.com)
