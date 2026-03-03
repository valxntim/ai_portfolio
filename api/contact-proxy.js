// api/contact-proxy.js
import axios from 'axios';

const BACKEND_URL = process.env.BACKEND_URL;

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const backendResponse = await axios.post(
            `${BACKEND_URL}/api/contact`,
            req.body,
            { headers: { 'Content-Type': 'application/json' } }
        );
        return res.status(200).json(backendResponse.data);
    } catch (error) {
        console.error('Error forwarding contact:', error.message);
        return res.status(error.response?.status || 500).json({ message: 'Error' });
    }
}