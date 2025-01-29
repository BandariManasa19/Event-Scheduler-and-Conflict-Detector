async function sendMessages() {
    const messagesInput = document.getElementById("messages").value;
    const messages = messagesInput.split('\n').filter(msg => msg.trim() !== '');
    const output = document.getElementById("output");

    // Mock Hedera SDK functions for demo purposes
    const createTopic = async () => '0.0.34567';
    const sendHcsMessage = async (topicId, message, timestamp) => `Message Sent: "${message}" at ${timestamp}`;
    const receiveHcsMessage = async (message, timestamp) => `Message received: "${message}" at ${timestamp}`;

    // Create a topic
    const topicId = await createTopic();
    output.textContent += `Topic Created: ${topicId}\n\nMessages Sent:\n`;

    // Send messages
    for (let i = 0; i < messages.length; i++) {
        const timestamp = new Date(Date.now() + i * 60000).toISOString();
        const sentMessage = await sendHcsMessage(topicId, messages[i], timestamp);
        output.textContent += `${i + 1}. ${sentMessage}\n`;
    }

    // Receive messages
    output.textContent += `\nMessages Received:\n`;
    for (let i = 0; i < messages.length; i++) {
        const timestamp = new Date(Date.now() + i * 60000).toISOString();
        const receivedMessage = await receiveHcsMessage(messages[i], timestamp);
        output.textContent += `${i + 1}. ${receivedMessage}\n`;
    }
}
