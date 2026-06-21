import app from "./src/app.js";
import http from "http";

import { Redis } from "ioredis";
import { Pool } from "pg";

async function init() {
  try {
    console.log(`🟡 LOG - : REDIS`);
    // Redis Connection
    const redisHost = "redis";
    const redisPort = 6379;
    const redisUrl =
      process.env.REDIS_URL ?? `redis://${redisHost}:${redisPort}`;

    const redis = new Redis(redisUrl, {
      lazyConnect: true,
    });

    console.log(`Connecting Redis at ${redisUrl}...`);
    redis.on("error", (error) => console.error("Redis error:", error));
    await redis.connect();
    console.log(`Redis Connection Success...`);

    // Postgresql Connection
    console.log(`Connecting Postgres...`);

    const pool = new Pool({
      user: "postgres",
      host: "db",
      database: "postgres",
      password: "postgres",
    });

    await pool.connect();

    console.log(`Postgres Connection Success...`);

    // Http Server Stuff
    const PORT = 3000;
    const server = http.createServer(app);
    server.listen(PORT, () =>
      console.log(`Http server is listening on PORT ${PORT}`),
    );
  } catch (err) {
    console.log(`Error Starting Server`, err);
  }
}

init();
