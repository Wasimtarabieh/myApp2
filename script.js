function generateReport() {
    const usageTime = document.getElementById('usageTime').value;
    const stressLevel = document.getElementById('stressLevel').value;
    const goal = document.getElementById('goal').value;
    const reportText = document.getElementById('reportText');

    let report = `اليومية: ${usageTime} ساعة. `;
    report += stressLevel === 'low' ? "أنت على المسار الصحيح." : "لديك توتر متوسط.";
    report += ` هدفك لتحسين حياتك: ${goal}.`;

    reportText.textContent = report;
    document.getElementById('report').style.display = 'block';
}

async function sendMessage() {
    const chatInput = document.getElementById('chatInput');
    const message = chatInput.value;
    if (message.trim() === '') return;

    appendMessage('أنت: ' + message, 'user');
    chatInput.value = '';

    const response = await fetch('http://localhost:3001/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message: message
        })
    });

    const data = await response.json();
    appendMessage('المستشار: ' + data.reply, 'bot');
}

function appendMessage(text, sender) {
    const chatMessages = document.getElementById('chatMessages');
    const messageElement = document.createElement('div');
    messageElement.textContent = text;
    messageElement.classList.add(sender);
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}
