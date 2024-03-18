package com.minet.userservice.user.controller;

import com.minet.userservice.user.dto.WatchlistDto;
import com.minet.userservice.user.entity.Watchlist;
import com.minet.userservice.user.service.WatchlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class WatchlistController {

    @Autowired
    private WatchlistService watchlistService;

    @GetMapping("/watchlist")
    public ResponseEntity<List<Watchlist>> getAllWatchlistByUserId(@RequestParam Long userId){
        return new ResponseEntity<>(watchlistService.getAllWatchlist(userId), HttpStatus.OK);
    }

    @PostMapping("/watchlist")
    public ResponseEntity<String> addWatchlistToUser(@RequestParam Long userId,@RequestParam Long coinId){
        Watchlist watchlist=new Watchlist();
        watchlist.setUserId(userId);
        watchlist.setCoinId(coinId);
        return new ResponseEntity<>(watchlistService.addWatchlistToUser(watchlist),HttpStatus.CREATED);
    }

    @DeleteMapping("/watchlist")
    public ResponseEntity<String> deleteWatchlistOfUser(@RequestParam Long userId,@RequestParam Long coinId){
        WatchlistDto watchlist=new WatchlistDto();
        watchlist.setCoinId(coinId);
        watchlist.setUserId(userId);

        return new ResponseEntity<>(watchlistService.deleteWatchlistOfUser(watchlist),HttpStatus.OK);
    }
}
