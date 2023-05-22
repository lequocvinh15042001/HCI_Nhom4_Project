package com.example.electronicshop.communication.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.List;

@Data
public class ProductOptionReq {
//    @NotBlank(message = "Name is required")
//    private String name;
//    @NotBlank(message = "Label is required")
//    private String label;
    @NotBlank(message = "Value is required")
    private String value;
    @NotNull(message = "Stock is required")
    @Min(value = 1)
    private Long stock;
//    private List<MultipartFile> images;
}
