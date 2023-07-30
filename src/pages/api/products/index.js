import { MongoClient } from 'mongodb';

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kimhlst.mongodb.net/pcbuilder?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  serverApi: {
    version: '1', // Update this to a non-deprecated version
    strict: true,
    deprecationErrors: true,
  },
});

async function run(req, res) {
  const { category } = req.query;
  try {
    await client.connect();
    console.log("Database connected");

    const productCollection = client.db('pcbuilder').collection('products');

    let results;

    if (category) {
      results = await productCollection.find({ category: category }).toArray();
    } else if (req.method === 'GET') {
      results = await productCollection.find({}).toArray();
    } else {
      res.status(405).json({ message: 'Method not allowed', status: 405 });
      return;
    }

    res.status(200).json({ message: 'Success', status: 200, data: results });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error', status: 500 });
  } finally {
    // Closing the client connection
    // await client.close();
  }
}

export default run;
