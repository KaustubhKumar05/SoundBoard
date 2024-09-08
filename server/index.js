const express = require("express");
const redis = require("redis");
require("dotenv").config();

const app = express();
app.use(express.json());

const allowedOrigins = ["https://soundb0red.vercel.app/"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
  })
);

const client = redis.createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

client.on("error", (err) => console.log("Redis Client Error", err));
client.on("connect", () => console.log("Redis Client Connected"));

async function startServer() {
  try {
    await client.connect();

    // Add new board
    app.post("/api/boards", async (req, res) => {
      try {
        const { key, config } = req.body;
        await client.set(key, JSON.stringify(config));
        res.json({ message: "Config saved successfully" });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error saving config" });
      }
    });

    // Retrieve keys -> board names
    app.get("/api/boards", async (_, res) => {
      try {
        const keys = await client.keys("*");
        res.json(keys);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error retrieving boards" });
      }
    });

    // Get board
    app.get("/api/boards/:key", async (req, res) => {
      try {
        const { key } = req.params;
        const reply = await client.get(key);
        if (reply) {
          res.json(JSON.parse(reply));
        } else {
          res.status(404).json({ error: "Config not found" });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error retrieving config" });
      }
    });

    // Update board
    app.put("/api/board/:key", async (req, res) => {
      try {
        const { key } = req.params;
        const { config } = req.body;
        const exists = await client.exists(key);
        if (exists) {
          await client.set(key, JSON.stringify(config));
          res.json({ message: "Config updated successfully" });
        } else {
          res.status(404).json({ error: "Config not found" });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error updating config" });
      }
    });

    // Delete board
    app.delete("/api/boards/:key", async (req, res) => {
      try {
        const { key } = req.params;
        const reply = await client.del(key);
        if (reply === 1) {
          res.json({ message: "Config deleted successfully" });
        } else {
          res.status(404).json({ error: "Config not found" });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error deleting config" });
      }
    });

    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Failed to start the server:", err);
    process.exit(1);
  }
}

startServer();
