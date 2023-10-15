package com.spam.shield.controller;

import java.util.List;

import com.spam.shield.constant.Api;
import com.spam.shield.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.spam.shield.dto.request.UserRequest;
import com.spam.shield.dto.response.UserResponse;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;



@RestController
@RequestMapping(Api.USER)
@RequiredArgsConstructor
@Tag(name = "User")
public class UserController {

    private final UserService userService;

    @GetMapping("/all")
    public ResponseEntity<List<UserResponse>> getAllUsers() {
        List<UserResponse> userList = userService.getAllUsers();
        return !userList.isEmpty() ? ResponseEntity.ok().body(userList) : ResponseEntity.noContent().build();
    }

    @GetMapping("/{uid}")
    public ResponseEntity<UserResponse> getUser(@PathVariable Long uid) {
        UserResponse userResponse = userService.getUser(uid);
        return userResponse != null ? ResponseEntity.ok().body(userResponse) : ResponseEntity.notFound().build();
    }

    @PutMapping("/update/{uid}")
    public ResponseEntity<UserResponse> updateUser(@RequestBody UserRequest request, @PathVariable Long uid) {
        UserResponse userResponse = userService.updateUser(request, uid);
        return userResponse != null ? ResponseEntity.ok().body(userResponse) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delete/{uid}")
    public ResponseEntity<String> deleteUser(@PathVariable Long uid) {
        boolean isDeleted = userService.deleteProduct(uid);
        return isDeleted ? ResponseEntity.ok().body("User deleted successfully!")
                : ResponseEntity.notFound().build();
    }


    // change
    @GetMapping("/alldetails")
    public ResponseEntity<List<UserResponse>> getAllUsersWithDetails() {
        // Add authentication and authorization checks here
        // Ensure that only authorized users can access this endpoint
        List<UserResponse> userListWithDetails = userService.getAllUsersWithDetails();
        return !userListWithDetails.isEmpty() ? ResponseEntity.ok().body(userListWithDetails) : ResponseEntity.noContent().build();
    }
}
