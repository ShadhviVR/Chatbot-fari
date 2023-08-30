import axios from 'axios';

export default async function handler(req, res) {
    try {
        const { method, body } = req;
        const { languages } = req.query;

        const url = `http://46.226.110.124:5000`;

        const response = await axios.request({
            method,
            url,
            data: body,
        });

        res.status(response.status).json(response.data);
    } catch (error) {
        console.error('Error proxying request:', error);
        res.status(500).json({ error: 'Proxy error' });
    }
}