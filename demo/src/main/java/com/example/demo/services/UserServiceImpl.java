package com.example.demo.services;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User registerUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public boolean authenticateUser(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);
        
        // Check if the user exists and compare the password
        return user.isPresent() && user.get().getPassword().equals(password);
    }

    // ✅ Added missing method to fetch all users
    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
