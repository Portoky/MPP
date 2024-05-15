package com.portoky.servermusicforum.controller;

import com.portoky.servermusicforum.dto.CountArtistMusicDto;
import com.portoky.servermusicforum.entity.Artist;
import com.portoky.servermusicforum.entity.Music;
import com.portoky.servermusicforum.exception.ArtistNotFoundException;
import com.portoky.servermusicforum.exception.InvalidMusicException;
import com.portoky.servermusicforum.exception.MusicNotFoundException;
import com.portoky.servermusicforum.repository.ArtistRepository;
import com.portoky.servermusicforum.repository.MusicRepository;
import com.portoky.servermusicforum.repository.UserRepository;
import com.portoky.servermusicforum.user.Role;
import com.portoky.servermusicforum.user.User;
import com.portoky.servermusicforum.validator.ArtistValidator;
import com.portoky.servermusicforum.validator.MusicValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
public class ArtistController {
    private final ArtistRepository artistRepository;
    private final MusicRepository musicRepository;
    private final UserRepository userRepository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    @Autowired
    public ArtistController(ArtistRepository artistRepository, MusicRepository musicRepository, UserRepository userRepository) {
        this.artistRepository = artistRepository;
        this.musicRepository = musicRepository;
        this.userRepository = userRepository;
    }


    @GetMapping("artistpage")
    ResponseEntity<List<Artist>> allForPage(@RequestParam Integer offset, @RequestParam Integer page){
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("allartistcount", String.valueOf(artistRepository.count()));
        int pageSize = offset;
        int currentOffset = offset*(page-1);
        try{
            List<Artist> result = artistRepository.findAllForPage(currentOffset, pageSize);
            return ResponseEntity.ok().headers(responseHeaders).body(result);
        }catch (IndexOutOfBoundsException ex){
            return ResponseEntity.ok().headers(responseHeaders).body(new ArrayList<Artist>());
        }
    }
    @GetMapping("/artist/count")
    Long count(){
        return artistRepository.count();
    }
    @GetMapping("/artist")
    List<Artist> all(){
        List<Artist> result = artistRepository.findAll();
        return artistRepository.findAll();
    }
    @PostMapping("/artist/add")
    @PreAuthorize("hasRole('ADMIN')")
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

    @GetMapping("/artist/view/count/{artistId}")
    Long countArtistMusics(@PathVariable Long artistId) throws ArtistNotFoundException {
        Artist artist = artistRepository.findById(artistId).orElseThrow(() -> new ArtistNotFoundException(artistId));
        Long result = musicRepository.findAll().stream().filter(music -> music.getArtist().getArtistId() == artistId).count();
        return result;
    }
    @GetMapping("/artist/view/count")
    HashMap<Long, Long> countAllArtistsMusic(){
        HashMap<Long, Long>artistMusicCountHashMap = new HashMap<>();
        List<CountArtistMusicDto> artistMusicCountPairs = artistRepository.countAllArtistsMusic();
        artistMusicCountPairs.forEach(artistMusicCountPair->{
            artistMusicCountHashMap.put(artistMusicCountPair.getArtistId(), artistMusicCountPair.getCount());
        });
        return artistMusicCountHashMap;

    }

    @PutMapping("/artist/edit/{artistId}")
    @PreAuthorize("hasRole('ARTIST') OR hasRole('ADMIN')")
    Artist replaceArtist(@RequestBody Artist newArtist, @PathVariable Long artistId) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User userDetails = (User) principal;
        try {
            return artistRepository.findById(artistId).map(artist -> {
                ArtistValidator.validate(artist);
                //you need to edit the user as well! that has this ArtistName so the users name is changed as well.
                Optional<User> userToChangeName = userRepository.findByUsername(userDetails.getUsername());
                userToChangeName.ifPresent(user -> {
                    user.setUsername(newArtist.getName()); //update the username too;
                });
                artist.setName(newArtist.getName());
                artist.setBiography(newArtist.getBiography());
                return artistRepository.save(artist);
            }).orElseThrow(() -> new MusicNotFoundException(artistId));
        } catch (InvalidMusicException ex) {
            System.out.println(ex.getMessage());
            return new Artist("Invalid Artist", "");
        }
    }
    @DeleteMapping("/artist/delete/{artistId}")
    @PreAuthorize("hasRole('ADMIN')")
    void deleteArtist(@PathVariable Long artistId){
        Artist artistToDelete = artistRepository.findById(artistId).orElseThrow(()->new ArtistNotFoundException(artistId));
        artistRepository.deleteById(artistId);
    }
}
