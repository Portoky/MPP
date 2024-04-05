package com.portoky.servermusicforum.exception;

public class InvalidMusicException extends RuntimeException {
    public InvalidMusicException(){
        super("Invalid Music!");
    }
}
