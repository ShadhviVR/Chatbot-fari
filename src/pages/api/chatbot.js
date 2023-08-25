import axios from 'axios';

export default async function handler(req, res) {
  const { message } = req.body;
  
  try {
    const response = await axios.post('http://localhost:5000/chatbot', { message });
    res.status(200).json({ message: response.data.message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Something went wrong.' });
  }
}
