package com.minet.userservice.user.service;


import com.minet.userservice.user.dto.AuthDto;
import com.minet.userservice.user.dto.LoginDto;
import com.minet.userservice.user.dto.SignupDto;
import com.minet.userservice.user.dto.UserDto;

import java.util.List;

public interface UserService {

    UserDto getUser(LoginDto loginDto);

    UserDto createUser(SignupDto signupDto);

    boolean validateToken(String token);

    List<UserDto> getAllUsers();
    public UserDto  getUserDetailsFromToken(AuthDto authDto);
}
