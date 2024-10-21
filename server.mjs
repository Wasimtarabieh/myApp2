require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3001;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // استخدام المفتاح من .env

app.use(express.json());

app.post('/chat', async (req, res) => {
    const { message } = req.body;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: message }],
                max_tokens: 100
            })
        });

        const data = await response.json();
        const reply = data.choices[0].message.content;
        res.json({ reply });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'حدث خطأ في استجابة ChatGPT.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
