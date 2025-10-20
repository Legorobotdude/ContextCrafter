# Context Crafter

Transform your ideas into powerful prompts with our intelligent questionnaire system. Choose your task type and let us guide you through creating the perfect context for any project.

## Features

- **8 Pre-built Templates**: Writing, Coding, Data Analysis, Brainstorming, Research, Learning, Creative Projects, and Business tasks
- **Smart Question Flow**: Dynamic questionnaires that adapt based on your selected task type
- **Progress Tracking**: Real-time completeness indicator with 70% threshold requirement
- **Dual Output Formats**: Choose between structured (bullet points) and conversational (paragraph) prompt styles
- **One-Click Copy**: Copy generated prompts to clipboard with visual confirmation
- **Client-Side Storage**: Your progress is automatically saved locally

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd context-crafter
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Homepage with task selection
│   ├── questionnaire/[taskType]/ # Dynamic questionnaire flow
│   └── result/                   # Generated prompt display
├── components/                   # React components
│   ├── TaskCard.tsx             # Task template selection cards
│   ├── QuestionFlow.tsx         # Dynamic questionnaire component
│   ├── CompletenessIndicator.tsx # Progress tracking component
│   └── PromptDisplay.tsx        # Generated prompt display with copy
├── lib/                         # Utility functions
│   ├── templates.ts             # Task templates and questions
│   ├── promptGenerator.ts       # Prompt generation logic
│   └── storage.ts               # localStorage utilities
└── types/                       # TypeScript type definitions
    └── index.ts                 # Core interfaces
```

## Available Task Types

1. **Writing & Content Creation** - Essays, articles, blog posts, creative writing
2. **Programming & Development** - Coding tasks, debugging, technical problem-solving
3. **Data Analysis & Research** - Statistical analysis, research, data interpretation
4. **Brainstorming & Ideation** - Creative brainstorming, idea generation
5. **Research & Information Gathering** - Literature reviews, market research
6. **Learning & Education** - Educational content, skill development
7. **Creative Projects** - Art, design, music, creative writing
8. **Business & Strategy** - Business planning, strategy, professional tasks

## How It Works

1. **Select Task Type**: Choose from 8 pre-built templates on the homepage
2. **Answer Questions**: Complete the dynamic questionnaire (5-10 questions per template)
3. **Track Progress**: Monitor your completion percentage with the visual indicator
4. **Generate Prompt**: Create your prompt once you reach 70% completion
5. **Copy & Use**: Copy the generated prompt and use it with any AI tool

## Technology Stack

- **Framework**: Next.js 15+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Storage**: Browser localStorage
- **Deployment**: Optimized for Vercel

## Development

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Key Features Implementation

- **Dynamic Routing**: Uses Next.js dynamic routes for questionnaire pages
- **State Management**: React hooks with localStorage persistence
- **Type Safety**: Full TypeScript implementation with strict mode
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: Proper ARIA labels and keyboard navigation

## Deployment

This project is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

The app will automatically build and deploy on every push to the main branch.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

If you encounter any issues or have questions, please open an issue on GitHub.