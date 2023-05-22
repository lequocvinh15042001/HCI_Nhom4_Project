package com.example.electronicshop.communication.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CheckpayRequest {
    private String name;
    private String phone;
    private String province;
    private String district;
    private String ward;
    private String address;
}
