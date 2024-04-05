package com.portoky.servermusicforum.exception;

public class MusicNotFoundException extends RuntimeException {
    public MusicNotFoundException(Long serialId){
        super("Could not find music " + serialId);
    }
}
