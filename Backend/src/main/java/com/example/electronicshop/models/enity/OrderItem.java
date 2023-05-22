package com.example.electronicshop.models.enity;

import com.example.electronicshop.models.product.Product;
import com.example.electronicshop.models.product.ProductOption;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.stream.Collectors;

@Document(collection = "order_items")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderItem {
    @Id
    private String id;
    @DocumentReference
    @Indexed
    private Product item;
    @NotBlank
    private String value;
    private ProductOption option;
    @NotNull
    private long quantity;
    @DocumentReference(lazy = true)
    @JsonIgnore
    private Order order;
    @Transient
    private BigDecimal subPrice = BigDecimal.ZERO;

    public Product getItem() {
        item.setOptions(item.getOptions().stream()
                .filter(v -> v.getValue().equals(value)).collect(Collectors.toList()));
        return item;
    }
    public BigDecimal getSubPrice() {
        BigDecimal originPrice = (item.getPrice().multiply(BigDecimal.valueOf(quantity)));
        String discountString = originPrice.multiply(BigDecimal.valueOf((1-item.getSale())))
                .stripTrailingZeros().toPlainString();
        return new BigDecimal(discountString);
    }

    public OrderItem(Product item,ProductOption option, String value, long quantity, Order order) {
        this.item = item;
        this.option=option;
        this.value = value;
        this.quantity = quantity;
        this.order = order;
    }

    public OrderItem(Product item, long quantity, Order order) {
        this.item = item;
        this.quantity = quantity;
        this.order = order;
    }
}
