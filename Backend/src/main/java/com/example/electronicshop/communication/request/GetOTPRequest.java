package com.example.electronicshop.communication.request;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.Size;

@Data
@NoArgsConstructor
public class GetOTPRequest {

    private String otp;
    @Size( min = 5, max = 50)
    @Email(message = "Email invalidate")
    private String email;
    private String type;
}
