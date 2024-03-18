package com.minet.userservice.service;

import com.minet.userservice.user.dto.WatchlistDto;
import com.minet.userservice.user.entity.Watchlist;
import com.minet.userservice.user.repository.WatchlistRepository;
import com.minet.userservice.user.service.WatchlistServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

 class WatchlistServiceImplTest {

    @InjectMocks
    private WatchlistServiceImpl watchlistService;
    @Mock
    private WatchlistRepository watchlistRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }
    @Test
     void testGetAllWatchlist_ReturnsWatchlist() {
        // Arrange
        Long userId = 1L;
        List<Watchlist> watchlistData = new ArrayList<>();

        Watchlist w1=new Watchlist();
        w1.setCoinId(1L);
        w1.setUserId(1L);
        w1.setId(1L);
        watchlistData.add(w1);
        Watchlist w2=new Watchlist();
        w2.setCoinId(1L);
        w2.setUserId(1L);
        w2.setId(1L);

        watchlistData.add(w2);

        when(watchlistRepository.findAllByUserId(userId)).thenReturn(watchlistData);

        List<Watchlist> resultWatchlist = watchlistService.getAllWatchlist(userId);

        assertNotNull(resultWatchlist);
        assertEquals(2, resultWatchlist.size());

        verify(watchlistRepository, times(1)).findAllByUserId(userId);
    }


    @Test
    void testAddWatchlistToUser() {
       Watchlist watchlistToAdd = new Watchlist();
       watchlistToAdd.setId(1L);
       watchlistToAdd.setCoinId(123L);
       watchlistToAdd.setUserId(456L);

       when(watchlistRepository.save(any(Watchlist.class))).thenReturn(watchlistToAdd);

       String result = watchlistService.addWatchlistToUser(watchlistToAdd);

       verify(watchlistRepository, times(1)).save(watchlistToAdd);

       assertEquals("Watchlist Added", result);
    }

    @Test
    void testDeleteWatchlistOfUser() {
       WatchlistDto watchlistToDelete = new WatchlistDto();
       watchlistToDelete.setCoinId(123L);
       watchlistToDelete.setUserId(456L);

       Watchlist watchlistEntity = new Watchlist();
       watchlistEntity.setCoinId(watchlistToDelete.getCoinId());
       watchlistEntity.setUserId(watchlistToDelete.getUserId());

       when(watchlistRepository.findByUserIdAndCoinId(anyLong(), anyLong())).thenReturn(watchlistEntity);

       String result = watchlistService.deleteWatchlistOfUser(watchlistToDelete);

       verify(watchlistRepository, times(1)).delete(watchlistEntity);

       assertEquals("Watchlist Deleted", result);
    }
}
