// pages/api/revalidate.js

export default async function handleRevalidate(req, res) {
  // Log the request body to see the data received from the CMS
  console.log('Webhook received:', req.body);

  // Extract relevant data from the request
  const { event, model, entry } = req.body;

  // Check if the event is related to products
  if (model === 'product') {
    const { id } = entry;

    try {
      // Revalidate both the home page and the specific product page
      await Promise.all([
        res.revalidate('/'),
        res.revalidate(`/products/${id}`)
      ]);

      console.log(`Revalidated product with id: ${id}`);
      res.status(204).end(); // Respond with No Content
    } catch (err) {
      res.status(500).json({ error: 'Failed to revalidate' });
    }
  } else {
    res.status(204).end(); // No action needed if not a product
  }
}