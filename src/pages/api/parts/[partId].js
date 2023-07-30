// Import MongoClient
const { MongoClient } = require('mongodb');

const uri = `mongodb+srv://admin:${process.env.DB_PASS}@cluster0.kimhlst.mongodb.net/pcbuilder?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run(req, res) {

    
    
    const { partId } = req.query;
    console.log(partId);
  try {
    await client.connect();
    console.log("Database connected");

    const productCollection = client.db('pcbuilder').collection('products');
    const product = await productCollection.findOne({ id:partId });
    console.log(product);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error', status: 500 });
  } finally {
    // await client.close(); // Close the MongoDB connection
  }
}

export default run;
