package com.minet.walletservice.service;
import com.minet.walletservice.dto.*;
import com.minet.walletservice.entity.Coin;
import com.minet.walletservice.entity.Coins;
import com.minet.walletservice.entity.User;
import com.minet.walletservice.entity.WalletEntity;
import com.minet.walletservice.repository.CoinRepository;
import com.minet.walletservice.repository.MinetRepository;
import com.minet.walletservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public  class WalletServicesImpl implements WalletService {
    @Autowired
    MinetRepository minetRepository;
    @Autowired
    CoinRepository coinRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    RestTemplate restTemplate;
    @Override
    public WalletIDResponseDto findWalletById(int walletId, WalletIDRequestDto walletIDRequestDto) {
        Optional<WalletEntity> walletEntityOpt = minetRepository.findById(walletId);
        if (walletEntityOpt.isPresent()) {
            WalletEntity walletEntity = walletEntityOpt.get();
            WalletIDResponseDto walletIDResponseDto = new WalletIDResponseDto();

            walletIDResponseDto.setId(walletEntity.getId());
            walletIDResponseDto.setCoinId(walletEntity.getCoinId());
            walletIDResponseDto.setAmount(walletEntity.getBalance() + walletIDRequestDto.getAmount());

            walletEntity.setBalance(walletIDResponseDto.getAmount());
            minetRepository.save(walletEntity);
            return walletIDResponseDto;
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Wallet not found");
        }
    }
    @Override
    public WalletResponceDto createData(WalletRequestDto walletBody) {
        WalletEntity existingWallet = minetRepository.findByUserIdAndCoinId(walletBody.getUserId(),walletBody.getCoinId());

        Optional<Coin> coins= coinRepository.findById(walletBody.getCoinId());
        Optional<User> user=userRepository.findById(walletBody.getUserId());
        if(coins.isEmpty() || user.isEmpty() ){throw new ResponseStatusException(HttpStatus.NOT_FOUND, "UserWallet not found with given details");}

        if (existingWallet!=null) {
            existingWallet.setBalance(walletBody.getAmount());
            minetRepository.save(existingWallet);
            WalletResponceDto walletResponceDto = new WalletResponceDto();
            walletResponceDto.setId(existingWallet.getId());
            walletResponceDto.setCoinId(existingWallet.getCoinId());
            walletResponceDto.setUserId(existingWallet.getUserId());
            walletResponceDto.setAmount(existingWallet.getBalance());
            return walletResponceDto;
        } else {
            WalletEntity newWallet = new WalletEntity();
            newWallet.setUserId(walletBody.getUserId());
            newWallet.setCoinId(walletBody.getCoinId());
            newWallet.setBalance(walletBody.getAmount());
            newWallet.setCreatedAt(new Date());
            newWallet.setUpdatedAt(new Date());
            minetRepository.save(newWallet);

            WalletResponceDto walletResponceDto = new WalletResponceDto();
            walletResponceDto.setId(newWallet.getId());
            walletResponceDto.setCoinId(newWallet.getCoinId());
            walletResponceDto.setUserId(newWallet.getUserId());
            walletResponceDto.setAmount(newWallet.getBalance());
            return walletResponceDto;
        }
    }
    @Override
    public List<UserWalletDTO> userWalletDetails(int userId ) {
        List<WalletEntity> walletEntities = minetRepository.findByUserId(userId);
        if (walletEntities.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Wallet not found with the given userId");
        }

        return walletEntities.stream()
                .map(this::convertentitytoDTO)
                .collect(Collectors.toList());
    }
    public  UserWalletDTO convertentitytoDTO(WalletEntity walletEntity){
        UserWalletDTO userWalletDTO=new UserWalletDTO();
        userWalletDTO.setWalletId(walletEntity.getId());
        userWalletDTO.setCoinId(walletEntity.getCoinId());
        userWalletDTO.setUserId(walletEntity.getUserId());
        String apiUrl = "http://CRYPTO-SERVICE/api/cryptos/" + walletEntity.getCoinId();
        ResponseEntity<Coins> responseEntity = restTemplate.exchange(
                apiUrl,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<>() {
                }
        );
        Coins coins = responseEntity.getBody();
        if (coins != null) {
            userWalletDTO.setName(coins.getName());
            userWalletDTO.setAcronym(coins.getAcronym());
        }
        return  userWalletDTO;
    }
    @Override
    public List<PortfolioResponseDto> findPortfolioDetails(int userId) {
        List<WalletEntity> walletEntities = minetRepository.findByUserId(userId);
        if (walletEntities.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
        return    walletEntities.stream()
                .map(this::convertentitytoDTOS)
                .collect(Collectors.toList());
    }
    public  PortfolioResponseDto convertentitytoDTOS(WalletEntity walletEntity){
        PortfolioResponseDto portfolioResponseDto=new PortfolioResponseDto();
        portfolioResponseDto.setPortfolioId(walletEntity.getId());
        portfolioResponseDto.setCoinId(walletEntity.getCoinId());
        portfolioResponseDto.setBalance(walletEntity.getBalance());
        String apiUrl = "http://CRYPTO-SERVICE/api/cryptos/" + walletEntity.getCoinId();
        ResponseEntity<Coins> responseEntity = restTemplate.exchange(
                apiUrl,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<>() {
                }
        );
        Coins coins = responseEntity.getBody();
        if (coins != null) {
            portfolioResponseDto.setAcronym(coins.getAcronym());
            portfolioResponseDto.setName(coins.getName());
            portfolioResponseDto.setIconUrl(coins.getIconUrl());
        }

        return portfolioResponseDto;
    }

}
