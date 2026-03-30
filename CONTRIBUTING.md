# Contributing

Contributions to this project are [released](https://help.github.com/articles/github-terms-of-service/#6-contributions-under-repository-license) to the public under the [project's open source license](LICENSE).

Everyone is welcome to contribute to this project. Contributing doesn't just mean submitting pull requests—there are many different ways for you to get involved, including answering questions, reporting issues, improving documentation, or suggesting new features.

## How to Contribute

### Reporting Issues

If you find a bug or have a feature request:
1. Check if the issue already exists in the [GitHub Issues](https://github.com/orassayag/trello2.0/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Screenshots or videos (if applicable)
   - Your environment details (OS, Node version, browser)

### Submitting Pull Requests

1. Fork the repository
2. Create a new branch for your feature/fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes following the code style guidelines below
4. Test your changes thoroughly
5. Commit with clear, descriptive messages
6. Push to your fork and submit a pull request

### Code Style Guidelines

This project uses:
- **TypeScript** with strict type checking
- **Next.js 13** with App Router
- **ESLint** for code quality
- **Tailwind CSS** for styling

Before submitting:
```bash
# Install dependencies
npm install

# Check for linting errors
npm run lint

# Build to ensure no TypeScript errors
npm run build

# Test the application locally
npm run dev
```

### Coding Standards

1. **React Components**: Use functional components with hooks
2. **Type safety**: Avoid using `any` - define proper TypeScript types
3. **State management**: Use Zustand stores for global state
4. **Styling**: Use Tailwind CSS utility classes
5. **API routes**: Follow Next.js API route conventions
6. **Error handling**: Handle errors gracefully with user-friendly messages
7. **Environment variables**: Never commit `.env.local` - use `.env.example` for documentation

### Adding New Features

When adding new features:
1. Create appropriate TypeScript types in `typings.d.ts`
2. Add component logic in `src/components/`
3. Update Zustand stores if state management is needed
4. Add API routes in `src/app/api/` if backend logic is required
5. Test with Appwrite backend integration
6. Ensure responsive design works on mobile and desktop

### Environment Setup

Required environment variables:
```
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
NEXT_PUBLIC_DATABASE_ID=your_database_id
NEXT_PUBLIC_TODOS_COLLECTION_ID=your_collection_id
NEXT_PUBLIC_IMAGE_BUCKET_ID=your_bucket_id
OPENAI_API_KEY=your_openai_key
```

### Testing Guidelines

1. Test all CRUD operations (Create, Read, Update, Delete tasks)
2. Test drag-and-drop functionality across columns
3. Test image upload and deletion
4. Test search functionality
5. Test AI summary generation
6. Test responsive design on different screen sizes
7. Test error scenarios (network failures, invalid data)

## Questions or Need Help?

Please feel free to contact me with any question, comment, pull-request, issue, or any other thing you have in mind.

* Or Assayag <orassayag@gmail.com>
* GitHub: https://github.com/orassayag
* StackOverflow: https://stackoverflow.com/users/4442606/or-assayag?tab=profile
* LinkedIn: https://linkedin.com/in/orassayag

Thank you for contributing! 🙏
