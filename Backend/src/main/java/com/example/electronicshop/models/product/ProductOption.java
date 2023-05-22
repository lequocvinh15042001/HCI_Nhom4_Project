package com.example.electronicshop.models.product;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.index.TextIndexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import javax.validation.constraints.NotBlank;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "product_option")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductOption {
    @Id
    private String id;
    @NotBlank(message = "Value is required")
    private String value;
    @NotBlank(message = "Stock is required")
    private Long stock;
    @DocumentReference(lazy = true)
    @JsonIgnore
    private Product product;
//    private List<ProductSelects> selects = new ArrayList<>();

//    public ProductOption(String value) {
//        this.value = value;
//    }

    public ProductOption(String value, Long stock) {
        this.value = value;
        this.stock = stock;
    }
}
