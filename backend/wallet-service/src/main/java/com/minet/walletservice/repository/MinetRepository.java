package com.minet.walletservice.repository;
import com.minet.walletservice.entity.WalletEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MinetRepository extends JpaRepository<WalletEntity,Integer> {
    List<WalletEntity> findByUserId(int userId);
    WalletEntity findByUserIdAndCoinId(int userId,int coinId);

}
