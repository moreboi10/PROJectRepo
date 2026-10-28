
package com.ikaansh.product_management.dto;

public record AuthResponse(
        String token,
        UserResponse user
) {}
