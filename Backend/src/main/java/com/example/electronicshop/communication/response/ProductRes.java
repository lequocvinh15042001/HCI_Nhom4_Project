package com.example.electronicshop.communication.response;

import com.example.electronicshop.models.product.ProductImage;
import com.example.electronicshop.models.product.ProductOption;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProductRes {
    private String id;
    private String name;
    private String slugify;
    private List<ProductImage> images;
    private BigDecimal price;
    private int quantity;
    private double sale;
    private double rate;
    private String summary;
    private List<ProductOption> options;
    private List<String> tags;
    private String description;
    private String category;
    private String category_id;
    private String state;
    LocalDateTime createdDate;

}
