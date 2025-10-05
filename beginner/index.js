import Replicate from "replicate";
import dotenv from "dotenv";
dotenv.config();

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const model =
  "ibm-granite/granite-3.3-8b-instruct"; // shorten

const input = {
  prompt: "Write a simple JavaScript function that adds two numbers.",
  max_tokens: 200,
};

console.log("Running Granite (beginner example)...");
const output = await replicate.run(model, { input });
console.log("Output:", output);
