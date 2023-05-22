package com.example.electronicshop.models.enity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Delivery {
    private String shipName;
    private String shipPhone;
    private String shipProvince;
    private String shipDistrict;
    private String shipWard;
    private String shipAddress;


}

