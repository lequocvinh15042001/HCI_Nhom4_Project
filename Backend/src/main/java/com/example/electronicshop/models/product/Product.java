package com.example.electronicshop.models.product;

import com.example.electronicshop.models.enity.Category;
import com.example.electronicshop.models.enity.Comment;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.*;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class  Product {
    @Id
    private String id;
    @NotBlank(message = "Name is required")
    @Indexed(unique = true)
    private String name;
    @NotBlank(message = "slugify is required")
    private String slugify;
    //    @ReadOnlyProperty
//    @DocumentReference(lookup="{'product':?#{#self._id} }", lazy = true)
//    private List<ProductImage> images = new ArrayList<>();
    private List<ProductImage> images = new ArrayList<>();

    @ReadOnlyProperty
    @DocumentReference(lookup="{'product':?#{#self._id} }", lazy = true)
    @Indexed
    private List<Comment> comment;
    @NotNull(message = "Price is required")
    private BigDecimal price;
//    @NotNull(message = "Quantity is required")
    private int quantity;
    private double sale;
    private double rate = 0;
    @NotBlank(message = "summary is required")
    private String summary;

    private List<ProductOption> options = new ArrayList<>();
    @NotBlank(message = "tags is required")
    private List<String> tags;
    @NotBlank(message = "Description is required")
    private String description;
    @NotBlank(message = "Category is required")
    @DocumentReference
    private Category category;
    @NotBlank(message = "State is required")
    private String state;
    @CreatedDate
    @JsonFormat(pattern = "dd/MM/yyyy HH:mm:ss")
    LocalDateTime createdDate;

    public Product(String name, String slugify, BigDecimal price,int quantity, double sale, String summary, List<String> tags, String description, Category category, String state, LocalDateTime createdDate) {
        this.name = name;
        this.slugify = slugify;
        this.price = price;
        this.quantity = quantity;
        this.sale = sale;
        this.summary = summary;
        this.tags = tags;
        this.description = description;
        this.category = category;
        this.state = state;
        this.createdDate = createdDate;
    }
    @Transient
    public int getRateCount() {
        try {
            return comment.size();
        } catch (Exception e) {
            return 0;
        }
    }
}
