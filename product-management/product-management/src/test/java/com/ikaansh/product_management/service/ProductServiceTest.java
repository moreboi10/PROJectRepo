
package com.ikaansh.product_management.service;

import com.ikaansh.product_management.dto.ProductRequest;
import com.ikaansh.product_management.entity.Product;
import com.ikaansh.product_management.repository.ProductRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductService productService;

    private Product product;
    private ProductRequest request;

    @BeforeEach
    void setUp() {
        request = new ProductRequest(
                "Wireless Mouse",
                "Ergonomic mouse",
                new BigDecimal("799.00"),
                50
        );

        product = new Product();
        product.setId(1L);
        product.setName("Wireless Mouse");
        product.setDescription("Ergonomic mouse");
        product.setPrice(new BigDecimal("799.00"));
        product.setStockQuantity(50);
    }

    @Test
    void createProductReturnsSavedProduct() {
        when(productRepository.save(any(Product.class)))
                .thenReturn(product);

        Product result = productService.createProduct(request);

        assertEquals(1L, result.getId());
        assertEquals("Wireless Mouse", result.getName());
        verify(productRepository).save(any(Product.class));
    }

    @Test
    void getProductByIdReturnsProductWhenFound() {
        when(productRepository.findById(1L))
                .thenReturn(Optional.of(product));

        Product result = productService.getProductById(1L);

        assertEquals("Wireless Mouse", result.getName());
    }

    @Test
    void getProductByIdThrowsWhenNotFound() {
        when(productRepository.findById(99L))
                .thenReturn(Optional.empty());

        assertThrows(
                ResponseStatusException.class,
                () -> productService.getProductById(99L)
        );
    }

    @Test
    void deleteProductDeletesExistingProduct() {
        when(productRepository.findById(1L))
                .thenReturn(Optional.of(product));

        productService.deleteProduct(1L);

        verify(productRepository).delete(product);
    }
}
