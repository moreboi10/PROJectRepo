
package com.ikaansh.product_management.dto;

import com.ikaansh.product_management.entity.Role;

import java.time.LocalDateTime;

public record UserResponse(
        Long id,
        String name,
        String email,
        Role role,
        LocalDateTime createdAt
) {}
