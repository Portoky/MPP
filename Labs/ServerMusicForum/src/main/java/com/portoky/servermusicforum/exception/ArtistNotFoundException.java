package com.portoky.servermusicforum.exception;

public class ArtistNotFoundException extends RuntimeException {
    public ArtistNotFoundException(Long serialId){
        super("Could not find music " + serialId);
    }
}

