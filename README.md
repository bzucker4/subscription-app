# Within

**Within** uncovers specific, sellable digital-product opportunities already present in a creator's content. This Milestone 1 MVP accepts long-form source material and returns three structured opportunities grounded in the creator's themes, audience problems, and unique point of view.

## Tech stack

- Next.js App Router and TypeScript
- Tailwind CSS
- OpenAI Chat Completions API with Structured Outputs
- Zod server-side validation
- Vercel-compatible server-side API route using the default Node.js runtime

No database, authentication, payments, or third-party product infrastructure is included.

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a local environment file:

   ```bash
   cp .env.example .env.local
   ```

3. Add your OpenAI API key to `.env.local`:

   ```env
   OPENAI_API_KEY=your_key_here
   ```

   The key is read only by the server-side `/api/analyze` route and is never sent to the browser.

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000).

## Production checks

```bash
npm run build
```

## Deploy to Vercel

1. Push the repository to a Git provider and import it into Vercel.
2. Add `OPENAI_API_KEY` under **Project Settings → Environment Variables** for the desired environments.
3. Deploy. Vercel automatically detects Next.js and uses the build command from `package.json`.

Never commit `.env.local` or an API key. `.env*.local` is ignored by Git.
