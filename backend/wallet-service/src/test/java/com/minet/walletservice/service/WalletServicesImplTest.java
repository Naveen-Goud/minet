package com.minet.walletservice.service;
import com.minet.walletservice.dto.*;
import com.minet.walletservice.entity.Coin;
import com.minet.walletservice.entity.Coins;
import com.minet.walletservice.entity.User;
import com.minet.walletservice.entity.WalletEntity;
import com.minet.walletservice.exceptions.UserNotFoundException;
import com.minet.walletservice.repository.CoinRepository;
import com.minet.walletservice.repository.MinetRepository;
import com.minet.walletservice.repository.UserRepository;
import com.minet.walletservice.repository.WalletRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class WalletServicesImplTest {

    @Mock
    private MinetRepository minetRepository;

    @Mock
    private RestTemplate restTemplate;

    private CoinRepository coinRepository = mock(CoinRepository.class);
    private UserRepository userRepository = mock(UserRepository.class);
    @InjectMocks
    private WalletServicesImpl walletService;
    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }
    @Test
    void testFindWalletByIdWalletExistsAndUpdateBalance() {
        // Test data
        int walletId = 1;
        int walletBalance = 100;
        int requestAmount = 50;

        WalletEntity walletEntity = new WalletEntity();
        walletEntity.setId(walletId);
        walletEntity.setCoinId(1);
        walletEntity.setBalance(walletBalance);

        WalletIDRequestDto requestDto = new WalletIDRequestDto();
        requestDto.setAmount(requestAmount);

        when(minetRepository.findById(walletId)).thenReturn(Optional.of(walletEntity));

        WalletIDResponseDto responseDto = walletService.findWalletById(walletId, requestDto);

        assertNotNull(responseDto);
        assertEquals(walletId, responseDto.getId());
        assertEquals(walletEntity.getCoinId(), responseDto.getCoinId());
        assertEquals(walletBalance + requestAmount, responseDto.getAmount());

        verify(minetRepository, times(1)).save(walletEntity);
    }

    @Test
    void testConvertentitytoDTO() {
        int walletId = 1;
        int coinId = 1;
        int userId = 1;
        String coinName = "Bitcoin";
        String coinAcronym = "BTC";

        WalletEntity walletEntity = new WalletEntity();
        walletEntity.setId(walletId);
        walletEntity.setCoinId(coinId);
        walletEntity.setUserId(userId);

        Coins coins = new Coins();
        coins.setName(coinName);
        coins.setAcronym(coinAcronym);

        ResponseEntity<Coins> responseEntity = new ResponseEntity<>(coins, HttpStatus.OK);

        String apiUrl = "http://CRYPTO-SERVICE/api/cryptos/" + coinId;
        when(restTemplate.exchange(apiUrl, HttpMethod.GET, null, new ParameterizedTypeReference<Coins>() {}))
                .thenReturn(responseEntity);

        UserWalletDTO responseDto = walletService.convertentitytoDTO(walletEntity);

        assertNotNull(responseDto);
        assertEquals(walletId, responseDto.getWalletId());
        assertEquals(coinId, responseDto.getCoinId());
        assertEquals(userId, responseDto.getUserId());
        assertEquals(coinName, responseDto.getName());
        assertEquals(coinAcronym, responseDto.getAcronym());
    }
    @Test
    void testFindPortfolioDetails() {
        // Test data
        int userId = 1;
        int walletId1 = 1;
        int walletId2 = 2;
        int coinId1 = 1;
        int coinId2 = 2;
        int walletBalance1 = 100;
        int walletBalance2 = 200;

        WalletEntity wallet1 = new WalletEntity();
        wallet1.setId(walletId1);
        wallet1.setUserId(userId);
        wallet1.setCoinId(coinId1);
        wallet1.setBalance(walletBalance1);

        WalletEntity wallet2 = new WalletEntity();
        wallet2.setId(walletId2);
        wallet2.setUserId(userId);
        wallet2.setCoinId(coinId2);
        wallet2.setBalance(walletBalance2);

        List<WalletEntity> wallets = new ArrayList<>();
        wallets.add(wallet1);
        wallets.add(wallet2);

        when(minetRepository.findByUserId(userId)).thenReturn(wallets);

        String coinName1 = "Bitcoin";
        String coinAcronym1 = "BTC";
        Coins coins1 = new Coins();
        coins1.setName(coinName1);
        coins1.setAcronym(coinAcronym1);
        ResponseEntity<Coins> responseEntity1 = new ResponseEntity<>(coins1, HttpStatus.OK);
        String apiUrl1 = "http://CRYPTO-SERVICE/api/cryptos/" + coinId1;
        when(restTemplate.exchange(apiUrl1, HttpMethod.GET, null, new ParameterizedTypeReference<Coins>() {}))
                .thenReturn(responseEntity1);
        String coinName2 = "Ethereum";
        String coinAcronym2 = "ETH";
        Coins coins2 = new Coins();
        coins2.setName(coinName2);
        coins2.setAcronym(coinAcronym2);
        ResponseEntity<Coins> responseEntity2 = new ResponseEntity<>(coins2, HttpStatus.OK);
        String apiUrl2 = "http://CRYPTO-SERVICE/api/cryptos/" + coinId2;
        when(restTemplate.exchange(apiUrl2, HttpMethod.GET, null, new ParameterizedTypeReference<Coins>() {}))
                .thenReturn(responseEntity2);

        List<PortfolioResponseDto> responseDtoList = walletService.findPortfolioDetails(userId);

        assertNotNull(responseDtoList);
        assertEquals(2, responseDtoList.size());

        PortfolioResponseDto responseDto1 = responseDtoList.get(0);
        PortfolioResponseDto responseDto2 = responseDtoList.get(1);

        assertEquals(walletId1, responseDto1.getPortfolioId());
        assertEquals(coinId1, responseDto1.getCoinId());
        assertEquals(coinName1, responseDto1.getName());
        assertEquals(coinAcronym1, responseDto1.getAcronym());
        assertEquals(walletBalance1, responseDto1.getBalance());

        assertEquals(walletId2, responseDto2.getPortfolioId());
        assertEquals(coinId2, responseDto2.getCoinId());
        assertEquals(coinName2, responseDto2.getName());
        assertEquals(coinAcronym2, responseDto2.getAcronym());
        assertEquals(walletBalance2, responseDto2.getBalance());

        verify(minetRepository, times(1)).findByUserId(userId);
    }
    @Test
    void testCreateDataUserNotFoundException() {
        int userId = 1;
        int coinId = 1;
        int amount = 100;
        WalletRequestDto walletBody = new WalletRequestDto(userId, coinId, amount);
        when(minetRepository.findByUserIdAndCoinId(userId,coinId))
                .thenThrow(new UserNotFoundException("User not found for userId: " + userId, HttpStatus.NOT_FOUND));

        assertThrows(UserNotFoundException.class, () -> walletService.createData(walletBody));
    }

    @Test
    void testCreateDataForNewWallet() {
        // Mocking coin and user existence
        when(coinRepository.findById(1)).thenReturn(Optional.of(new Coin()));
        when(userRepository.findById(1)).thenReturn(Optional.of(new User()));

        // Test case for creating a new wallet
        WalletRequestDto walletRequestDto = new WalletRequestDto(1, 1, 100.0);
        WalletResponceDto walletResponseDto = walletService.createData(walletRequestDto);

        assertNotNull(walletResponseDto);
        assertEquals(0,walletResponseDto.getId());
        assertEquals(1, walletResponseDto.getCoinId());
        assertEquals(1, walletResponseDto.getUserId());
        assertEquals(100.0, walletResponseDto.getAmount());
    }
    @Test
    void testCreateDataForNonExistingCoin() {
        // Mocking user existence, but no coin existence
        when(userRepository.findById(1)).thenReturn(Optional.of(new User()));
        when(coinRepository.findById(2)).thenReturn(Optional.empty());

        // Test case for a non-existing coin
        WalletRequestDto walletRequestDto = new WalletRequestDto(1, 2, 200.0);

        assertThrows(ResponseStatusException.class, () -> walletService.createData(walletRequestDto));
    }
    @Test
    void testCreateDataForNonExistingUser() {
        // Mocking coin existence, but no user existence
        when(userRepository.findById(2)).thenReturn(Optional.empty());
        when(coinRepository.findById(1)).thenReturn(Optional.of(new Coin()));

        // Test case for a non-existing user
        WalletRequestDto walletRequestDto = new WalletRequestDto(2, 1, 200.0);

        assertThrows(ResponseStatusException.class, () -> walletService.createData(walletRequestDto));
    }
    @Test
    void testUserWalletDetailsForNonExistingUser() {
        // Mocking the repository to return an empty list for a non-existing user
        int nonExistingUserId = 99;
        when(minetRepository.findByUserId(nonExistingUserId)).thenReturn(new ArrayList<>());

        // Test case for a non-existing user
        assertThrows(ResponseStatusException.class, () -> walletService.userWalletDetails(nonExistingUserId));
    }
    @Test
    void testUserWalletDetailsForExistingUserWithNoWallets() {
        // Mocking the repository to return an empty list for an existing user with no wallets
        int existingUserId = 1;
        when(minetRepository.findByUserId(existingUserId)).thenReturn(new ArrayList<>());

        // Test case for an existing user with no wallets
        assertThrows(ResponseStatusException.class, () -> walletService.userWalletDetails(existingUserId));
    }
    @Test
    void testCreateDataForInvalidCoin() {
        // Mocking the repository to return null for an existing wallet entity
        int existingUserId = 1;
        int invalidCoinId = 300;
        when(minetRepository.findByUserIdAndCoinId(existingUserId, invalidCoinId)).thenReturn(null);

        // Mocking the coinRepository to return an empty optional for an invalid coin ID
        when(coinRepository.findById(invalidCoinId)).thenReturn(Optional.empty());

        // Mocking the userRepository to return an existing user
        User existingUser = new User(1, "John Doe");
        when(userRepository.findById(existingUserId)).thenReturn(Optional.of(existingUser));

        // Create a WalletRequestDto with an invalid coin ID
        WalletRequestDto walletBody = new WalletRequestDto(existingUserId, invalidCoinId, 100.0);

        // Test case for an invalid coin ID
        assertThrows(ResponseStatusException.class, () -> walletService.createData(walletBody));
    }

    @Test
    void testCreateDataForInvalidUser() {
        // Mocking the repository to return null for an existing wallet entity
        int invalidUserId = 99;
        int coinId = 400;
        when(minetRepository.findByUserIdAndCoinId(invalidUserId, coinId)).thenReturn(null);

        // Mocking the coinRepository to return an existing coin
        Coin existingCoin = new Coin(400, "XRP", "Ripple");
        when(coinRepository.findById(coinId)).thenReturn(Optional.of(existingCoin));

        // Mocking the userRepository to return an empty optional for an invalid user ID
        when(userRepository.findById(invalidUserId)).thenReturn(Optional.empty());

        // Create a WalletRequestDto with an invalid user ID
        WalletRequestDto walletBody = new WalletRequestDto(invalidUserId, coinId, 200.0);

        // Test case for an invalid user ID
        assertThrows(ResponseStatusException.class, () -> walletService.createData(walletBody));
    }

    @Test
    void testCreateDataWalletExists() {
        WalletRequestDto walletRequestDto = new WalletRequestDto();
        walletRequestDto.setUserId(1);
        walletRequestDto.setCoinId(123);
        walletRequestDto.setAmount(500.0);

        Coin coin = new Coin();
        coin.setId(123);
        coin.setName("Bitcoin");
        coin.setAcronym("BTC");

        User user = new User();
        user.setId(1);
        user.setFullName("testuser");

        WalletEntity existingWallet = new WalletEntity();
        existingWallet.setId(1);
        existingWallet.setUserId(1);
        existingWallet.setCoinId(123);
        existingWallet.setBalance(1000.0);

        when(coinRepository.findById(123)).thenReturn(Optional.of(coin));
        when(userRepository.findById(1)).thenReturn(Optional.of(user));
        when(minetRepository.findByUserIdAndCoinId(1, 123)).thenReturn(existingWallet);
        when(minetRepository.save(any(WalletEntity.class))).thenReturn(existingWallet);

        WalletResponceDto walletResponse = walletService.createData(walletRequestDto);

        assertEquals(1L, walletResponse.getId());
        assertEquals(123L, walletResponse.getCoinId());
        assertEquals(1L, walletResponse.getUserId());
        assertEquals(500.0, walletResponse.getAmount());
    }

    @Test
    void testFindWalletByIdWalletNotFound() {
        int nonExistentWalletId = 999;
        when(minetRepository.findById(nonExistentWalletId)).thenReturn(Optional.empty());

        WalletIDRequestDto walletIDRequestDto = new WalletIDRequestDto();
        walletIDRequestDto.setAmount(100.0);
        ResponseStatusException exception = assertThrows(ResponseStatusException.class, () -> {
            walletService.findWalletById(nonExistentWalletId, walletIDRequestDto);
        });

        assertEquals(HttpStatus.NOT_FOUND, exception.getStatus());
        assertEquals("Wallet not found", exception.getReason());
    }
}
