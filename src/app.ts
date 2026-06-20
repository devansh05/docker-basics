import express, { Application, Request, Response } from "express";

const app: Application = express();

// Middleware parsing JSON (optional but standard)
app.use(express.json());

// Your baseline route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello from src/app.ts!");
});

// Export the app instance as the default export
export default app;
