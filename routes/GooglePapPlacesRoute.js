const express = require("express");
const { Client } = require("@googlemaps/google-maps-services-js");
const dotenv = require("dotenv");
const router = express.Router();
const client = new Client({});
dotenv.config();

router.post('/frontend', async (req, res) => {
    const { origin, destination } = req.body;
    console.log('Received coordinates:', { origin, destination });

    try {
        const response = await client.directions({
            params: {
                origin: { lat: origin.lat, lng: origin.lng },
                destination: { lat: destination.lat, lng: destination.lng },
                key: process.env.GOOGLE_MAPS_API_KEY, 
            },
            timeout: 3000
        });

        const { routes } = response.data;
        if (routes && routes.length > 0) {
            const route = routes[0];
            const distance = route.legs[0].distance.text;
            const duration = route.legs[0].duration.text;
            const steps = route.legs[0].steps.map(step => ({
                instructions: step.html_instructions,
                distance: step.distance.text,
                duration: step.duration.text,
                start_location: step.start_location,
                end_location: step.end_location
            }));

           
            res.json({ distance, duration, steps });
        } else {
            console.error('No routes found between the origin and destination.');
            res.status(404).json({ error: 'No routes found' });
        }
    } catch (error) {
        console.error('Error fetching directions:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Failed to fetch directions', details: error.response ? error.response.data : error.message });
    }
});

module.exports = router;
