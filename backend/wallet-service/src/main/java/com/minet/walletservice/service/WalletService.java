package com.minet.walletservice.service;
import com.minet.walletservice.dto.*;
import java.util.List;

public interface WalletService {


    WalletIDResponseDto findWalletById(int walletId, WalletIDRequestDto walletIDRequestDto);
    WalletResponceDto createData(WalletRequestDto walletBody);

    List<UserWalletDTO> userWalletDetails(int userId);

    List<PortfolioResponseDto>  findPortfolioDetails(int userId);
}
