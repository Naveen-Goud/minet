package com.minet.userservice.controller;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

import com.minet.userservice.user.controller.WatchlistController;
import com.minet.userservice.user.entity.Watchlist;
import com.minet.userservice.user.service.WatchlistService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

 class WatchlistControllerTest {

    @InjectMocks
    private WatchlistController watchlistController;

    @Mock
    private WatchlistService watchlistService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
      void testGetAllWatchlistByUserId_Successful() {
        Long userId = 1L;

        List<Watchlist> watchlists = new ArrayList<>();

        Watchlist w1= new Watchlist();
        w1.setId(1L);
        w1.setUserId(1L);
        w1.setCoinId(1L);
        watchlists.add(w1);

        Watchlist w2= new Watchlist();
        w2.setId(2L);
        w2.setUserId(1L);
        w2.setCoinId(2L);
        watchlists.add(w2);

        when(watchlistService.getAllWatchlist(userId)).thenReturn(watchlists);

        ResponseEntity<?> responseEntity = watchlistController.getAllWatchlistByUserId(userId);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(watchlists, responseEntity.getBody());
    }

    @Test
     void testPostWatchlist(){
        ResponseEntity<?> responseEntity=watchlistController.addWatchlistToUser(1L,5L);
        assertEquals(HttpStatus.CREATED,responseEntity.getStatusCode());
    }

     @Test
     void testDeleteWatchlist(){
         ResponseEntity<?> responseEntity=watchlistController.deleteWatchlistOfUser(1L,5L);
         assertEquals(HttpStatus.OK,responseEntity.getStatusCode());
     }
}

