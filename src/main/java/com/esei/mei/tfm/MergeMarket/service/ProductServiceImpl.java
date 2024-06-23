package com.esei.mei.tfm.MergeMarket.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.esei.mei.tfm.MergeMarket.constants.WebScrapingConstants;
import com.esei.mei.tfm.MergeMarket.dao.ProductDao;
import com.esei.mei.tfm.MergeMarket.entity.Product;
import com.esei.mei.tfm.MergeMarket.entity.ProductCategory;

@Service
public class ProductServiceImpl implements ProductService{

	@Autowired
	private ProductDao productDao;
	
	@Override
	public Product create(Product product){
        return productDao.save(product);
    }
	
	@Override
	public Product update(Product product) {
        if (product.getIdProduct() == null || !productDao.existsById(product.getIdProduct())) {
            throw new IllegalArgumentException("El Product no existe en la base de datos.");
        }
        return productDao.save(product);
    }
	
	@Override
    public List<Product> findByName(String name) {
        return productDao.findByName(name);
    }
	
	@Override
	public List<Product> findByCategory(ProductCategory category) {
		return productDao.findByCategory(category);
	}
	
	@Override
    public Optional<Product> findById(Long id) {
        return productDao.findById(id);
    }
		
	@Override
    public List<Product> findByKeyword(String keyword) {
        return productDao.findByKeyword(keyword);
    }
	
	@Override
    public List<Product> findProduct(String name, ProductCategory category) {
		List<Product> toret = new ArrayList<>();
		if(category.getId().equals(WebScrapingConstants.CATEGORIA_TARJETA_GRAFICA)) {
			toret = findByKeyword(name);
		}else {
			toret = findByName(name);
		}
		return toret;
    }
}
