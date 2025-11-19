package com.notes.app.controller;

import org.springframework.web.bind.annotation.*;

import com.notes.app.entity.User;
import com.notes.app.service.UserService;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.Map;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import java.util.Optional;
import org.springframework.web.bind.annotation.CrossOrigin;


@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.registerUser(user);
    }

    @PostMapping("/login")
    public String login(@RequestParam String username, @RequestParam String password) {
        Optional<User> userOpt = userService.login(username, password);
        if (userOpt.isPresent()) {
            return "Login successful! Welcome " + userOpt.get().getFirstName();
        }
        return "Invalid username or password!";
    }

    @PostMapping("/link-wallet")
public ResponseEntity<?> linkWallet(@RequestBody Map<String, String> body) {
    String address = body.get("walletAddress");
    userService.updateWalletAddress(address);
    return ResponseEntity.ok(Map.of("status", "wallet linked"));
}
}
