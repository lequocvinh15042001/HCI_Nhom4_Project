package com.example.electronicshop.map;

import com.example.electronicshop.communication.response.CartItemRes;
import com.example.electronicshop.communication.response.CartRes;
import com.example.electronicshop.models.enity.Order;
import com.example.electronicshop.models.enity.OrderItem;
import com.example.electronicshop.models.product.ProductOption;
import com.example.electronicshop.repository.ProductOptionRepository;
import com.example.electronicshop.repository.ProductRepository;
import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CartMapper {
    public CartRes toCartRes(Order order) {
        CartRes res = new CartRes(order.getId(), order.getTotalProduct(), order.getTotalPrice(), order.getState());
        res.setItems(order.getItems().stream().map(CartMapper::toCartItemRes).collect(Collectors.toList()));
        return res;
    }

    public static CartItemRes toCartItemRes(OrderItem orderItem) {
        if(orderItem.getValue()==null){
            return new CartItemRes(orderItem.getId(), orderItem.getItem().getId(), "", orderItem.getItem().getCategory().getId(),
                    orderItem.getItem().getName(), orderItem.getItem().getSale(), orderItem.getQuantity(),
                    orderItem.getItem().getImages(), orderItem.getItem().getPrice(), orderItem.getValue(),
                    orderItem.getItem().getQuantity(), orderItem.getSubPrice());
        }else {
            return new CartItemRes(orderItem.getId(), orderItem.getItem().getId(), orderItem.getOption().getId(), orderItem.getItem().getCategory().getId(),
                    orderItem.getItem().getName(), orderItem.getItem().getSale(), orderItem.getQuantity(),
                    orderItem.getItem().getImages(), orderItem.getItem().getPrice(), orderItem.getValue(),
                    orderItem.getOption().getStock(), orderItem.getSubPrice());
        }
    }
}
