package org.portoky.musicforumbackend.exceptions;
public class InvalidMusicException extends RuntimeException {
    public InvalidMusicException(){
        super("Invalid Music!");
    }
}
