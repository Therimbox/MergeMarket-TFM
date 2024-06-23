import React, { useState, useEffect } from 'react';
import PriceProduct from './PriceProduct';
import { HiOutlineBell, HiMiniBellAlert } from "react-icons/hi2";
import axios from 'axios';
import '../css/PriceProduct.css';

const PriceProductList = ({ priceProducts, categoryId, productId }) => {
    const productName = priceProducts.length > 0 ? priceProducts[0].product.name : '';
    const productImage = priceProducts.length > 0 ? priceProducts[0].image : '';
    const showProductName = categoryId !== 2;

    const [isTracking, setIsTracking] = useState(false);
    const [visibleProducts, setVisibleProducts] = useState(5); // Estado para controlar los productos visibles

    useEffect(() => {
        const checkTracking = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const config = {
                        headers: { Authorization: `Bearer ${token}` }
                    };

                    const userResponse = await axios.get(`http://localhost:8080/api/users/user`, config);
                    const userId = userResponse.data.id;
                    const trackingResponse = await axios.get(`http://localhost:8080/api/users/${userId}/isTracking/${productId}`, config);
                    
                    setIsTracking(trackingResponse.data);
                }
            } catch (error) {
                console.error('Error checking tracking:', error);
            }
        };

        checkTracking();
    }, [productId]);

    const toggleTracking = async () => {
        try {
            const token = localStorage.getItem('token');
            if (token) {
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                };

                const userResponse = await axios.get(`http://localhost:8080/api/users/user`, config);
                const userId = userResponse.data.id;

                if (isTracking) {
                    await axios.delete(`http://localhost:8080/api/users/${userId}/deleteTrack/${productId}`, config);
                } else {
                    await axios.post(`http://localhost:8080/api/users/${userId}/addTrack/${productId}`, config);
                }
                setIsTracking(!isTracking);
            }
        } catch (error) {
            console.error('Error toggling tracking:', error);
        }
    };

    const loadMoreProducts = () => {
        setVisibleProducts(prevVisibleProducts => prevVisibleProducts + 5);
    };

    return (
        <div className="price-product-list">
            {showProductName && <img src={productImage} alt="Imagen" />}
            {showProductName && <h2>{productName}</h2>}
            {isTracking ? 
                (
                    <HiMiniBellAlert onClick={toggleTracking} className="tracking-icon" />
                ) : (
                    <HiOutlineBell onClick={toggleTracking} className="tracking-icon" />
            )}
            <div className="price-product-items">
                {priceProducts.slice(0, visibleProducts).map((priceProduct, index) => (
                    <div className="price-product-item" key={index}>
                        <PriceProduct
                            name={priceProduct.name}
                            price={priceProduct.price}
                            url={priceProduct.url}
                            lastDate={priceProduct.lastDate}
                            image={priceProduct.image}
                            categoryId={categoryId}
                        />
                    </div>
                ))}
            </div>
            {visibleProducts < priceProducts.length && (
                <button onClick={loadMoreProducts}>Cargar más resultados</button>
            )}
        </div>
    );
};

export default PriceProductList;
