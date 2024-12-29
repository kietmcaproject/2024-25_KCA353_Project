// pages/api/donations.js

let donations = []; // This will hold the donations (using in-memory array for demo)

// Handle GET and POST requests for donations
export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Return the donations array
    return res.status(200).json(donations);
  }

  if (req.method === 'POST') {
    // Save the new donation
    const { item, quantity, name, message, location } = req.body;

    if (!item || !quantity || !name || !location) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newDonation = {
      id: donations.length + 1,  // Simple ID generation
      item,
      quantity,
      name,
      message,
      location,
    };

    donations.push(newDonation);  // Add to the in-memory data array

    return res.status(201).json(newDonation);  // Respond with the new donation data
  }

  res.status(405).json({ message: 'Method Not Allowed' }); // For unsupported methods
}
