package com.portoky.servermusicforum.controller;

import com.portoky.servermusicforum.entity.Artist;
import com.portoky.servermusicforum.entity.Music;
import com.portoky.servermusicforum.exception.ArtistNotFoundException;
import com.portoky.servermusicforum.exception.InvalidMusicException;
import com.portoky.servermusicforum.exception.MusicNotFoundException;
import com.portoky.servermusicforum.repository.ArtistRepository;
import com.portoky.servermusicforum.repository.MusicRepository;
import com.portoky.servermusicforum.validator.ArtistValidator;
import com.portoky.servermusicforum.validator.MusicValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
@RestController
@CrossOrigin("http://localhost:3030")
//@CrossOrigin("")
public class ArtistController {
    private final ArtistRepository artistRepository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    @Autowired
    public ArtistController(ArtistRepository artistRepository) {
        this.artistRepository = artistRepository;
    }

    @GetMapping("/artist")
    List<Artist> all(){
        List<Artist> result = artistRepository.findAll();
        return artistRepository.findAll();
    }
    @PostMapping("/artist/add")
    Artist newArtist(@RequestBody Artist newArtist){
        try{
            ArtistValidator.validate(newArtist);
            return artistRepository.save(newArtist);
        }catch (InvalidMusicException ex){
            System.out.println(ex.getMessage());
            return new Artist("Invalid Artist", "");
        }
    }

    @GetMapping("/artist/view/{artistId}")
    Artist one(@PathVariable Long artistId) throws ArtistNotFoundException {

        return artistRepository.findById(artistId).orElseThrow(() -> new ArtistNotFoundException(artistId));
    }

    @PutMapping("/artist/edit/{artistId}")
    Artist replaceArtist(@RequestBody Artist newArtist, @PathVariable Long artistId) {
        try {

            return artistRepository.findById(artistId).map(artist -> {
                artist.setName(newArtist.getName());
                artist.setBiography(newArtist.getBiography());
                //we do not change the music list sorry
                //artist.getMusicList().forEach(music -> {music.setArtist(null);});
                //artist.setMusicList(newArtist.getMusicList());
                //artist.getMusicList().forEach(music -> {music.setArtist(artist);});
                ArtistValidator.validate(artist);
                return artistRepository.save(artist);
            }).orElseThrow(() -> new MusicNotFoundException(artistId));
        } catch (InvalidMusicException ex) {
            System.out.println(ex.getMessage());
            return new Artist("Invalid Artist", "");
        }
    }
    @DeleteMapping("/artist/delete/{artistId}")
    void deleteArtist(@PathVariable Long artistId){
        Artist artistToDelete = artistRepository.findById(artistId).orElseThrow(()->new ArtistNotFoundException(artistId));
        artistRepository.deleteById(artistId);
    }
}
