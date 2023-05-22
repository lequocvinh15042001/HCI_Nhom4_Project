package com.example.electronicshop.models.product;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProductSelects {
    private UUID id;
    private String value;
    @NotBlank(message = "Stock is required")
    private Long stock;
}
