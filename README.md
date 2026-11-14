# CHMSU Digital Repository

An institutional digital repository web application for **Carlos Hilado Memorial State University (CHMSU)** – Talisay Campus. Designed to preserve, organize, access, and share university policies, research guidelines, reports, student handbooks, and administrative documents.

![CHMSU Logo](public/chmsu_logo.png)

---

## Features

- **Dashboard & Analytics**: Real-time stats for total documents, categories, active users, and storage utilization with an interactive donut chart.
- **Document Management**: Search, filter by category and academic year, preview metadata, and download or manage entries.
- **Multi-Step Upload Wizard**: Guided file upload workflow with metadata tagging (title, category, author, year, description) and celebration effects.
- **Category Management**: Create, view, and organize institutional document classifications.
- **Disaster Recovery Simulation**: JSON backup export, restoration, and simulated data loss incident recovery.
- **Search System**: Global multi-attribute search across all document titles, authors, and descriptions.
- **Institutional Branding**: Authentic CHMSU aesthetics, color palette, and university credentials demo login.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18+ recommended)
- `npm` or `yarn`

### Installation

```bash
# Clone the repository
git clone https://github.com/KYmer-dotcom/chmsu-digital-repository.git
cd chmsu-digital-repository

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be accessible at `http://localhost:3000`.

### Building for Production

```bash
npm run build
```

The production-ready assets will be generated in the `dist/` directory.

---

## Tech Stack

- **Frontend**: [React 18](https://react.dev/)
- **Bundler**: [Vite](https://vitejs.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Visuals**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Deployment**: GitHub Pages via GitHub Actions

