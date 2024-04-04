package org.portoky.musicforumserver.exception;

public class InvalidMusicException extends RuntimeException {
    public InvalidMusicException(){
        super("Invalid Music!");
    }
}