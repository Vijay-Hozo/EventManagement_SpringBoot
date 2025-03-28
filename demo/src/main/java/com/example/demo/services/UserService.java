package com.example.demo.services;

import com.example.demo.model.User;
import java.util.List;
import java.util.Optional;

public interface UserService {
    User registerUser(User user);
    Optional<User> getUserByEmail(String email);
    boolean authenticateUser(String email, String password);
    List<User> getAllUsers();
}
