package com.minet.userservice.user.repository;

import com.minet.userservice.user.entity.Watchlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WatchlistRepository extends JpaRepository<Watchlist,Long> {

    List<Watchlist> findAllByUserId(Long userId);

    Watchlist findByUserIdAndCoinId(Long userId,Long coinId);
}
