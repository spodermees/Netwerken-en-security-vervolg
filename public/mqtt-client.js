const brokerUrl = "wss://broker.emqx.io:8084/mqtt"; // Change to your MQTT broker
const topic = "chatroom";

// Connect to MQTT broker
const client = mqtt.connect(brokerUrl);

client.on("connect", () => {
    console.log("Connected to MQTT broker");
    client.subscribe(topic, (err) => {
        if (!err) {
            console.log("Subscribed to topic: " + topic);
        }
    });
});

client.on("message", (receivedTopic, message) => {
    if (receivedTopic === topic) {
        const msg = message.toString();
        displayMessage(msg);
    }
});

function sendMessage() {
    const input = document.getElementById("message");
    const msg = input.value.trim();
    if (msg) {
        client.publish(topic, msg);
        input.value = "";
    }
}

function displayMessage(msg) {
    const messagesList = document.getElementById("messages");
    const li = document.createElement("li");
    li.textContent = msg;
    messagesList.appendChild(li);
}
