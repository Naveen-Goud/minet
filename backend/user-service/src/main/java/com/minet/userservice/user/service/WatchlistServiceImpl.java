package com.minet.userservice.user.service;

import com.minet.userservice.user.dto.WatchlistDto;
import com.minet.userservice.user.entity.Watchlist;
import com.minet.userservice.user.repository.WatchlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WatchlistServiceImpl implements WatchlistService{

    @Autowired
    private WatchlistRepository watchlistRepository;
    @Override
    public List<Watchlist> getAllWatchlist(Long userId) {
        return watchlistRepository.findAllByUserId(userId);
    }

    @Override
    public String addWatchlistToUser(Watchlist watchlist) {
         watchlistRepository.save(watchlist);
         return "Watchlist Added";
    }

    @Override
    public String deleteWatchlistOfUser(WatchlistDto watchlistDto) {

        Watchlist watchlist=watchlistRepository.findByUserIdAndCoinId(watchlistDto.getUserId(),watchlistDto.getCoinId());
        watchlistRepository.delete(watchlist);

        return "Watchlist Deleted";
    }
}
