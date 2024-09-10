require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { TableClient } = require("@azure/data-tables");
const { BlobServiceClient } = require("@azure/storage-blob");

const app = express();
app.use(express.json());
app.use(cors());

// Conexão ao Azure Table Storage usando SAS Token
const tableClient = new TableClient(
    `${process.env.AZURE_TABLE_URL}?${process.env.AZURE_SAS_TOKEN}`, 
    'ProductTable'
);

// Conexão ao Azure Blob Storage usando SAS Token
const blobServiceClient = new BlobServiceClient(
    `${process.env.AZURE_BLOB_URL}?${process.env.AZURE_SAS_TOKEN}`
);
const containerClient = blobServiceClient.getContainerClient('product-images');

// Rota para salvar preferências no Table Storage
app.post('/preferences', async (req, res) => {
    const { userId, preferences } = req.body;
    
    try {
        const entity = {
            partitionKey: 'userPreferences',
            rowKey: userId,
            preferences: JSON.stringify(preferences),
        };
        await tableClient.createEntity(entity);
        res.status(201).send('Preferences saved successfully');
    } catch (error) {
        console.error('Error saving preferences:', error);
        res.status(500).send('Failed to save preferences');
    }
});

// Rota para obter produtos e suas imagens do Blob Storage
app.get('/products', async (req, res) => {
    try {
        const products = [];

        // Listando blobs do container
        for await (const blob of containerClient.listBlobsFlat()) {
            products.push({
                name: blob.name,
                url: `${process.env.AZURE_BLOB_URL}product-images/${blob.name}?${process.env.AZURE_SAS_TOKEN}`
            });
        }

        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Failed to fetch products');
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
