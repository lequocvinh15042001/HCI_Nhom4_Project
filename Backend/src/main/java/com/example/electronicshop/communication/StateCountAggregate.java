package com.example.electronicshop.communication;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

@Getter
@Setter
@AllArgsConstructor
public class StateCountAggregate {
    private @Id String state;
    private Long count;
}
