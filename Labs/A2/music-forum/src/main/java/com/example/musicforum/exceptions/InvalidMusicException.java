package com.example.musicforum.exceptions;
public class InvalidMusicException extends RuntimeException {
    public InvalidMusicException(){
        super("Invalid Music!");
    }
}
