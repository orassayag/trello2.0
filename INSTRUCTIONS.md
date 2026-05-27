# Setup and Usage Instructions

## Table of Contents

1. [Version](#version)
2. [Last Updated](#last-updated)
3. [Prerequisites](#prerequisites)
4. [Initial Setup](#initial-setup)
5. [Available Commands](#available-commands)
6. [Development Commands](#development-commands)
7. [Running Scripts](#running-scripts)
8. [Setup Instructions](#setup-instructions)
9. [Configuration](#configuration)
10. [Running the Application](#running-the-application)
11. [Features Usage](#features-usage)
12. [Best Practices](#best-practices)
13. [Extending the Application](#extending-the-application)
14. [Documentation](#documentation)
15. [External Resources](#external-resources)
16. [Architecture Overview](#architecture-overview)
17. [Troubleshooting](#troubleshooting)
18. [Deployment](#deployment)

## Version

Current Version: **0.1.0**

## Last Updated

Last updated on: **May 27, 2026**

## Prerequisites

### System Requirements

- **Node.js**: Version 18.0.0 or higher
- **Package Manager**: npm (v8+), pnpm (v7+), or yarn (v1.22+)
- **Operating System**: Windows, macOS, or Linux
- **Memory**: 2GB RAM minimum (4GB recommended)
- **Disk Space**: 500MB for application and dependencies

### External Account Requirements

- **Appwrite Cloud Account**: For database and storage services
- **OpenAI API Key**: For AI-powered task summaries

## Initial Setup

### 1. Install Dependencies

Clone the repository and install the necessary packages:

```bash
git clone https://github.com/orassayag/trello2.0.git
cd trello2.0
npm install
```

### 2. Setup Environment Variables

Copy the example environment file and fill in your credentials:

```bash
cp .env.example .env.local
```

## Available Commands

### Running Scripts

You can execute the following scripts using your package manager (e.g., `npm run <script>`):

- `dev`: Starts the development server with hot-reload
- `build`: Compiles the application for production
- `start`: Runs the production-built application
- `lint`: Runs ESLint to check for code quality issues

## Development Commands

**Linting:**

```bash
npm run lint
```

**Building for Production:**

```bash
npm run build
```

**Starting Development Server:**

```bash
npm run dev
```

## Setup Instructions

1. Open the project in your IDE (VSCode recommended)
2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```
3. Build the project:
   ```bash
   npm run build
   ```

## Configuration

### Appwrite Setup

1. Create an account at [Appwrite Cloud](https://cloud.appwrite.io/)
2. Create a new project
3. Create a database with the following structure:
   - **Database**: Create a new database
   - **Collection**: Create a "todos" collection with these attributes:
     - `title` (String, required)
     - `status` (String, required, enum: "todo", "inprogress", "done")
     - `image` (String, optional)
   - **Storage**: Create a bucket for task images
4. Copy your project credentials

### Environment Variables

1. Create a `.env.local` file in the root directory:

   ```bash
   cp .env.example .env.local
   ```

2. Add your credentials:
   ```env
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_DATABASE_ID=your_database_id
   NEXT_PUBLIC_TODOS_COLLECTION_ID=your_collection_id
   NEXT_PUBLIC_IMAGE_BUCKET_ID=your_bucket_id
   OPENAI_API_KEY=your_openai_api_key
   ```

### OpenAI Setup

1. Create an account at [OpenAI Platform](https://platform.openai.com/)
2. Generate an API key from your account settings
3. Add the API key to your `.env.local` file

## Running the Application

### Development Mode

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Mode

Build and start the production server:

```bash
npm run build
npm run start
```

### Linting

Check for code quality issues:

```bash
npm run lint
```

## Features Usage

### Creating Tasks

1. Click the "+" button in any column (Todo, In Progress, Done)
2. Enter task title
3. Optionally upload an image
4. Click "Add Task" or press Enter

### Moving Tasks

- **Drag and Drop**: Click and drag tasks between columns
- Tasks automatically update in the database when moved
- Status changes persist across sessions

### Deleting Tasks

1. Click the trash icon on any task card
2. Task and associated image are permanently deleted

### Searching Tasks

1. Use the search bar in the header
2. Type to filter tasks across all columns
3. Search works on task titles in real-time

### AI Task Summary

- AI automatically summarizes your tasks every 10 seconds
- Shows total tasks in each category
- Provides a daily productivity overview
- Uses OpenAI GPT-3.5 for natural language generation

## Architecture Overview

### Frontend Structure

```
src/
├── app/
│   ├── api/
│   │   └── generateSummary/   # OpenAI integration endpoint
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Main page
├── components/
│   ├── Board/                  # Main Kanban board
│   ├── Column/                 # Column component
│   ├── Header/                 # App header with search
│   ├── Modal/                  # Task creation modal
│   ├── TaskTypeRadioGroup/     # Task type selector
│   └── TodoCard/               # Individual task card
├── lib/
│   ├── fetchSuggestion.ts      # AI summary fetcher
│   ├── formatTodosForAI.ts     # Format tasks for AI
│   ├── getTodosGroupedByColumn.ts  # Data aggregation
│   ├── getUrl.ts               # Image URL helper
│   └── uploadImage.ts          # Image upload handler
└── store/
    ├── BoardStore.ts           # Main state management
    └── ModalStore.ts           # Modal state
```

### Technology Stack

- **Framework**: Next.js 13 (App Router)
- **Language**: TypeScript
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Backend**: Appwrite (BaaS)
- **AI**: OpenAI GPT-3.5
- **Drag & Drop**: react-beautiful-dnd
- **Icons**: Heroicons

### Data Flow

1. User interacts with UI
2. Zustand store updates local state
3. Store triggers Appwrite API calls
4. Database/Storage updates persist
5. UI re-renders with updated data

## Troubleshooting

### Common Issues

**Port 3000 already in use:**

```bash
lsof -ti:3000 | xargs kill -9
```

**Build errors:**

- Clear `.next` folder and rebuild
- Delete `node_modules` and reinstall dependencies

**Appwrite connection issues:**

- Verify environment variables are set correctly
- Check Appwrite console for API keys
- Ensure database and collection are created

**OpenAI API errors:**

- Verify API key is valid
- Check API usage limits
- Ensure sufficient credits in OpenAI account

**Image upload failures:**

- Verify storage bucket exists in Appwrite
- Check file size limits (default: 10MB)
- Ensure proper bucket permissions

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### Environment Variables for Production

Add all `.env.local` variables to your hosting platform's environment settings.

## Development Notes

- The application requires an internet connection for Appwrite and OpenAI API calls
- Image files are stored in Appwrite Storage
- Task data is stored in Appwrite Database
- AI summaries are generated every 10 seconds when tasks change
- Search is client-side and filters tasks in real-time

## Best Practices

- **Component Design**: Keep components small and focused on a single responsibility.
- **State Management**: Use Zustand for global state only when necessary; prefer local state for component-specific logic.
- **Type Safety**: Leverage TypeScript to catch errors early. Always define types for props and state.
- **Styling**: Use Tailwind CSS for rapid UI development and to ensure consistency.
- **Performance**: Use `React.memo` or `useMemo` for expensive computations or components that re-render frequently.

## Extending the Application

### Adding a New Column

1. Update the `TypedColumn` type in `typings.d.ts`.
2. Update the initial state in `BoardStore.ts` to include the new column.
3. Ensure the UI renders the new column in `Board.tsx`.

### Adding a New Feature

1. Define the state requirements in `BoardStore.ts`.
2. Create the necessary components in `src/components`.
3. Integrate the new components into the main `page.tsx`.

## Documentation

- **README.md**: Comprehensive overview of the project, architecture, and setup.
- **CONTRIBUTING.md**: Guidelines for contributing to the project.
- **CODE_OF_CONDUCT.md**: Standards for community behavior.
- **LICENSE**: Legal information regarding the use of this software.

## External Resources

- **[Next.js Documentation](https://nextjs.org/docs)**: Learn about Next.js features and API.
- **[Appwrite Documentation](https://appwrite.io/docs)**: Explore Appwrite services and SDKs.
- **[OpenAI API Reference](https://platform.openai.com/docs/api-reference)**: Detailed information about OpenAI endpoints.
- **[Tailwind CSS Documentation](https://tailwindcss.com/docs)**: Comprehensive guide to utility-first styling.
- **[Zustand GitHub](https://github.com/pmndrs/zustand)**: State management documentation and examples.

## Author

- **Or Assayag** - _Initial work_ - [orassayag](https://github.com/orassayag)
- Or Assayag <orassayag@gmail.com>
- GitHub: https://github.com/orassayag
- StackOverflow: https://stackoverflow.com/users/4442606/or-assayag?tab=profile
- LinkedIn: https://linkedin.com/in/orassayag
