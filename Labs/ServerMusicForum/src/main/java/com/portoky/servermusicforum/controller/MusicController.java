package com.portoky.servermusicforum.controller;

import com.portoky.servermusicforum.entity.Artist;
import com.portoky.servermusicforum.entity.Music;
import com.portoky.servermusicforum.exception.ArtistNotFoundException;
import com.portoky.servermusicforum.exception.InvalidMusicException;
import com.portoky.servermusicforum.exception.MusicNotFoundException;
import com.portoky.servermusicforum.repository.ArtistRepository;
import com.portoky.servermusicforum.repository.MusicRepository;
import com.portoky.servermusicforum.validator.MusicValidator;
import net.datafaker.Faker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:3030")
//@CrossOrigin("")
public class MusicController {
    private final MusicRepository musicRepository;
    private final ArtistRepository artistRepository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    public MusicController(MusicRepository musicRepository, ArtistRepository artistRepository) {
        this.musicRepository = musicRepository;
        this.artistRepository = artistRepository;
    }

    @GetMapping("/music")
    List<Music> all(){
        List<Music> result = musicRepository.findAll();
        return musicRepository.findAll();
    }
    @GetMapping("/music/artist/{id}") //returns all the music of an artist
    List<Music> artistMusics(@PathVariable("id") Long id){
        return musicRepository.findByArtistArtistId(id); //its like a query where artist.artistId = id
    }
    @PostMapping("/music/add/{id}")
    Music newMusic(@RequestBody Music newMusic, @PathVariable("id") Long id){ //artistId
        try{

            Optional<Artist> optionalArtist = artistRepository.findById(Long.valueOf(id));
            Artist artistTemp = optionalArtist.orElseThrow(() -> new ArtistNotFoundException(Long.valueOf(id))); //in case it null

            newMusic.setArtist(artistTemp);

            MusicValidator.validate(newMusic);

            artistTemp.getMusicList().add(newMusic);
            return musicRepository.save(newMusic);

        }catch (InvalidMusicException ex){
            System.out.println(ex.getMessage());
            return new Music("Invalid", -1, -1);
        }
    }

    @GetMapping("/music/view/{musicId}")
    Music one(@PathVariable Long musicId) throws MusicNotFoundException {

        return musicRepository.findById(musicId).orElseThrow(() -> new MusicNotFoundException(musicId));
    }

    @PutMapping("/music/edit/{musicId}/artist/{artistId}")
    Music replaceMusic(@RequestBody Music newMusic, @PathVariable Long musicId, @PathVariable Long artistId){
        try{

            return musicRepository.findById(musicId).map(music -> {
                music.setTitle(newMusic.getTitle());
                music.setRating(newMusic.getRating());
                music.setYearOfRelease(newMusic.getYearOfRelease());

                Optional<Artist> optionalArtist = artistRepository.findById(Long.valueOf(artistId));
                Artist artistTemp = optionalArtist.orElseThrow(() -> new ArtistNotFoundException(Long.valueOf(artistId))); //in case it null
                //first delete the connection between artist and music
                music.getArtist().getMusicList().remove(music);
                //then udpdate it only
                music.setArtist(artistTemp);
                music.getArtist().getMusicList().add(music);

                MusicValidator.validate(music);

                return musicRepository.save(music);
            }).orElseThrow(() -> new MusicNotFoundException(musicId));
        }catch(InvalidMusicException ex){
            System.out.println(ex.getMessage());
            return new Music("Invalid Music", 0, -1);
        }
    }

    @DeleteMapping("/music/delete/{musicId}")
    void deleteMusic(@PathVariable Long musicId){
        Music musicToDelete = musicRepository.findById(musicId).orElseThrow(() -> new MusicNotFoundException(musicId));
        musicRepository.deleteById(musicId);
    }

    /*@Async
    @Scheduled(fixedRate = 20000)
    public void sendMusicPeriodically() {
        // Retrieve or generate a Music entity
        Music music = generateMusicEntity();
        //first save it to the repo
        // Send the Music entity to the client
        messagingTemplate.convertAndSend("/generatedmusic", musicRepository.save(music));

    }
        private Music generateMusicEntity() {
        Faker faker = new Faker();
        return new Music(faker.book().title(), faker.rockBand().name(), faker.number().numberBetween(1,6), faker.number().numberBetween(1970, 2025));
    }
    */

}

    