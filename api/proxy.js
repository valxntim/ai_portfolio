// api/proxy.js
import axios from 'axios';

const BACKEND_URL = process.env.BACKEND_URL;

export default async function handler(req, res) {
    // We only allow POST requests for our chat API
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        // We send the request from Vercel's backend to your DigitalOcean backend
        const backendResponse = await axios.post(
            `${BACKEND_URL}/api/ask`,
            req.body,
            {
                headers: {
                    'Content-Type': 'application/json',
                    // Optional: Add a custom header here later if you want to lock down DigitalOcean
                }
            }
        );

        // Vercel gets the response and forwards it back to your React app
        return res.status(200).json(backendResponse.data);
    } catch (error) {
        console.error('Error forwarding request:', error.message);
        return res.status(error.response?.status || 500).json({
            message: 'Error communicating with backend'
        });
    }
}