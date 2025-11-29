# AWS Deployment Guide

This monorepo is designed to allow separate deployments for the frontend and backend.

## 1. Backend (Elysia)

The backend is a Bun application. The best way to deploy it on AWS is using a container service like **AWS App Runner** or **Amazon ECS (Fargate)**.

### Docker Strategy
A `Dockerfile` has been created in `packages/backend/Dockerfile`.
You should build the image from the **root** of the monorepo to ensure the lockfile and workspace context are preserved.

```bash
# Run from root
docker build -t my-backend -f packages/backend/Dockerfile .
```

### Deployment Options
- **AWS App Runner**: Easiest. Connect your GitHub repo or push the image to ECR. App Runner handles auto-scaling and HTTPS.
- **Amazon ECS (Fargate)**: More control. Good if you have complex networking needs.

### Environment Variables
- `PORT`: Defaults to 3000.
- Any database URLs or secrets.

## 2. Frontend (Vite + React)

The frontend is a static Single Page Application (SPA).

### Build
Build the frontend for production:
```bash
bun --filter frontend build
```
The output will be in `packages/frontend/dist`.

### Deployment Options
- **AWS S3 + CloudFront** (Recommended):
  1. Create an S3 bucket (block public access).
  2. Create a CloudFront distribution pointing to the S3 bucket (using OAC).
  3. Upload the contents of `dist` to the S3 bucket.
  4. Configure CloudFront to handle SPA routing (error pages -> index.html).

- **AWS Amplify Hosting**:
  1. Connect your repo.
  2. Point it to `packages/frontend`.
  3. Build command: `bun install && bun --filter frontend build`.
  4. Output directory: `packages/frontend/dist`.

### Connecting to Backend
In production, your frontend and backend will likely be on different domains (e.g., `app.example.com` and `api.example.com`).
1. **CORS**: Update `packages/backend/src/index.ts` to enable CORS for your frontend domain.
2. **Environment Variable**: Update the frontend to use an environment variable for the API URL instead of the relative `/api` proxy used in dev.

   Create `.env.production` in `packages/frontend`:
   ```
   VITE_API_URL=https://api.example.com
   ```

   Update your API calls to use this variable:
   ```ts
   const API_URL = import.meta.env.VITE_API_URL || '/api'
   fetch(`${API_URL}/hello`)
   ```
