async function generateReport() {
    const usageTime = document.getElementById('usageTime').value;
    const stressLevel = document.getElementById('stressLevel').value;
    const goal = document.getElementById('goal').value;

    let report = `إليك تقريرك الذكي:\n`;
    report += `وقت الاستخدام اليومي: ${usageTime} ساعات.\n`;
    report += `مستوى التوتر: ${stressLevel}.\n`;
    report += `هدفك: ${goal}.`;

    document.getElementById('reportText').innerText = report;
    document.getElementById('report').style.display = 'block';
}

async function sendMessage() {
    const inputField = document.getElementById('chatInput');
    const message = inputField.value;
    if (message.trim() === '') return;

    try {
        const response = await fetch('http://localhost:3001/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });

        const data = await response.json();
        const chatMessages = document.getElementById('chatMessages');
        chatMessages.innerHTML += `<div class="user-message">${message}</div>`;
        chatMessages.innerHTML += `<div class="bot-reply">${data.reply}</div>`;

    } catch (error) {
        console.error('Error:', error);
    }

    inputField.value = '';
}
