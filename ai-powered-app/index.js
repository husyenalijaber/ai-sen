import dotenv from "dotenv";
import readline from "readline";
import Replicate from "replicate";
dotenv.config();

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

const model =
  "ibm-granite/granite-3.3-8b-instruct";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

async function main() {
  console.log("AI Powered App (Granite Chatbot)");
  while (true) {
    const userInput = await ask("You: ");
    if (userInput.toLowerCase() === "exit") break;

    const input = {
      prompt: userInput,
      max_tokens: 200,
      temperature: 0.7,
    };

    const output = await replicate.run(model, { input });
    console.log("AI:", output);
  }
  rl.close();
}

main();
