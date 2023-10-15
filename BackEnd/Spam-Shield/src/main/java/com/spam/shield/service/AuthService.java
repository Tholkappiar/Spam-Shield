package com.spam.shield.service;

import com.spam.shield.dto.request.AuthenticationRequest;
import com.spam.shield.dto.request.RegisterRequest;
import com.spam.shield.dto.response.AuthenticationResponse;

public interface AuthService {
    boolean userRegistration(RegisterRequest request);

    AuthenticationResponse userAuthentication(AuthenticationRequest request);
}
