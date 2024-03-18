package com.minet.walletservice.repository;
import com.minet.walletservice.entity.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WalletRepository extends JpaRepository<Wallet, Integer> {
    Wallet findByUserIdAndCoinId(int userId, int coinId);

}