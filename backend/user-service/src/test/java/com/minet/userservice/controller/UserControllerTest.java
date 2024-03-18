package com.minet.userservice.controller;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.minet.userservice.user.controller.UserController;
import com.minet.userservice.user.dto.*;
import com.minet.userservice.user.exception.NotFoundException;
import com.minet.userservice.user.service.JwtGenerator;
import com.minet.userservice.user.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

 class UserControllerTest {

    @InjectMocks
    private UserController userController;

    @Mock
    private UserService userService;

    @Mock
    private JwtGenerator jwtGenerator;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
     void testLogin_Successful() throws NotFoundException {
        LoginDto loginDto = new LoginDto();
        loginDto.setEmail("naveen@gmail.com");
        loginDto.setPassword("naveen123@");

        UserDto userDto = new UserDto();
        userDto.setId(1L);
        userDto.setName("naveen");
        userDto.setEmail("naveen@example.com");

        Map<String, String> tokenMap = new HashMap<>();
        tokenMap.put("token", "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuYXZlZW5AZ21haWwuY29tIiwiaWF0IjoxNjkwOTU1NTgyfQ.C89rhphlm9xbErVCWAglvYmBkqQ4Minz1vwELQK86is");
        tokenMap.put("message", "Login Successful");

        when(userService.getUser(loginDto)).thenReturn(userDto);

        when(jwtGenerator.generateToken(userDto)).thenReturn(tokenMap);

        ResponseEntity<?> responseEntity = userController.login(loginDto);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        UserResponseDto responseDto = (UserResponseDto) responseEntity.getBody();
        assertEquals(userDto, responseDto.getUser());
        assertEquals(tokenMap, responseDto.getToken());
    }

    @Test
     void testLogin_InvalidCredentials() throws NotFoundException {
        LoginDto loginDto = new LoginDto();
        loginDto.setPassword("invalidPassword");

        when(userService.getUser(loginDto)).thenThrow(new IllegalArgumentException("Invalid credentials"));

        ResponseEntity<?> responseEntity = userController.login(loginDto);

        assertEquals(HttpStatus.UNAUTHORIZED, responseEntity.getStatusCode());
    }

    @Test
     void testLogin_UserNotFound() throws NotFoundException {
        LoginDto loginDto = new LoginDto();
        loginDto.setPassword("testPassword");

        when(userService.getUser(loginDto)).thenThrow(new NotFoundException("User not found"));

        ResponseEntity<?> responseEntity = userController.login(loginDto);

        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
    }

    @Test
     void testRegister_Successful() {
        SignupDto signupDto = new SignupDto();
        signupDto.setName("testUser");
        signupDto.setEmail("test@example.com");
        signupDto.setPassword("testPassword");

        UserDto createdUserDto = new UserDto();
        createdUserDto.setId(1L);
        createdUserDto.setName("testUser");
        createdUserDto.setEmail("test@example.com");

        Map<String, String> tokenMap = new HashMap<>();
        tokenMap.put("token", "mocked_jwt_token");
        tokenMap.put("message", "Registration successful");

        when(userService.createUser(signupDto)).thenReturn(createdUserDto);

        when(jwtGenerator.generateToken(createdUserDto)).thenReturn(tokenMap);

        ResponseEntity<UserResponseDto> responseEntity = userController.register(signupDto);

        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
        UserResponseDto responseDto = responseEntity.getBody();
        assertNotNull(responseDto);
        assertEquals(createdUserDto, responseDto.getUser());
        assertEquals(tokenMap, responseDto.getToken());
    }

    @Test
    void testRegister_Conflict() {
        SignupDto signupDto = new SignupDto();
        signupDto.setName("existingUser");
        signupDto.setEmail("existing@example.com");
        signupDto.setPassword("testPassword");

        when(userService.createUser(signupDto)).thenThrow(new IllegalArgumentException("Username or email already exists"));

        ResponseEntity<UserResponseDto> responseEntity = userController.register(signupDto);

        assertEquals(HttpStatus.CONFLICT, responseEntity.getStatusCode());
        assertNull(responseEntity.getBody());
    }
    @Test
     void testValidateToken_ValidToken() {
        String validToken = "mocked_valid_token";

        when(userService.validateToken(validToken)).thenReturn(true);

        ResponseEntity<?> responseEntity = userController.validateToken(validToken);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("Valid Request", responseEntity.getBody());
    }

    @Test
     void testValidateToken_InvalidToken() {
        String invalidToken = "mocked_invalid_token";

        when(userService.validateToken(invalidToken)).thenReturn(false);

        ResponseEntity<?> responseEntity = userController.validateToken(invalidToken);

        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
        assertEquals("Invalid Request", responseEntity.getBody());
    }

    @Test
      void testGetAllUsers_Successful() {
        // Mock user list
        List<UserDto> userList = new ArrayList<>();
        UserDto u1= new UserDto();
        u1.setName("user1");
        u1.setId(1L);
        u1.setEmail("user1@example.com");
        userList.add(u1);

        UserDto u2= new UserDto();
        u2.setName("user2");
        u2.setId(2L);
        u2.setEmail("user2@example.com");

        userList.add(u2);

        when(userService.getAllUsers()).thenReturn(userList);

        ResponseEntity<List<UserDto>> responseEntity = userController.getAllUsers();

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(userList, responseEntity.getBody());
    }

    @Test
      void testGetAllUsers_Exception() {
        when(userService.getAllUsers()).thenThrow(new RuntimeException("Failed to retrieve user details"));

        try {
            userController.getAllUsers();
        } catch (NotFoundException e) {
            assertEquals("Failed to retrieve user details", e.getMessage());
        }
    }

    @Test
      void testAuth0Register_Successful() {
        AuthDto authDto = new AuthDto();
        authDto.setEmail("test@example.com");
        authDto.setName("testUser");

        UserDto userDto = new UserDto();
        userDto.setId(1L);
        userDto.setName("testUser");
        userDto.setEmail("test@example.com");

        Map<String, String> tokenMap = new HashMap<>();
        tokenMap.put("token", "mocked_jwt_token");
        tokenMap.put("message", "Registration successful");

        when(userService.getUserDetailsFromToken(authDto)).thenReturn(userDto);

        when(jwtGenerator.generateToken(userDto)).thenReturn(tokenMap);

        ResponseEntity<UserResponseDto> responseEntity = userController.auth0Register(authDto);

        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
        UserResponseDto responseDto = responseEntity.getBody();
        assertNotNull(responseDto);
        assertEquals(userDto, responseDto.getUser());
        assertEquals(tokenMap, responseDto.getToken());
    }

}

