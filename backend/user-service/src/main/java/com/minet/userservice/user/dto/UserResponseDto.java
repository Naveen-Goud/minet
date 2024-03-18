package com.minet.userservice.user.dto;

import java.util.Map;

public class UserResponseDto {
    private UserDto user;
    private Map<String, String> token;

    public UserDto getUser() {
        return user;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }

    public Map<String, String> getToken() {
        return token;
    }

    public void setToken(Map<String, String> token) {
        this.token = token;
    }
}
