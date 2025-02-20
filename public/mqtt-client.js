const MQTT_BROKER = 'ws://localhost:9001'; // Pas aan naar je server IP als extern
const MQTT_TOPIC = 'chat';

const client = mqtt.connect(MQTT_BROKER);

client.on('connect', () => {
    console.log("✅ Verbonden met MQTT WebSockets");
    client.subscribe(MQTT_TOPIC);
});

client.on('message', (topic, message) => {
    if (topic === MQTT_TOPIC) {
        displayMessage(message.toString());
    }
});

function sendMessage() {
    const input = document.getElementById("message");
    const text = input.value.trim();
    
    if (text) {
        client.publish(MQTT_TOPIC, text);
        input.value = "";
    }
}

function displayMessage(msg) {
    const msgList = document.getElementById("messages");
    const newMsg = document.createElement("li");
    newMsg.textContent = msg;
    msgList.appendChild(newMsg);
}
