
package com.ikaansh.product_management.controller;

import com.fasterxml.jackson.databind.json.JsonMapper;
import com.ikaansh.product_management.dto.AuthResponse;
import com.ikaansh.product_management.dto.LoginRequest;
import com.ikaansh.product_management.dto.RegisterRequest;
import com.ikaansh.product_management.dto.UserResponse;
import com.ikaansh.product_management.entity.Role;
import com.ikaansh.product_management.security.CustomUserDetailsService;
import com.ikaansh.product_management.security.JwtService;
import com.ikaansh.product_management.service.AuthService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AuthController.class)
@AutoConfigureMockMvc(addFilters = false)
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private AuthService authService;

    @MockitoBean
    private JwtService jwtService;

    @MockitoBean
    private CustomUserDetailsService customUserDetailsService;

    private String toJson(Object object) throws Exception {
        return JsonMapper.builder()
                .build()
                .writeValueAsString(object);
    }

    @Test
    void registerShouldReturnCreated() throws Exception {
        RegisterRequest request = new RegisterRequest(
                "Test User",
                "test@example.com",
                "password123"
        );

        UserResponse user = new UserResponse(
                1L,
                "Test User",
                "test@example.com",
                Role.USER,
                LocalDateTime.now()
        );

        AuthResponse response = new AuthResponse("test-jwt-token", user);

        when(authService.register(any(RegisterRequest.class)))
                .thenReturn(response);

        mockMvc.perform(post("/api/v1/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(toJson(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.token").value("test-jwt-token"));
    }

    @Test
    void loginShouldReturnOk() throws Exception {
        LoginRequest request = new LoginRequest(
                "test@example.com",
                "password123"
        );

        UserResponse user = new UserResponse(
                1L,
                "Test User",
                "test@example.com",
                Role.USER,
                LocalDateTime.now()
        );

        AuthResponse response = new AuthResponse("test-jwt-token", user);

        when(authService.login(any(LoginRequest.class)))
                .thenReturn(response);

        mockMvc.perform(post("/api/v1/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(toJson(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").value("test-jwt-token"));
    }
}
