package com.minet.walletservice.controller;
import com.minet.walletservice.dto.*;
import com.minet.walletservice.entity.WalletEntity;
import com.minet.walletservice.exceptions.UserNotFoundException;
import com.minet.walletservice.service.WalletService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.server.ResponseStatusException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import static org.assertj.core.api.Fail.fail;
import static org.junit.Assert.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class WalletControllerTest {
    @Mock
    private WalletService walletService;
    @InjectMocks
    private WalletController walletController;
    @Test
    public void testGetWalletDetails_ValidUserId() {
        int userId = 789;
        List<UserWalletDTO> expectedUserWalletDTOs = new ArrayList<>();
        UserWalletDTO userWalletDTO1 = new UserWalletDTO();
        userWalletDTO1.setWalletId(1);
        userWalletDTO1.setCoinId(1);
        expectedUserWalletDTOs.add(userWalletDTO1);

        UserWalletDTO userWalletDTO2 = new UserWalletDTO();
        userWalletDTO2.setWalletId(2);
        userWalletDTO2.setCoinId(2);
        expectedUserWalletDTOs.add(userWalletDTO2);

        when(walletService.userWalletDetails(anyInt())).thenReturn(expectedUserWalletDTOs);

        List<UserWalletDTO> userWalletDTOs = walletController.getWalletDetails(userId);

        assertEquals(expectedUserWalletDTOs, userWalletDTOs);
        verify(walletService, times(1)).userWalletDetails(userId);
    }

    @Test
    public void testGetWalletDetails_InvalidUserId() {
        int coinId = -1;

        when(walletService.userWalletDetails(coinId)).thenThrow(new UserNotFoundException("User not found with userId: " + coinId, HttpStatus.NOT_FOUND));

        assertThrows(UserNotFoundException.class, () -> walletController.getWalletDetails(coinId));
    }
    @Test
    public void testPostWalletData_Success() {
        WalletRequestDto requestDto = new WalletRequestDto();
        requestDto.setUserId(456);
        requestDto.setCoinId(1);
        requestDto.setAmount(100.0);

        WalletEntity walletEntity = new WalletEntity();
        walletEntity.setUserId(456);
        walletEntity.setCoinId(1);
        walletEntity.setBalance(100.0);

        WalletResponceDto expectedResponse = new WalletResponceDto();
        expectedResponse.setId(1);
        expectedResponse.setUserId(456);
        expectedResponse.setCoinId(1);
        expectedResponse.setAmount(100.0);

        when(walletService.createData(any(WalletRequestDto.class))).thenReturn(expectedResponse);

        WalletResponceDto actualResponse = walletController.postWalletData(requestDto);

        assertEquals(expectedResponse, actualResponse);
        verify(walletService, times(1)).createData(any(WalletRequestDto.class));
    }
    @Test
    public void testUserWallet() {
        int walletId = 1;
        WalletIDRequestDto walletIDRequestDto = new WalletIDRequestDto( );
        WalletIDResponseDto expectedResponse = new WalletIDResponseDto( );
        when(walletService.findWalletById(eq(walletId), any(WalletIDRequestDto.class))).thenReturn(expectedResponse);
        ResponseEntity<WalletIDResponseDto> actualResponse = walletController.userWallet(walletId, walletIDRequestDto);
        assertEquals(HttpStatus.OK, actualResponse.getStatusCode());
        assertEquals(expectedResponse, actualResponse.getBody());
    }
    @Test
    public  void testGetWalletDetails() {
        int userId = 1;
        List<UserWalletDTO> expectedResponse = Arrays.asList( );
        when(walletService.userWalletDetails(userId)).thenReturn(expectedResponse);
        List<UserWalletDTO> actualResponse = walletController.getWalletDetails(userId);
        assertEquals(expectedResponse, actualResponse);
    }
    @Test
    public void testUserNotFoundException() {
        int walletId = 1;
        WalletIDRequestDto walletIDRequestDto = new WalletIDRequestDto( );

        when(walletService.findWalletById(eq(walletId), any(WalletIDRequestDto.class)))
                .thenThrow(new UserNotFoundException("User not found for walletId: " + walletId, HttpStatus.NOT_FOUND));

        assertThrows(UserNotFoundException.class, () -> walletController.userWallet(walletId, walletIDRequestDto));
    }
    @Test
    public void testPostWalletData_UserNotFoundException() {
        WalletRequestDto walletRequestDto = new WalletRequestDto();
        walletRequestDto.setUserId(1);
        walletRequestDto.setCoinId(1);
        walletRequestDto.setAmount(100);

        Mockito.when(walletService.createData(walletRequestDto)).thenThrow(new UserNotFoundException("User not found with the id", HttpStatus.NOT_FOUND));

        try {
            walletController.postWalletData(walletRequestDto);
            fail("Expected ResponseStatusException to be thrown");
        } catch (ResponseStatusException ex) {
            assertEquals(HttpStatus.NO_CONTENT, ex.getStatus());
            assertEquals("User not found with the id", ex.getReason());
        }
    }

}
