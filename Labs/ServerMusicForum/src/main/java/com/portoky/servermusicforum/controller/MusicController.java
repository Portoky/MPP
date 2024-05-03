package com.portoky.servermusicforum.controller;

import com.portoky.servermusicforum.dto.MusicDto;
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
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
public class MusicController {
    private final MusicRepository musicRepository;
    private final ArtistRepository artistRepository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    public MusicController(MusicRepository musicRepository, ArtistRepository artistRepository) {
        this.musicRepository = musicRepository;
        this.artistRepository = artistRepository;
    }
    @GetMapping("/musicpage")
    ResponseEntity<List<MusicDto>> allForPage(@RequestParam Integer offset, @RequestParam Integer page){
        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.set("allmusiccount", String.valueOf(musicRepository.count()));
        int pageSize = offset;
        int currentOffset = offset*(page-1);
        try {
            List<MusicDto> result =
                    musicRepository.findAllForPage(currentOffset, pageSize).stream().map(
                            music -> new MusicDto(music.getMusicId(), music.getTitle(), music.getRating(), music.getYearOfRelease(), music.getArtist().getArtistId(), music.getArtist().getName()))
                            .collect(Collectors.toList());
            return ResponseEntity.ok().headers(responseHeaders).body(result);
            }catch (IndexOutOfBoundsException ex){
                return ResponseEntity.ok().headers(responseHeaders).body(new ArrayList<MusicDto>());
        }

    }

    @GetMapping("/music")
    List<MusicDto> all(){
        List<MusicDto> result =
                musicRepository.findAll().stream().map(music -> new MusicDto(music.getMusicId(), music.getTitle(), music.getRating(), music.getYearOfRelease(), music.getArtist().getArtistId(), music.getArtist().getName())
                ).collect(Collectors.toList());
        return result;
    }
    @GetMapping("/music/artist/{id}") //returns all the music of an artist --> not all only some of it!
    List<MusicDto> artistMusics(@PathVariable("id") Long id, @RequestParam Integer offset, @RequestParam Integer page){
        try {
            int pageSize = offset;
            int currentOffset = offset*(page-1);
            List<MusicDto> result = musicRepository.findAllArtistMusicForPage(currentOffset, pageSize, id).stream().map(
                    music -> new MusicDto(music.getMusicId(), music.getTitle(), music.getRating(), music.getYearOfRelease(), music.getArtist().getArtistId(), music.getArtist().getName()))
                    .collect(Collectors.toList());
                    /*musicRepository.findByArtistArtistId(id).stream().map(music -> new MusicDto(music.getMusicId(), music.getTitle(), music.getRating(), music.getYearOfRelease(), music.getArtist().getArtistId(), music.getArtist().getName())
                    ).collect(Collectors.toList()).subList((page - 1) * offset, page * offset); //its like a query where artist.artistId = id1}, pagination*/
            return result;
        }catch (IndexOutOfBoundsException ex){
            return new ArrayList<MusicDto>(); //return it empty
        }

    }

    @PostMapping("/generate/{id}")
    void generateRandomMusic(@PathVariable("id") Long artistId){
        Faker faker = new Faker();
        Optional<Artist> optionalArtist = artistRepository.findById(Long.valueOf(artistId));
        Artist artistTemp = optionalArtist.orElseThrow(() -> new ArtistNotFoundException(Long.valueOf(artistId)));

        for(int i = 0; i < 100; ++i){
            Music newMusic = new Music(faker.book().title(), faker.number().numberBetween(1,5), faker.number().numberBetween(1970, 2024));
            newMusic.setArtist(artistTemp);
            musicRepository.save(newMusic);
        }
    }
    @PostMapping("/music/add/{id}")
    MusicDto newMusic(@RequestBody Music newMusic, @PathVariable("id") Long id){ //artistId
        try{

            Optional<Artist> optionalArtist = artistRepository.findById(Long.valueOf(id));
            Artist artistTemp = optionalArtist.orElseThrow(() -> new ArtistNotFoundException(Long.valueOf(id))); //in case it null

            newMusic.setArtist(artistTemp);

            MusicValidator.validate(newMusic);

            artistTemp.getMusicList().add(newMusic);
            musicRepository.save(newMusic);
            return new MusicDto(newMusic.getMusicId(), newMusic.getTitle(), newMusic.getRating(), newMusic.getYearOfRelease(), id, artistTemp.getName());
        }catch (InvalidMusicException ex){
            System.out.println(ex.getMessage());
            return new MusicDto(Long.valueOf(1), "", -1, -1, Long.valueOf(1), "");
        }
    }

    @GetMapping("/music/view/{musicId}")
    MusicDto one(@PathVariable Long musicId) throws MusicNotFoundException {

        Music music = musicRepository.findById(musicId).orElseThrow(() -> new MusicNotFoundException(musicId));
        return new MusicDto(music.getMusicId(), music.getTitle(), music.getRating(), music.getYearOfRelease(), musicId, music.getArtist().getName());
    }

    @PutMapping("/music/edit/{musicId}/artist/{artistId}")
    MusicDto replaceMusic(@RequestBody Music newMusic, @PathVariable Long musicId, @PathVariable Long artistId){
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

                 musicRepository.save(music);
                 return new MusicDto(music.getMusicId(), music.getTitle(), music.getRating(), music.getYearOfRelease(), musicId, music.getArtist().getName());
            }).orElseThrow(() -> new MusicNotFoundException(musicId));
        }catch(InvalidMusicException ex){
            System.out.println(ex.getMessage());
            return new MusicDto(1L, "", -1, -1, 1L, "");
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

    