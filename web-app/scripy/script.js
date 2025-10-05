const chatBox = document.getElementById("chat-box");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");

function appendMessage(sender, text) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  const bubble = document.createElement("div");
  bubble.classList.add("bubble");
  bubble.textContent = text;
  msg.appendChild(bubble);
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const prompt = userInput.value.trim();
  if (!prompt) return;

  // tampilkan pesan user
  appendMessage("user", prompt);
  userInput.value = "";

  // placeholder loading
  const loadingMsg = document.createElement("div");
  loadingMsg.classList.add("message", "ai");
  const bubble = document.createElement("div");
  bubble.classList.add("bubble");
  bubble.textContent = "Sen Sedang Mengetik...";
  loadingMsg.appendChild(bubble);
  chatBox.appendChild(loadingMsg);
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();

    // ganti loading text dengan jawaban AI
    bubble.textContent = data.response || "⚠️ Gagal dapat respon";
  } catch (err) {
    bubble.textContent = "⚠️ Error: " + err.message;
  }
});
