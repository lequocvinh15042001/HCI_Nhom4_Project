package com.example.electronicshop.service.paypalpayment;

import com.example.electronicshop.communication.request.CheckpayRequest;
import com.example.electronicshop.communication.response.PaymentDetail;
import com.example.electronicshop.config.Constant;
import com.example.electronicshop.models.enity.Delivery;
import com.example.electronicshop.models.enity.Order;
import com.example.electronicshop.models.enity.User;
import com.example.electronicshop.notification.AppException;
import com.example.electronicshop.notification.NotFoundException;
import com.example.electronicshop.repository.OrderItemRepository;
import com.example.electronicshop.repository.OrderRepository;
import com.example.electronicshop.repository.UserRepository;
import com.example.electronicshop.security.jwt.JwtUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.context.ApplicationContext;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class PaymentService{
   // public static String CLIENT_REDIRECT = "http://localhost:3000/redirect/payment?success=";
   public static String CLIENT_REDIRECT =  "https://tlcn-fe.vercel.app/redirect/payment?success=";
    private final ApplicationContext context;
    private final OrderRepository orderRepository;
private final OrderItemRepository orderItemRepository;
    private final JwtUtils jwtTokenUtil;
    private final UserRepository userRepository;

    public PaymentFactory getPaymentMethod(String methodName) {
        switch (methodName) {
            case Constant.PAY_PAYPAL: return context.getBean(PaypalService.class);
            case Constant.PAY_VNPAY: return context.getBean(VNPayService.class);
            case Constant.PAY_COD: return context.getBean(CODService.class);
            default: return null;
        }
    }

    @Transactional
    public ResponseEntity<?> createPayment(HttpServletRequest request, String id, String paymentType, CheckpayRequest req) {
        String user_id = jwtTokenUtil.getUserFromJWT(jwtTokenUtil.getJwtFromHeader(request)).getId();
        if (user_id.isBlank()) throw new AppException(HttpStatus.BAD_REQUEST.value(), "Token is invalid");
        Optional<Order> order;
        try {
            order = orderRepository.findOrderByUser_IdAndState(new ObjectId(user_id), Constant.ORDER_STATE_ENABLE);
            if (order.isEmpty() || !order.get().getId().equals(id)) {
                throw new NotFoundException("Can not found any order with id: " + id);
            }
            PaymentDetail paymentDetail = new PaymentDetail(null,paymentType.toUpperCase(),"", new HashMap<>());
            order.get().setPaymentDetail(paymentDetail);
            Delivery delivery = new Delivery(req.getName(), req.getPhone(),
                    req.getProvince(), req.getDistrict(), req.getWard(),req.getAddress());
            order.get().setDelivery(delivery);
            order.get().setState(Constant.ORDER_STATE_PROCESS);
            orderItemRepository.saveAll(order.get().getItems());
            orderRepository.save(order.get());
        } catch (NotFoundException e) {
            log.error(e.getMessage());
            throw new NotFoundException(e.getMessage());
        }catch (AppException e) {
            throw new AppException(e.getCode(), e.getMessage());
        } catch (Exception e) {
            throw new AppException(HttpStatus.EXPECTATION_FAILED.value(), "More than one cart with user id: "+ user_id);
        }
        PaymentFactory paymentFactory = getPaymentMethod(paymentType);
        return paymentFactory.createPayment(request, order.get());
    }

    @Transactional
    public ResponseEntity<?> executePayment(String paymentId, String payerId, String responseCode,
                                            String id, HttpServletRequest request, HttpServletResponse response) {
        if (paymentId != null && payerId != null ) {
            PaymentFactory paymentFactory = getPaymentMethod(Constant.PAY_PAYPAL);
            return paymentFactory.executePayment(paymentId, payerId, null,null, request, response);
        } else if (responseCode != null) {
            PaymentFactory paymentFactory = getPaymentMethod(Constant.PAY_VNPAY);
            return paymentFactory.executePayment(null, null, responseCode, id, request, response);
        } else {
            getRoleCancelPayment(request);
            PaymentFactory paymentFactory = getPaymentMethod(Constant.PAY_COD);
            return paymentFactory.executePayment(paymentId, null, null,null, request, response);
        }
    }

    @Transactional
    public ResponseEntity<?> cancelPayment(String id, String responseCode, HttpServletRequest request, HttpServletResponse response) {
        String check = id.split("-")[0];
        if (check.equals("EC")) {
            PaymentFactory paymentFactory = getPaymentMethod(Constant.PAY_PAYPAL);
            return paymentFactory.cancelPayment(id, null, response);
        } else if (responseCode != null) {
            PaymentFactory paymentFactory = getPaymentMethod(Constant.PAY_VNPAY);
            return paymentFactory.cancelPayment(id, responseCode, response);
        } else {
            getRoleCancelPayment(request);
            PaymentFactory paymentFactory = getPaymentMethod(Constant.PAY_COD);
            return paymentFactory.cancelPayment(id, null, response);
        }
    }

    private void getRoleCancelPayment(HttpServletRequest request) {
        String userId = jwtTokenUtil.getUserFromJWT(jwtTokenUtil.getJwtFromHeader(request)).getId();
        Optional<User> user = userRepository.findUserByIdAndState(userId, Constant.USER_ACTIVE);
        if (user.isEmpty() ||
                !(user.get().getRole().equals(Constant.ROLE_ADMIN) ))
            throw new AppException(HttpStatus.FORBIDDEN.value(), "You don't have permission!");
    }
}
