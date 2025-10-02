# Pumpfun Pepe ($PFP)

Ultra immersive landing page for Pumpfun Pepe - the normie starter on pump.fun

## Features

- 🎨 Full viewport immersive design with dark crypto aesthetic
- 💬 Floating normie comments with random SOL addresses and likes
- ✨ Green cursor trail effect
- 🖼️ Animated hero section with Pepe logo
- 🔗 Social links: X Community, DexTools, DexScreener
- 📋 Copy contract address functionality
- 📱 Fully responsive design

## Tech Stack

- **Next.js 14** - React framework
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Icons** - Icon library

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Contract Details

- **Ticker:** $PFP
- **Contract Address:** `5TfqNKZbn9AnNtzq8bbkyhKgcPGTfNDc9wNzFrTBpump`
- **Blockchain:** Solana

## Links

- [X Community](https://x.com/i/communities/1973784798725595204)
- [DexTools](https://www.dextools.io/app/en/token/pfpcult?t=1759442389030)
- [DexScreener](https://dexscreener.com/solana/gdfcd7l8x1giudfz1wthnheb352k3ni37rswtjgmglpt)

## Project Structure

```
src/
├── app/
│   ├── layout.tsx       # Root layout with metadata
│   ├── page.tsx         # Main landing page
│   └── globals.css      # Global styles
├── components/
│   ├── Hero.tsx         # Hero section with logo and CTA
│   ├── FloatingComment.tsx  # Animated comment component
│   └── CursorTrail.tsx  # Cursor trail effect
└── lib/
    └── config.ts        # Centralized configuration
```

## Configuration

All project settings are centralized in `src/lib/config.ts`:
- Contract address
- Social media links
- Project name and ticker

## License

MIT
