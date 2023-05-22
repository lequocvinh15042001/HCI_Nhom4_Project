package com.example.electronicshop.communication.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Range;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentReq {
    @NotBlank(message = "Content is required")
    private String content;
    @NotBlank(message = "Product id is required")
    private String productId;
    @NotNull(message = "Rate is required")
    @Range(min = 1, max = 5, message = "Invalid rate! Only from 1 to 5")
    private double rate;
}
