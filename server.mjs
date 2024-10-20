import express from 'express';
import { Configuration, OpenAIApi } from 'openai';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// إعداد OpenAI API
const configuration = new Configuration({
    apiKey: 'YOUR_OPENAI_API_KEY'
});
const openai = new OpenAIApi(configuration);

// مسار لمعالجة استفسارات المستخدم
app.post('/chat', async (req, res) => {
    const { message } = req.body;
    try {
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: message }],
        });

        const reply = response.data.choices[0].message.content;
        res.json({ reply });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('حدث خطأ أثناء الاتصال بـ ChatGPT');
    }
});

// بدء الخادم على المنفذ 3001
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
