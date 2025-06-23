# SupaKoto - Premium Automotive Services

SupaKoto is a luxury automotive services website built with Astro, React, and Tailwind CSS. The site features a modern, responsive design with support for both English and Arabic (RTL) languages.

## ✨ Features

- Bilingual support (English and Arabic)
- RTL layout support
- Responsive design for all devices
- Interactive hero carousel using SwiperJS
- Modern UI with Tailwind CSS
- React components for interactive elements

## 🚀 Project Structure

The project follows a standard Astro structure with additional components:

```text
/
├── public/
│   ├── assets/
│   └── images/
├── src/
│   ├── components/
│   │   ├── navbar/
│   │   ├── ui/
│   │   ├── Header.astro
│   │   ├── HeaderReact.tsx
│   │   ├── HeroCarousel.astro
│   │   └── HeroCarousel.tsx
│   ├── i18n/
│   │   └── utils.ts
│   ├── layouts/
│   │   └── Layout.astro
│   ├── lib/
│   │   └── utils.ts
│   ├── pages/
│   │   ├── [...locale]/
│   │   └── index.astro
│   └── styles/
│       └── global.css
└── package.json
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 🚀 Deployment to Vercel

This project is configured for easy deployment to Vercel:

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import the project in the Vercel dashboard
3. Vercel will automatically detect Astro and use the correct build settings
4. Your site will be deployed and available at a Vercel URL

### Manual Deployment

You can also deploy manually using the Vercel CLI:

```bash
npm run build
vercel --prod
```

Or deploy directly from the Vercel dashboard by uploading the project files.
