package com.example.demo.services;

import com.example.demo.model.User;
import java.util.Optional;

public interface UserService {
    User registerUser(User user);
    boolean authenticateUser(String email, String password);
}
