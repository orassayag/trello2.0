# Instructions

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

## Author

* **Or Assayag** - *Initial work* - [orassayag](https://github.com/orassayag)
* Or Assayag <orassayag@gmail.com>
* GitHub: https://github.com/orassayag
* StackOverflow: https://stackoverflow.com/users/4442606/or-assayag?tab=profile
* LinkedIn: https://linkedin.com/in/orassayag
