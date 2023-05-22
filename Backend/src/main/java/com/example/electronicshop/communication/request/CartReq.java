package com.example.electronicshop.communication.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CartReq {
    @NotBlank(message = "Product id is required")
    private String producId;
//    @NotBlank(message = "Product option id is required")
    private String productOptionId;
//    @NotBlank(message = "Value is required")
    private String value;
    @NotNull(message = "Quantity is required")
    private long quantity;
}
