package com.example.musicforum.musicvalidator;

import com.example.musicforum.entities.Music;
import com.example.musicforum.exceptions.InvalidMusicException;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
@Component
public class MusicValidator {
    public static void validate(Music music) throws InvalidMusicException{
        if(music.getTitle().equals("") || music.getArtist().equals("") ||
                music.getYearOfRelease() > LocalDate.now().getYear() || music.getYearOfRelease() < 1000
        && music.getRating() > 5  || music.getRating() < 1){
            throw new InvalidMusicException();
        }
    }
}