
package com.ikaansh.product_management.service;

import com.ikaansh.product_management.dto.AuthResponse;
import com.ikaansh.product_management.dto.LoginRequest;
import com.ikaansh.product_management.dto.RegisterRequest;
import com.ikaansh.product_management.entity.Role;
import com.ikaansh.product_management.entity.User;
import com.ikaansh.product_management.repository.UserRepository;
import com.ikaansh.product_management.security.CustomUserDetailsService;
import com.ikaansh.product_management.security.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JwtService jwtService;

    @Mock
    private CustomUserDetailsService userDetailsService;

    @InjectMocks
    private AuthService authService;

    private User user;
    private UserDetails userDetails;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(1L);
        user.setName("Test User");
        user.setEmail("test@example.com");
        user.setPasswordHash("hashed-password");
        user.setRole(Role.USER);

        userDetails = org.springframework.security.core.userdetails.User
                .withUsername("test@example.com")
                .password("hashed-password")
                .roles("USER")
                .build();
    }

    @Test
    void registerCreatesUserAndReturnsToken() {
        RegisterRequest request = new RegisterRequest(
                "Test User", "test@example.com", "StrongPass123");

        when(userRepository.existsByEmail("test@example.com"))
                .thenReturn(false);
        when(passwordEncoder.encode("StrongPass123"))
                .thenReturn("hashed-password");
        when(userRepository.save(any(User.class))).thenReturn(user);
        when(userDetailsService.loadUserByUsername("test@example.com"))
                .thenReturn(userDetails);
        when(jwtService.generateToken(userDetails)).thenReturn("test-token");

        AuthResponse response = authService.register(request);

        assertEquals("test-token", response.token());
        assertEquals("test@example.com", response.user().email());
        verify(passwordEncoder).encode("StrongPass123");
        verify(userRepository).save(any(User.class));
    }

    @Test
    void loginAuthenticatesUserAndReturnsToken() {
        LoginRequest request = new LoginRequest(
                "test@example.com", "StrongPass123");

        when(authenticationManager.authenticate(any(
                UsernamePasswordAuthenticationToken.class)))
                .thenReturn(new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities()));
        when(userRepository.findByEmail("test@example.com"))
                .thenReturn(Optional.of(user));
        when(jwtService.generateToken(userDetails)).thenReturn("test-token");

        AuthResponse response = authService.login(request);

        assertEquals("test-token", response.token());
        assertEquals("test@example.com", response.user().email());
        verify(authenticationManager).authenticate(any(
                UsernamePasswordAuthenticationToken.class));
    }
}
