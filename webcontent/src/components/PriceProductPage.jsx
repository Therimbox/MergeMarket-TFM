import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PriceProductList from './PriceProductList';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import '../css/PriceProduct.css';

const PriceProductsPage = () => {
  const { categoryId, productId } = useParams();
  const [priceProducts, setPriceProducts] = useState([]);
  const [priceHistory, setPriceHistory] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/priceproducts/byproduct/${productId}`)
      .then(response => {
        setPriceProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching price products:', error);
      });

    axios.get(`http://localhost:8080/api/priceHistory/byProductId/${productId}`)
      .then(response => {
        setPriceHistory(response.data);
      })
      .catch(error => {
        console.error('Error fetching price history:', error);
      });
  }, [productId]);

  if (priceHistory.length > 0) {
    console.log(priceHistory);
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div>
      {priceProducts.length > 0 && (
        <div>
          <PriceProductList priceProducts={priceProducts} categoryId={categoryId} productId={productId} />
        </div>
      )}
      {priceHistory.length > 0 && (
        <div>
          <h1>Historial de Precios</h1>
          <LineChart width={800} height={400} data={priceHistory}>
            <XAxis dataKey="timestamp" tickFormatter={formatDate} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="price" stroke="#8884d8" />
          </LineChart>
        </div>
      )}
    </div>
  );
};

export default PriceProductsPage;
