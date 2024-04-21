package com.portoky.servermusicforum.validator;

import com.portoky.servermusicforum.entity.Artist;
import com.portoky.servermusicforum.entity.Music;
import com.portoky.servermusicforum.exception.InvalidArtistException;
import com.portoky.servermusicforum.exception.InvalidMusicException;

import java.time.LocalDate;

public class ArtistValidator {

    public static void validate(Artist artist) throws InvalidArtistException {
        if(artist.getName().equals("") || artist.getBiography().equals("") ){
            throw new InvalidMusicException("Invalid input for Artist");
        }
    }
}
