package com.minet.userservice.user.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

public class WatchlistDto {

    private Long coinId;
    private Long userId;

    public Long getCoinId() {
        return coinId;
    }

    public void setCoinId(Long coinId) {
        this.coinId = coinId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
