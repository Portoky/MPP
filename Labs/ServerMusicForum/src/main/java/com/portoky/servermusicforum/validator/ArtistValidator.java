package com.portoky.servermusicforum.validator;

import com.portoky.servermusicforum.entity.Artist;
import com.portoky.servermusicforum.entity.Music;
import com.portoky.servermusicforum.exception.InvalidArtistException;
import com.portoky.servermusicforum.exception.InvalidMusicException;
import com.portoky.servermusicforum.user.Role;
import com.portoky.servermusicforum.user.User;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDate;

public class ArtistValidator {

    public static void validate(Artist artist) throws InvalidArtistException {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User userDetails = (User) principal;
        if(userDetails.getRole() == Role.ARTIST && !artist.getName().equals(userDetails.getUsername())){ //++another validation
            //u can only modify YOUR profile -> username is a candidate key in both places no mapping but yeah
            throw new InvalidMusicException("You can only modify your own profile");
        }
        if(artist.getName().equals("") || artist.getBiography().equals("") ){
            throw new InvalidMusicException("Invalid input for Artist");
        }
    }
}
