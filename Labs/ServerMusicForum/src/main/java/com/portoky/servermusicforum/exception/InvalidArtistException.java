package com.portoky.servermusicforum.exception;

public class InvalidArtistException extends RuntimeException {
    public InvalidArtistException(String message){
        super(message);
    }
}