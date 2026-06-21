import app from "./src/app.js";
import http from "http";

import { Redis } from "ioredis";
import { Pool } from "pg";

async function init() {
  try {
    console.log(`🟡 LOG - : REDIS`);
    // Redis Connection
    const redisHost = process.env.REDIS_HOST ?? "127.0.0.1";
    const redisPort = process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379;
    const redisUrl = process.env.REDIS_URL ?? `redis://${redisHost}:${redisPort}`;

    console.log(`Connecting Redis at ${redisUrl}...`);
    const redis = new Redis(redisUrl, {
      lazyConnect: true,
    });
    redis.on("error", (error) => console.error("Redis error:", error));
    await redis.connect();
    console.log(`Redis Connection Success...`);

    // Postgresql Connection
    console.log(`Connecting Postgres...`);

    const pool = new Pool({
      user: process.env.PG_USER ?? "postgres",
      host: process.env.PG_HOST ?? "127.0.0.1",
      database: process.env.PG_DATABASE ?? "postgres",
      password: process.env.PG_PASSWORD ?? "postgres",
      port: Number(process.env.PG_PORT ?? 5431),
    });

    await pool.connect();

    console.log(`Postgres Connection Success...`);

    // Http Server Stuff
    const PORT = process.env.PORT ? +process.env.PORT : 3000;
    const server = http.createServer(app);
    server.listen(PORT, () =>
      console.log(`Http server is listening on PORT ${PORT}`),
    );
  } catch (err) {
    console.log(`Error Starting Server`, err);
  }
}

init()
