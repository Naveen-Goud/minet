package com.minet.walletservice.exceptions;

public class IDNotFoundException extends RuntimeException {
    private final String message;

    public IDNotFoundException(String message) {
        super(message);
        this.message = message;
    }

    @Override
    public String getMessage() {
        return message;
    }
}

