function generateReport() {
    const usageTime = document.getElementById('usageTime').value;
    const stressLevel = document.getElementById('stressLevel').value;
    const goal = document.getElementById('goal').value;

    // تحقق من أن جميع الحقول ممتلئة
    if (!usageTime || !stressLevel || !goal) {
        alert("يرجى ملء جميع الحقول!");
        return;
    }

    let report = `التقرير الذكي بناءً على معلوماتك:
    - ساعات الشاشة اليومية: ${usageTime} ساعة.
    - مستوى التوتر: ${stressLevel}.
    - هدفك لتحسين حياتك الرقمية: ${goal}.`;

    // عرض التقرير في العنصر المحدد
    const reportSection = document.getElementById('report');
    const reportText = document.getElementById('reportText');
    reportText.textContent = report;
    reportSection.style.display = 'block';
}

async function sendMessage() {
    const inputField = document.getElementById('chatInput');
    const message = inputField.value;
    if (message.trim() === '') return;

    try {
        const response = await fetch('https://wasimtarabieh.github.io/myApp2/chat', {
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
