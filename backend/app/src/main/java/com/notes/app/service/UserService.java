package com.notes.app.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.Optional;
import com.notes.app.entity.User;
import com.notes.app.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) {
        if (!user.getPassword().equals(user.getConfirmPassword())) {
            throw new IllegalArgumentException("Passwords do not match!");
        }
        return userRepository.save(user);
    }

    public Optional<User> login(String username, String password) {
        Optional<User> userOpt = userRepository.findByUsername(username);
        if (userOpt.isPresent() && userOpt.get().getPassword().equals(password)) {
            return userOpt;
        }
        return Optional.empty();
    }

    // ------------------------------------------------------
    //  TEMPORARY getCurrentUser() until login session exists
    // ------------------------------------------------------
    public User getCurrentUser() {
        return userRepository.findById(1L)
                .orElseThrow(() -> new RuntimeException("User with ID 1 not found"));
    }

    // ------------------------------------------------------
    //  Save wallet address from Lace Wallet
    // ------------------------------------------------------
    public void updateWalletAddress(String address) {
        User user = getCurrentUser();
        user.setWalletAddress(address);
        user.setWalletLinked(true);
        userRepository.save(user);
    }
}