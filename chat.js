import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.MY_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            { role: 'system', content: 'Kamu asisten yang berbicara menggunakan bahasa Jawa.' },
            { role: 'user', content: message }
          ],
          max_tokens: 200
        })
      });

      const data = await response.json();
      res.status(200).json({ reply: data.choices[0].message.content });
    } catch (error) {
      console.error(error);
      res.status(500).json({ reply: 'Maaf, kulo dereng saged mangsuli saiki.' });
    }
  } else {
    res.status(405).json({ reply: 'Metode ora diijini' });
  }
}