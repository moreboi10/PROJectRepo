package com.ikaansh.product_management.repository;

import com.ikaansh.product_management.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}