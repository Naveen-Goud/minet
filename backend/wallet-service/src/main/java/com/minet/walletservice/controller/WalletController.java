package com.minet.walletservice.controller;
import com.minet.walletservice.dto.*;
import com.minet.walletservice.exceptions.UserNotFoundException;
import com.minet.walletservice.service.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;

@RestController
@RequestMapping("/wallets")
public class WalletController {
    @Autowired
    private WalletService walletService;
    @PostMapping("/")
    public WalletResponceDto postWalletData(@RequestBody WalletRequestDto walletBody){
        try{
            return walletService.createData(walletBody);
        }catch (UserNotFoundException e){
            throw  new ResponseStatusException(HttpStatus.NO_CONTENT,"User not found with the id");
        }
    }
    @PatchMapping("/")
    public ResponseEntity<WalletIDResponseDto> userWallet(@RequestParam(value = "walletId", required = true) int walletId , @RequestBody WalletIDRequestDto walletIDRequestDto){
        try{
            return ResponseEntity.ok(walletService.findWalletById(walletId,walletIDRequestDto));
        }catch (UserNotFoundException e){
            String errorMessage = "User not found for walletId: " + walletId;
             throw  new UserNotFoundException(errorMessage,HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/")
    public List<UserWalletDTO> getWalletDetails( @RequestParam(value = "userId", required = true) int userId  ){
        try{
            return walletService.userWalletDetails(userId);
        }catch (UserNotFoundException e){
            throw new UserNotFoundException(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
