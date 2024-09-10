import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={styles.listContainer}>
      {products.map(product => (
        <div key={product.name} style={styles.productItem}>
          <img src={product.url} alt={product.name} style={styles.productImage} />
          <p style={styles.productName}>{product.name}</p>
        </div>
      ))}
    </div>
  );
}

const styles = {
  listContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  productItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px',
    width: '200px',
    textAlign: 'center',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    padding: '10px',
  },
  productImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '10px',
  },
  productName: {
    fontSize: '16px',
    marginTop: '10px',
  },
};

export default ProductList;
