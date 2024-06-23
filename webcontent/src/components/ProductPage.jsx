import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductList from './ProductList';
import { InputText } from 'primereact/inputtext';

const ProductPage = () => {
    const { categoryId, name } = useParams();
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterByBrand, setFilterByBrand] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/products/bycategory/${categoryId}`)
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, [categoryId]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setFilterByBrand(null);
    };

    const handleBrandFilter = (brand) => {
        setSearchTerm(brand);
    };

    const handleClearFilter = () => {
        setSearchTerm('');
        setFilterByBrand(null);
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h2>{name}</h2>
            <div className="input-container">
                <InputText
                    type="text"
                    placeholder="Buscar productos"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="custom-input"
                />
            </div>
            {categoryId === '1' && (
                <div>
                    <button onClick={() => handleBrandFilter('Intel')}>Intel</button>
                    <button onClick={() => handleBrandFilter('AMD')}>AMD</button>
                </div>
            )}
            {categoryId === '2' && (
                <div>
                    
                </div>
            )}
            {categoryId === '3' && (
                <div>
                    <div>
                        <button onClick={() => handleBrandFilter('A320')}>A320</button>
                        <button onClick={() => handleBrandFilter('A520')}>A520</button>
                        <button onClick={() => handleBrandFilter('A620')}>A620</button>
                        <button onClick={() => handleBrandFilter('B450')}>B450</button>
                        <button onClick={() => handleBrandFilter('B550')}>B550</button>
                        <button onClick={() => handleBrandFilter('B650')}>B650</button>
                        <button onClick={() => handleBrandFilter('B760')}>B760</button>
                    </div>
                    <div>
                        <button onClick={() => handleBrandFilter('H510')}>H510</button>
                        <button onClick={() => handleBrandFilter('H610')}>H610</button>
                        <button onClick={() => handleBrandFilter('H670')}>H670</button>
                        <button onClick={() => handleBrandFilter('X570')}>X570</button>
                        <button onClick={() => handleBrandFilter('X670')}>X670</button>
                        <button onClick={() => handleBrandFilter('Z490')}>Z490</button>
                        <button onClick={() => handleBrandFilter('Z590')}>Z590</button>
                        <button onClick={() => handleBrandFilter('Z690')}>Z690</button>
                        <button onClick={() => handleBrandFilter('Z790')}>Z790</button>
                    </div>   
                </div>
            )}
            <button onClick={handleClearFilter}>Limpiar filtro</button>
            <ProductList products={filteredProducts} />
        </div>
    );    
};

export default ProductPage;
