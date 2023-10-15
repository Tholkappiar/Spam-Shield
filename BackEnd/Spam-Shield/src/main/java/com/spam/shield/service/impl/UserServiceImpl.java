package com.spam.shield.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import com.spam.shield.repository.UserRepository;
import com.spam.shield.service.UserService;
import org.springframework.stereotype.Service;

import com.spam.shield.dto.request.UserRequest;
import com.spam.shield.dto.response.UserResponse;
import com.spam.shield.model.User;
import com.spam.shield.model.enumerate.Role;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder; // Import PasswordEncoder

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder; // Inject PasswordEncoder

    @Override
    public List<UserResponse> getAllUsers() {
        List<User> userList = userRepository.findAll();
        return userList.stream()
                .filter(user -> !user.getRole().equals(Role.ADMIN))
                .map(this::mapUserToUserResponse)
                .collect(Collectors.toList());
    }

    @Override
    public UserResponse getUser(Long uid) {
        User user = userRepository.findByUid(uid);
        return mapUserToUserResponse(user);
    }

    @Override
    public UserResponse updateUser(UserRequest request, Long uid) {
        User user = userRepository.findByUid(uid);

        if (user != null) {
            // Update the existing user's attributes with the new values
            user.setName(request.getName());
            user.setEmail(request.getEmail());
            user.setPassword(passwordEncoder.encode(request.getPassword())); // Encode the new password
            user.setRole(request.getRole());

            // Save the updated user to the repository
            userRepository.save(user);
        }

        assert user != null;
        return mapUserToUserResponse(user);
    }

    @Override
    public boolean deleteProduct(Long uid) {
        User user = userRepository.findByUid(uid);

        if (user != null) {
            userRepository.deleteByUid(uid);
            return true;
        } else {
            return false;
        }
    }

    private UserResponse mapUserToUserResponse(User user) {
        return UserResponse.builder()
                .uid(user.getUid())
                .name(user.getName())
                .email(user.getEmail())
                .password(user.getPassword()) // Return the hashed password
                .role(user.getRole())
                .build();
    }

    // change
    public List<UserResponse> getAllUsersWithDetails() {
        List<User> userList = userRepository.findAll();
        return userList.stream()
                .filter(user -> user.getRole() != null && !user.getRole().equals(Role.ADMIN))
                .map(this::mapUserToUserResponseWithDetails)
                .collect(Collectors.toList());
    }

    private UserResponse mapUserToUserResponseWithDetails(User user) {
        return UserResponse.builder()
                .uid(user.getUid())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .password(user.getPassword()) // Include the hashed password here
                .build();
    }
}
