<<<<<<< HEAD
# Blueprint Server
=======
This is the readme file for Blueprint server. Blueprint is a real estate service provider company.
>>>>>>> c35635c2d049e81537f7063e5b7114fcfaaba5d1

## Deploying to Vercel

The Vercel function entry point is `src/vercel.ts`. Configure these environment
variables in the Vercel project settings:

- `MONGODB_URI`: MongoDB connection string. Make sure the Vercel deployment can
  connect to the database (including its network access/IP allowlist settings).
- `CLIENT_URL`: Frontend origin allowed by CORS. Multiple origins can be
  comma-separated. If omitted, only `http://localhost:3000` is allowed.
- Set any other application secrets used by your routes, such as `JWT_SECRET`,
  in Vercel's environment variables.

The API routes are available under `/api/v1`. The root path returns the
application status message.

## Local development

Create a `.env` file with the required environment variables, then run:

```bash
npm run dev
```

To compile and run the production server locally:

```bash
npm run build
npm start
```
<<<<<<< HEAD
=======

//

Eid Day != Code day

Tech Stack's

1. Node.js
2. Express.js
3. bycript js
4. jsonwebtoken
5. mongoose
6. mvc pattern

Electricity issue.
>>>>>>> c35635c2d049e81537f7063e5b7114fcfaaba5d1
