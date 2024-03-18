package com.minet.walletservice.service;
import com.minet.walletservice.dto.TransactionDTO;
import com.minet.walletservice.entity.*;
import com.minet.walletservice.exceptions.IDNotFoundException;
import com.minet.walletservice.repository.CoinRepository;
import com.minet.walletservice.repository.TransactionRepository;
import com.minet.walletservice.repository.UserRepository;
import com.minet.walletservice.repository.WalletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class TransactionService{
    private TransactionRepository transactionRepository;
    private UserRepository userRepository;
    private CoinRepository coinRepository;
    private WalletRepository walletRepository;

    @Autowired
    public TransactionService(TransactionRepository transactionRepository, UserRepository userRepository, CoinRepository coinRepository,
                              WalletRepository walletRepository ) {
        this.transactionRepository = transactionRepository;
        this.userRepository  = userRepository;
        this.coinRepository  = coinRepository;
        this.walletRepository = walletRepository;
    }
    public TransactionDTO createTransaction(int user_id, String transaction_type, int coin_id, double coin_amount,
                                                 double transaction_value) {
    System.out.println("in create transaction service...");

        Transaction transaction = new Transaction();
        transaction.setCoinAmount(coin_amount);
        transaction.setTransactionValue(transaction_value);
        transaction.setStatus(Status.pending);
        transaction.setTimestamp(new Date());

        Optional<Coin> coin = coinRepository.findById(coin_id);
        Optional<User> user = userRepository.findById(user_id);

        if(coin.isPresent()){
            transaction.setCoin(coin_id);
        }
        else{
            throw new IDNotFoundException("CoinID is invalid");
        }

        if (Objects.equals(transaction_type, "buy")) {
            Wallet towallet = walletRepository.findByUserIdAndCoinId(user_id, coin_id);
            Wallet fromwallet = walletRepository.findByUserIdAndCoinId(2, coin_id);
            transaction.setFromUser(2);
            transaction.setType(Type.buy);
            if(user.isPresent() && towallet!=null && fromwallet!=null){
                transaction.setToUser(user_id);
                transaction.setToWallet(towallet.getId());
                transaction.setFromWallet(fromwallet.getId());
                towallet.setBalance(Math.abs(towallet.getBalance() - transaction_value));
                fromwallet.setBalance(Math.abs(fromwallet.getBalance() + transaction_value));
            } else throw new IDNotFoundException("UserID is invalid or Wallet does not exist for userID and coinID");

        }
        if (Objects.equals(transaction_type, "sell")) {
            Wallet towallet = walletRepository.findByUserIdAndCoinId(2, coin_id);
            Wallet fromwallet = walletRepository.findByUserIdAndCoinId(user_id, coin_id);
            transaction.setToUser(2);
            transaction.setType(Type.sell);
            if(user.isPresent() && towallet!=null && fromwallet!=null){
                transaction.setFromUser(user_id);
                transaction.setFromWallet(fromwallet.getId());
                transaction.setToWallet(towallet.getId());
                towallet.setBalance(Math.abs(towallet.getBalance() - transaction_value));
                fromwallet.setBalance(Math.abs(fromwallet.getBalance() + transaction_value));
            } else throw new IDNotFoundException("UserID is invalid or Wallet does not exist for userID and coinID");

        }

        transactionRepository.save(transaction);
        return new TransactionDTO(transaction.getId(), user_id, transaction_type, coin_id,
                coin_amount, transaction_value, transaction.getTimestamp().toString(),
                    transaction.getStatus().toString(), "john", "mary");

    }

    public TransactionDTO convertentitytoDTO(Transaction transaction){
        return new TransactionDTO(transaction.getId(), transaction.getFromUser(),
                transaction.getType().toString(), transaction.getCoin(), transaction.getCoinAmount(),
                transaction.getTransactionValue(), transaction.getTimestamp().toString(),
                transaction.getStatus().toString(), "john", "mary");
    }

    public List<TransactionDTO> getTransactionByUserIdAndCoinId(int userId, int coinId) {

        List<Transaction> transactions = transactionRepository.findByFromUserAndCoin(userId, coinId);
        if (transactions != null && !transactions.isEmpty()) {
                return transactions.stream()
                .map(this::convertentitytoDTO)
                .collect(Collectors.toList());
        } else {
            throw new IDNotFoundException("Bad coinID or userID");
        }
    }

    public List<TransactionDTO> getTransactionByUserId(int userId) {
        List<Transaction> transactions = transactionRepository.findByFromUser(userId);
        if (transactions != null && !transactions.isEmpty()) {
            return transactions.stream()
                    .map(this::convertentitytoDTO)
                    .collect(Collectors.toList());
        } else {
            throw new IDNotFoundException("No user found with specified userID");
        }
    }

}

