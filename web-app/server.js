import express from "express";
import bodyParser from "body-parser";
import Replicate from "replicate";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(bodyParser.json());

// Serve static files dari folder web-app/scripy
app.use(express.static(path.join(__dirname, "scripy")));

// ✅ Route utama untuk load index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "scripy", "index.html"));
});

// API route ke Replicate
app.post("/api/chat", async (req, res) => {
  try {
    const { prompt } = req.body;

    const output = await replicate.run(
      "ibm-granite/granite-3.3-8b-instruct",
      {
        input: {
          prompt,
          max_tokens: 200,
          temperature: 0.7,
        },
      }
    );

    // 🔥 parse output biar ga undefined
    let text = "";
    if (Array.isArray(output)) {
      text = output
        .map((chunk) => {
          if (typeof chunk === "string") return chunk;
          if (chunk && chunk.content) return chunk.content;
          return JSON.stringify(chunk);
        })
        .join(" ");
    } else if (typeof output === "string") {
      text = output;
    } else if (output && output.output) {
      text = output.output;
    } else {
      text = JSON.stringify(output);
    }

    res.json({ response: text });
  } catch (err) {
    console.error("❌ Error from API:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
