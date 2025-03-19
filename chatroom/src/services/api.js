import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.deepseek.com/v1',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.VUE_APP_DEEPSEEK_API_KEY}`
  }
});

export const chatCompletion = async (messages) => {
  try {
    const response = await api.post('/chat/completions', {
      model: "deepseek-chat",
      messages,
      temperature: 0.7
    });
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('API请求失败:', error.response?.data || error.message);
    throw new Error('获取AI回复失败，请稍后重试');
  }
};