package com.minet.userservice.user.service;


import com.minet.userservice.user.dto.UserDto;

import java.util.Map;

public interface JwtGenerator {
    Map<String, String> generateToken(UserDto userDto);
}
