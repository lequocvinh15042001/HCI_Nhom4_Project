package com.example.electronicshop.service.paypalpayment;

import com.example.electronicshop.config.Constant;
import com.example.electronicshop.config.PaypalIntent;
import com.example.electronicshop.config.PaypalMethod;
import com.example.electronicshop.models.ResponseObject;
import com.example.electronicshop.models.enity.Order;
import com.example.electronicshop.notification.AppException;
import com.example.electronicshop.repository.OrderRepository;
import com.example.electronicshop.utils.MoneyUtils;
import com.example.electronicshop.utils.StringUtils;
import com.paypal.api.payments.*;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;
import lombok.AllArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;

@Service
@AllArgsConstructor
@Slf4j
public class PaypalService extends  PaymentFactory{
    public static final String URL_PAYPAL_SUCCESS = "/api/checkout/paypal/success";
    public static final String URL_PAYPAL_CANCEL = "/api/checkout/paypal/cancel";
    public static final String PATTERN = "&token=";

    private APIContext apiContext;
    private PaymentUtils paymentUtils;
    private final OrderRepository orderRepository;

    @Override
    @Transactional
    public ResponseEntity<?> createPayment(HttpServletRequest request, Order order) {
        String cancelUrl = StringUtils.getBaseURL(request) + URL_PAYPAL_CANCEL;
        String successUrl = StringUtils.getBaseURL(request) + URL_PAYPAL_SUCCESS;
        try {
            Payment payment = createPayPalPayment(
                    order,
                    "USD",
                    PaypalMethod.paypal,
                    PaypalIntent.sale,
                    "Thanh toan hoa don "+ order.getId(),
                    cancelUrl,
                    successUrl);
            for (Links links : payment.getLinks()) {
                if (links.getRel().equals("approval_url")) {
                    String checkUpdateQuantityProduct = paymentUtils.checkingUpdateQuantityProduct(order, true);
                  if (checkUpdateQuantityProduct == null) {
                        Map<String, Object> params = new HashMap<>();
                        if (!payment.getTransactions().isEmpty())
                            params.put("amount", payment.getTransactions().get(0).getAmount());
                        order.getPaymentDetail().setPaymentInfo(params);
                        order.getPaymentDetail().setPaymentId(payment.getId());
                        order.getPaymentDetail().setPaymentToken((links.getHref().split(PATTERN)[1]));
                        order.getPaymentDetail().getPaymentInfo().put("isPaid", false);
                        order.setCreatedDate(LocalDateTime.now());
                        orderRepository.save(order);
                        return ResponseEntity.status(HttpStatus.OK).body(
                                new ResponseObject("true", "Payment init complete", links.getHref()));
                    }
                }
           }
        } catch (PayPalRESTException | IOException e) {
            throw new AppException(HttpStatus.EXPECTATION_FAILED.value(), e.getMessage());
        }
        return null;
    }

    @SneakyThrows
    @Override
    public ResponseEntity<?> executePayment(String paymentId, String payerId, String responseCode, String id, HttpServletRequest request, HttpServletResponse response) {
        try {
            Payment payment= execute(paymentId, payerId);
            if (payment.getState().equals("approved")) {
                String paymentToken = "EC-" + payment.getCart();
                Optional<Order> order = orderRepository.findOrderByPaymentDetail_PaymentTokenAndState(
                        paymentToken, Constant.ORDER_STATE_PROCESS);
                if (order.isPresent()) {
                    order.get().getPaymentDetail().getPaymentInfo().put("payer", payment.getPayer().getPayerInfo());
                    order.get().getPaymentDetail().getPaymentInfo().put("paymentMethod", payment.getPayer().getPaymentMethod());
                    order.get().getPaymentDetail().getPaymentInfo().put("isPaid", true);
                    order.get().setState(Constant.ORDER_STATE_PENDINGPAY);
                    orderRepository.save(order.get());
                }
                response.sendRedirect(PaymentService.CLIENT_REDIRECT + "true&cancel=false");
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject("true", "Payment with Paypal complete", "")
                );
            }
        } catch (PayPalRESTException e) {
            log.error(e.getMessage());
        }
        response.sendRedirect(PaymentService.CLIENT_REDIRECT + "true&cancel=false");
        return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(
                new ResponseObject("false", "Payment with Paypal failed", "")
        );
    }

    @SneakyThrows
    @Override
    public ResponseEntity<?> cancelPayment(String id, String responseCode, HttpServletResponse response) {
        Optional<Order> order = orderRepository.findOrderByPaymentDetail_PaymentTokenAndState(id,
                Constant.ORDER_STATE_PROCESS);
        if (order.isPresent()) {
            order.get().setState(Constant.ORDER_STATE_CANCEL);
            orderRepository.save(order.get());
            String checkUpdateQuantityProduct = paymentUtils.checkingUpdateQuantityProduct(order.get(), false);
            if (checkUpdateQuantityProduct == null) {
                response.sendRedirect(PaymentService.CLIENT_REDIRECT + "true&cancel=true");
                return ResponseEntity.status(HttpStatus.OK).body(
                        new ResponseObject("true", "Cancel payment with Paypal complete", "")
                );
           }
        }
        response.sendRedirect(PaymentService.CLIENT_REDIRECT + "false&cancel=true");
        return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(
                new ResponseObject("false", "Cancel payment with Paypal failed", "")
        );
    }

    public Payment createPayPalPayment(Order order, String currency, PaypalMethod method,
                                       PaypalIntent intent, String description, String cancelUrl,
                                       String successUrl) throws PayPalRESTException, IOException {
        double total = MoneyUtils.exchange(order.getTotalPrice());
        Amount amount = new Amount(currency, String.format("%.2f", total));

        Transaction transaction = new Transaction();
        transaction.setDescription(description);
        transaction.setAmount(amount);

        List<Transaction> transactions = new ArrayList<>();
        transactions.add(transaction);

        Payer payer = new Payer();
        payer.setPaymentMethod(method.toString());

        Payment payment = new Payment(intent.toString(),payer);
        payment.setTransactions(transactions);
        RedirectUrls redirectUrls = new RedirectUrls();
        redirectUrls.setCancelUrl(cancelUrl);
        redirectUrls.setReturnUrl(successUrl);
        payment.setRedirectUrls(redirectUrls);
        apiContext.setMaskRequestId(true);
        return payment.create(apiContext);
    }

    public Payment execute(String paymentId, String payerId) throws PayPalRESTException {
        Payment payment = new Payment();
        payment.setId(paymentId);
        PaymentExecution paymentExecute = new PaymentExecution();
        paymentExecute.setPayerId(payerId);
        return payment.execute(apiContext, paymentExecute);
    }
}
