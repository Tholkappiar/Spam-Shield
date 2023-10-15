package com.spam.shield.controller;

import com.spam.shield.constant.Api;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.spam.shield.dto.request.AuthenticationRequest;
import com.spam.shield.dto.request.RegisterRequest;
import com.spam.shield.dto.response.AuthenticationResponse;
import com.spam.shield.service.AuthService;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping(Api.AUTH)
@RequiredArgsConstructor
@Tag(name = "Authentication")

public class AuthenticationController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        boolean isRegistered = authService.userRegistration(request);
        return isRegistered ? ResponseEntity.ok("User registered successfully")
                : ResponseEntity.badRequest().body("Something went wrong!");
    }
    
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(authService.userAuthentication(request));
    }
}
