import app from "./src/app.js";
import http from "http";

import { Redis } from "ioredis";
import { Pool } from "pg";

const PORT = process.env.PORT || 3000;

init();

async function init() {
  try {
    console.log(`🟡 LOG - : REDIS`);
    // Redis Connection
    console.log(`Connecting Redis...`);
    const redis = new Redis("redis://redis:6379", { lazyConnect: true });
    await redis.connect();
    console.log(`Redis Connection Success...`);

    // Postgresql Connection
    console.log(`Connecting Postgres...`);

    // const { Client } = pg;
    // const client = new Client({
    //   host: "db",
    //   port: 5432,
    //   database: "postgres",
    //   user: "postgres",
    //   password: "postgres",
    // });
    // await client.connect();

    const pool = new Pool({
      user: "postgres", // Your PostgreSQL username (default is 'postgres')
      host: "localhost", // Server hosting your database
      database: "postgres", // Name of the database you want to connect to
      password: "mysecretpassword", // The password you set during Postgres installation
      port: 5432, // Default PostgreSQL port
    });

    await pool.connect();

    console.log(`Postgres Connection Success...`);

    // Http Server Stuff
    const PORT = process.env.PORT ? +process.env.PORT : 8000;
    const server = http.createServer(app);
    server.listen(PORT, () =>
      console.log(`Http server is listening on PORT ${PORT}`),
    );
  } catch (err) {
    console.log(`Error Starting Server`, err);
  }
}

app.listen(PORT, () => {
  console.log(`Server is live on http://localhost:${PORT}`);
});
