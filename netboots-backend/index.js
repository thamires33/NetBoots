require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { TableClient } = require("@azure/data-tables");
const { BlobServiceClient } = require("@azure/storage-blob");

const app = express();
app.use(express.json());
app.use(cors());

// Conexão ao Azure Table Storage
const tableClient = TableClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING, 'ProductTable');

// Conexão ao Blob Storage
const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient('product-images');

// Rota para salvar preferências no Table Storage
app.post('/preferences', async (req, res) => {
    const { userId, preferences } = req.body;
    const entity = {
        partitionKey: 'userPreferences',
        rowKey: userId,
        preferences: JSON.stringify(preferences),
    };
    await tableClient.createEntity(entity);
    res.status(201).send('Preferences saved');
});

// Rota para obter produtos e suas imagens do Blob Storage
app.get('/products', async (req, res) => {
    const products = [];

    for await (const blob of containerClient.listBlobsFlat()) {
        products.push({
            name: blob.name,
            url: `https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net/product-images/${blob.name}`
        });
    }

    res.json(products);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
