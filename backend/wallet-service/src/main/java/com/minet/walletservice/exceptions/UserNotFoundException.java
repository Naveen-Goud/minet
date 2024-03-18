package com.minet.walletservice.exceptions;

import org.springframework.http.HttpStatus;

public class UserNotFoundException extends  RuntimeException{
    final   HttpStatus httpStatus;
    public UserNotFoundException(String message, HttpStatus httpStatus){
        super(message);
        this.httpStatus=httpStatus;
    }
    public HttpStatus getHttpStatus() {
        return httpStatus;
    }
}
