# CampusEdge — Your Academic Launchpad

**Student productivity & placement hub for B.Tech students.**
Manage academics, track skills, and prepare for campus placements — all in one place.

🔗 **Live App**: [academic-edge.lovable.app](https://academic-edge.lovable.app/)
📦 **Repo**: [campusedge-your-academic-launchpad](https://github.com/Satyanarayana001/campusedge-your-academic-launchpad)

---

## ✨ Features

- **Dashboard** — quick overview of tasks, progress, and stats
- **Daily Planner** — add, prioritize, and track daily tasks
- **CGPA Calculator** — compute semester/overall CGPA
- **Skill Tracker** — track skills and personal projects
- **Placement Prep** — prep material and practice tracking
- **Campus Drives** — track upcoming/ongoing recruitment drives
- **Placement Resources** — curated, searchable prep resources (guides, platforms)
- **Community** — student community/discussion space
- **Profile & Auth** — user accounts via Supabase auth, editable profile

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + Vite
- **UI**: shadcn-ui, Radix UI, Tailwind CSS, Framer Motion
- **State/Data**: TanStack Query, React Hook Form, Zod
- **Backend**: Supabase (auth + database)
- **Testing**: Vitest, Testing Library
- **Tooling**: ESLint, bun/npm

## 🚀 Getting Started

Requires Node.js & npm ([install via nvm](https://github.com/nvm-sh/nvm#installing-and-updating)).

```sh
# Clone the repository
git clone https://github.com/Satyanarayana001/campusedge-your-academic-launchpad.git

# Navigate to the project directory
cd campusedge-your-academic-launchpad

# Install dependencies
npm i

# Start the dev server
npm run dev
```

### Other scripts

```sh
npm run build       # production build
npm run build:dev   # development-mode build
npm run preview     # preview production build
npm run lint         # run ESLint
npm run test        # run tests once
npm run test:watch  # run tests in watch mode
```

## 🔑 Environment Setup

This project uses Supabase for auth and data. Add your Supabase project credentials in a `.env` file:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📁 Project Structure

```
src/
├── components/       # UI components (incl. shadcn-ui primitives)
├── contexts/         # AuthContext
├── hooks/            # custom hooks
├── integrations/     # Supabase & Lovable integrations
├── lib/              # mock data, placement resources, utils
├── pages/            # Dashboard, DailyPlanner, CGPACalculator, SkillTracker,
│                      # PlacementPrep, CampusDrives, Community, PlacementResources,
│                      # ProfileEdit, AuthPage
└── App.tsx           # routes & providers
```

## 📄 License

No license specified.
