require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { BlobServiceClient } = require("@azure/storage-blob");

const app = express();
app.use(express.json());
app.use(cors());

const blobServiceClient = new BlobServiceClient(
    `${process.env.AZURE_BLOB_URL}?${process.env.AZURE_SAS_TOKEN}`
);
const containerClient = blobServiceClient.getContainerClient('sapataria');

app.post('/search-shoes', async (req, res) => {
    const { query } = req.body; // termo de busca do front
    
    try {
        const products = [];
        for await (const blob of containerClient.listBlobsFlat()) {
            if (blob.name.toLowerCase().includes(query.toLowerCase())) {
                products.push({
                    name: blob.name,
                    url: `${process.env.AZURE_BLOB_URL}/sapataria/${blob.name}?${process.env.AZURE_SAS_TOKEN}`
                });
            }
        }

        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);  
        res.status(500).send('Failed to fetch products');  
    }
    
});
// servindo apenas para consulta
app.get('/products', async (req, res) => {
    try {
        const products = [];

        for await (const blob of containerClient.listBlobsFlat()) {
            products.push({
                name: blob.name,
                url: `${process.env.AZURE_BLOB_URL}/sapataria/${blob.name}?${process.env.AZURE_SAS_TOKEN}`
            });
        }

        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Failed to fetch products');
    }
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});