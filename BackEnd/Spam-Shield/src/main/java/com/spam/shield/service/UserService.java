package com.spam.shield.service;

import java.util.List;

import com.spam.shield.dto.request.UserRequest;
import com.spam.shield.dto.response.UserResponse;

public interface UserService {

    List<UserResponse> getAllUsers();

    UserResponse getUser(Long uid);

    UserResponse updateUser(UserRequest request, Long uid);

    boolean deleteProduct(Long uid);

    List<UserResponse> getAllUsersWithDetails();
}
