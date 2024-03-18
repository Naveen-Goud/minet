package com.minet.userservice.service;


import com.minet.userservice.user.dto.AuthDto;
import com.minet.userservice.user.dto.LoginDto;
import com.minet.userservice.user.dto.SignupDto;
import com.minet.userservice.user.dto.UserDto;
import com.minet.userservice.user.entity.User;
import com.minet.userservice.user.exception.NotFoundException;
import com.minet.userservice.user.repository.UserRepository;
import com.minet.userservice.user.service.JwtGeneratorImpl;
import com.minet.userservice.user.service.UserServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.when;

class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtGeneratorImpl jwtGenerator;

    @InjectMocks
    private UserServiceImpl userService;

    private User testUser;
    private LoginDto testLoginDto;
    private SignupDto testSignupDto;
    private AuthDto testAuthDto;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);

        // Initialize a test user
        testUser = new User();
        testUser.setId(1L);
        testUser.setName("Test User");
        testUser.setEmail("test@example.com");
        testUser.setPassword("hashed_password");

        // Initialize test DTOs
        testLoginDto = new LoginDto();
        testLoginDto.setEmail("test@example.com");
        testLoginDto.setPassword("test_password");

        testSignupDto = new SignupDto();
        testSignupDto.setName("Test User");
        testSignupDto.setEmail("test@example.com");
        testSignupDto.setPassword("test_password");

        testAuthDto = new AuthDto();
        testAuthDto.setName("Test User");
        testAuthDto.setEmail("test@example.com");
    }

    @Test
    void getUser_ValidCredentials_ShouldReturnUserDto() {


        LoginDto loginDto= new LoginDto();
        loginDto.setEmail("naveen@gmail.com");
        loginDto.setPassword("naveen123@");

        String encodedPassword= "$2a$10$gAQcvRVGLzXr9vBMQhKLr.Kn7r0BfEH6e.nITWqUzElRLw85yxo/u";

        User user= new User();
        user.setId(1L);
        user.setEmail("naveen@gmail.com");
        user.setName("naveen");
        user.setPassword(encodedPassword);

        UserDto expectedUser= new UserDto();
        expectedUser.setId(1L);
        expectedUser.setEmail("naveen@gmail.com");
        expectedUser.setName("naveen");

        when(userRepository.findByEmail(loginDto.getEmail())).thenReturn(Optional.of(user));
        when(passwordEncoder.matches(loginDto.getPassword(), user.getPassword())).thenReturn(true);

        UserDto resultUserDto = userService.getUser(loginDto);

        assertNotNull(resultUserDto);
        assertEquals(expectedUser.getId(), resultUserDto.getId());
        assertEquals(expectedUser.getName(), resultUserDto.getName());
        assertEquals(expectedUser.getEmail(), resultUserDto.getEmail());
    }

    @Test
    void getUser_InvalidPassword_ShouldThrowIllegalArgumentException() {
        LoginDto loginDto= new LoginDto();
        loginDto.setEmail("naveen@gmail.com");
        loginDto.setPassword("naveen123@");

        String encodedPassword= "$ITWqUzElRLw85yxo/u";

        User user= new User();
        user.setId(1L);
        user.setEmail("naveen@gmail.com");
        user.setName("naveen");
        user.setPassword(encodedPassword);

        when(userRepository.findByEmail(loginDto.getEmail())).thenReturn(Optional.of(user));
        when(passwordEncoder.matches(loginDto.getPassword(), user.getPassword())).thenReturn(false);


        NotFoundException exception = assertThrows(NotFoundException.class, () -> userService.getUser(loginDto));
        assertEquals("User Not Found", exception.getMessage());

    }

    @Test
    void getUser_UserNotFound_ShouldThrowNotFoundException() {
        when(userRepository.findByEmail(testLoginDto.getEmail())).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () -> userService.getUser(testLoginDto));
    }

    @Test
    void createUser_NewUser_ShouldReturnUserDto() {


        when(userRepository.findByEmail(testSignupDto.getEmail())).thenReturn(Optional.empty());
        when(userRepository.save(any(User.class))).thenReturn(testUser);

        UserDto userDto = userService.createUser(testSignupDto);

        assertNotNull(userDto);
        assertEquals(testUser.getId(), userDto.getId());
        assertEquals(testUser.getName(), userDto.getName());
        assertEquals(testUser.getEmail(), userDto.getEmail());
    }

    @Test
    void createUser_UserAlreadyExists_ShouldThrowIllegalArgumentException() {
        when(userRepository.findByEmail(testSignupDto.getEmail())).thenReturn(Optional.of(testUser));

        assertThrows(IllegalArgumentException.class, () -> userService.createUser(testSignupDto));
    }

    @Test
    void getAllUsers_ShouldReturnListOfUserDtos() {

        List<User> userList = new ArrayList<>();
        userList.add(testUser);
        when(userRepository.findAll()).thenReturn(userList);

        List<UserDto> userDtoList = userService.getAllUsers();

        assertNotNull(userDtoList);
        assertEquals(1, userDtoList.size());

        UserDto userDto = userDtoList.get(0);
        assertEquals(testUser.getId(), userDto.getId());
        assertEquals(testUser.getName(), userDto.getName());
        assertEquals(testUser.getEmail(), userDto.getEmail());
    }

    @Test
    void testValidateToken_ValidToken_ReturnsTrue() {
        String validToken = "valid-token";
        when(jwtGenerator.validateToken(validToken)).thenReturn(true);

        boolean result = userService.validateToken(validToken);

        assertTrue(result);

    }

    @Test
    void testGetUserDetailsFromToken_ExistingUser_ReturnsUserDto() {
        // Arrange
        AuthDto authDto = new AuthDto();
        authDto.setEmail( "john@example.com");
        authDto.setName("John Doe");

        User existingUser = new User();
        existingUser.setId(1L);
        existingUser.setName("John Doe");
        existingUser.setEmail("john@example.com");

        when(userRepository.findByEmail(authDto.getEmail())).thenReturn(Optional.of(existingUser));

        // Act
        UserDto resultUserDto = userService.getUserDetailsFromToken(authDto);

        // Assert
        assertNotNull(resultUserDto);
        assertEquals(existingUser.getId(), resultUserDto.getId());
        assertEquals(existingUser.getName(), resultUserDto.getName());
        assertEquals(existingUser.getEmail(), resultUserDto.getEmail());

    }

    @Test
    void testGetUserDetailsFromToken_NewUser_ReturnsUserDto() {
        AuthDto authDto = new AuthDto();
        authDto.setName("Jane Doe");
        authDto.setEmail("jane@example.com");

        when(userRepository.findByEmail(authDto.getEmail())).thenReturn(Optional.empty());

        UserDto resultUserDto = userService.getUserDetailsFromToken(authDto);

        assertNotNull(resultUserDto);
        assertEquals(authDto.getName(), resultUserDto.getName());
        assertEquals(authDto.getEmail(), resultUserDto.getEmail());

    }

    @Test
    void testGetUserDetailsFromToken_UserRepositoryThrowsException_ThrowsNotFoundException() {
        // Arrange
        AuthDto authDto = new AuthDto();
        authDto.setEmail( "john@example.com");
        authDto.setName("John Doe");

        String errorMessage = "Some database error";

        when(userRepository.findByEmail(authDto.getEmail())).thenThrow(new RuntimeException(errorMessage));

        // Act & Assert
        NotFoundException exception = assertThrows(NotFoundException.class, () -> userService.getUserDetailsFromToken(authDto));
        assertEquals(errorMessage, exception.getMessage());

    }


}
