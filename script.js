const startBtn = document.getElementById("start-btn");
const chatContainer = document.getElementById("chat-container");
const chatMessages = document.getElementById("chat-messages");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

startBtn.addEventListener("click", () => {
  chatContainer.style.display = "flex";
  startBtn.style.display = "none";
});

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  appendMessage("Kamu", message, "user");
  userInput.value = "";

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [{ role: "user", content: message }]
      }),
    });

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content || "AI tidak merespon.";
    appendMessage("AI", reply, "ai");
  } catch (err) {
    console.error(err);
    appendMessage("Error", "Gagal menghubungi server.", "ai");
  }
}

function appendMessage(sender, text, cls) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", cls);
  msgDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}