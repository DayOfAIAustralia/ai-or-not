# AI or Not?

An educational game that teaches students to distinguish between AI-powered technology and non-AI technology. Designed for Day of AI
Australia targeting Primary (Years 3-6) and Secondary (Years 7-10) students.

## Tech Stack

- [React 18](https://react.dev/) - UI framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vite](https://vitejs.dev/) - Build tool and dev server
- [HeroUI](https://heroui.com/) - Component library
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations

## Project Structure

```
src/
├── components/
│   ├── game/                 # Game UI components
│   │   ├── AnswerButtons.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── QuestionCard.tsx
│   │   ├── ResultFeedback.tsx
│   │   └── TimerBar.tsx
│   ├── screens/              # Full-page screens
│   │   ├── GameOverScreen.tsx
│   │   ├── GameScreen.tsx
│   │   ├── LandingScreen.tsx
│   │   └── LevelIntroScreen.tsx
│   ├── GameButton.tsx
│   └── Navbar.tsx
├── hooks/
│   └── useGameTimer.ts       # Timer logic
├── types/
│   └── game.ts               # TypeScript interfaces
├── utils/
│   └── shuffle.ts            # Array shuffle utility
├── pages/
│   └── index.tsx             # Main game logic
└── items.json                # Question data
```

## Getting Started

### Prerequisites

- Node.js 18+
- bun

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd ai-or-not

# Install dependencies
bun install
```

### Development

```bash
bun dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
bun run build
```

Output is generated in the `dist/` directory.

### Preview Production Build

```bash
bun run preview
```

## Game Configuration

### Modifying Questions

Questions are stored in `src/items.json` with the following structure:

```json
{
  "primary": {
    "level1": [...],
    "level2": [...]
  },
  "secondary": {
    "level1": [...],
    "level2": [...]
  }
}
```

Each question object:

```json
{
  "name": "TikTok videos that change based on what you watch",
  "isAI": true,
  "explanation": "TikTok uses AI to learn what videos you like..."
}
```

| Field         | Type    | Description                                   |
| ------------- | ------- | --------------------------------------------- |
| `name`        | string  | The question text displayed to students       |
| `isAI`        | boolean | `true` if AI-powered, `false` if not          |
| `explanation` | string  | Educational explanation shown after answering |

### Timer Settings

Timer durations are configured in `src/pages/index.tsx`:

```typescript
const timerDuration = yearLevel === "primary" ? 15 : 10;
```

## Deployment

Currently deployed with Vercel, domain on GoDaddy - https://ai-or-not.dayofaiaustralia.com/ 

## Scripts

| Command           | Description                         |
| ----------------- | ----------------------------------- |
| `bun run dev`     | Start development server            |
| `bun run build`   | TypeScript check + production build |
| `bun run preview` | Preview production build locally    |
| `bun run lint`    | Run ESLint with auto-fix            |

## License

MIT
