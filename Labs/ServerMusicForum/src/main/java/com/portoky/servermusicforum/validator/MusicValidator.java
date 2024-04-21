package com.portoky.servermusicforum.validator;

import com.portoky.servermusicforum.entity.Music;
import com.portoky.servermusicforum.exception.InvalidMusicException;

import java.time.LocalDate;

public class MusicValidator {
    public static void validate(Music music) throws InvalidMusicException {
        if(music.getTitle().equals("") || music.getArtist() == null ||
                music.getYearOfRelease() > LocalDate.now().getYear() || music.getYearOfRelease() < 1000
                && music.getRating() > 5  || music.getRating() < 1){
            throw new InvalidMusicException("Invalid input for Music");
        }
    }
}
