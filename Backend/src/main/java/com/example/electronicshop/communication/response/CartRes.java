package com.example.electronicshop.communication.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class CartRes {
    private String id;
    private long totalProduct = 0;
    private BigDecimal totalPrice;
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    private List<CartItemRes> items = new ArrayList<>();
    private String state;

    public CartRes(String id, long totalProduct, BigDecimal totalPrice, String state) {
        this.id = id;
        this.totalProduct = totalProduct;
        this.totalPrice = totalPrice;
        this.state = state;
    }
}
