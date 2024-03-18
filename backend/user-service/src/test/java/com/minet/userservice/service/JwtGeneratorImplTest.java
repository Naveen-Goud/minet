package com.minet.userservice.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.minet.userservice.user.dto.UserDto;
import com.minet.userservice.user.service.JwtGeneratorImpl;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.DefaultClaims;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

 class JwtGeneratorImplTest {

    @InjectMocks
    private JwtGeneratorImpl jwtGenerator;

    @Mock
    private JwtGeneratorImpl jwtGeneratorSpy;

    private final String mockSecret = "5367566B59703373367639792F423F4528482B4D6251655468576D5A71347437";
    private final String mockMessage = "Login Successful";

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        jwtGenerator.secret = mockSecret;
        jwtGenerator.message = mockMessage;
    }

    @Test
     void testGenerateToken() {
        UserDto userDto = new UserDto();
        userDto.setEmail("naveen@example.com");

        String expectedToken = "eeyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuYXZlZW5AZ21haWwuY29tIiwiaWF0IjoxNjkwOTU1NTgyfQ.C89rhphlm9xbErVCWAglvYmBkqQ4Minz1vwELQK86is";

        when(jwtGeneratorSpy.getSignKey()).thenReturn(jwtGenerator.getSignKey());
        when(jwtGeneratorSpy.generateToken(any(UserDto.class))).thenCallRealMethod();

        Map<String, String> result = jwtGenerator.generateToken(userDto);

        assertEquals(mockMessage, result.get("message"));
    }

    @Test
     void testValidateToken_ValidToken() {
        String validToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuYXZlZW5AZ21haWwuY29tIiwiaWF0IjoxNjkwOTU1NTgyfQ.C89rhphlm9xbErVCWAglvYmBkqQ4Minz1vwELQK86is";

        when(jwtGeneratorSpy.getSignKey()).thenReturn(jwtGenerator.getSignKey());
        when(jwtGeneratorSpy.validateToken(anyString())).thenCallRealMethod();

        boolean result = jwtGenerator.validateToken(validToken);

        assertTrue(result);
    }

    @Test
     void testValidateToken_Exception() {
        // Mock token
        String token = "invalid_token";

        when(jwtGeneratorSpy.getSignKey()).thenReturn(jwtGenerator.getSignKey());
        when(jwtGeneratorSpy.validateToken(anyString())).thenCallRealMethod();

        boolean result = jwtGenerator.validateToken(token);

        assertFalse(result);
    }


}
