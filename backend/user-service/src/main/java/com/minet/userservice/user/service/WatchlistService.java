package com.minet.userservice.user.service;

import com.minet.userservice.user.dto.WatchlistDto;
import com.minet.userservice.user.entity.Watchlist;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface WatchlistService {

    List<Watchlist> getAllWatchlist(Long userId);

    String addWatchlistToUser(Watchlist watchlist);

    String deleteWatchlistOfUser(WatchlistDto watchlist);
}
