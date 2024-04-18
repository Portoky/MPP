package com.portoky.servermusicforum.controller;

import com.portoky.servermusicforum.entity.Music;
import com.portoky.servermusicforum.exception.InvalidMusicException;
import com.portoky.servermusicforum.exception.MusicNotFoundException;
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

@RestController
@CrossOrigin("http://localhost:3030/")
public class MusicController {

    private final MusicRepository repository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    public MusicController(MusicRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/")
    List<Music> all(){
        System.out.println("adawd");
        return repository.findAll();
    }

    @PostMapping("/pages/addmusic")
    Music newMusic(@RequestBody Music newMusic){
        try{
            MusicValidator.validate(newMusic);
            return repository.save(newMusic);
        }catch (InvalidMusicException ex){
            System.out.println(ex.getMessage());
            return new Music("Invalid Music", "", 0, -1);
        }
    }

    @GetMapping("/view/{musicId}")
    Music one(@PathVariable Long musicId) throws MusicNotFoundException {

        return repository.findById(musicId).orElseThrow(() -> new MusicNotFoundException(musicId)); //if not found
    }

    @PutMapping("/edit/{musicId}")
    Music replaceMusic(@RequestBody Music newMusic, @PathVariable Long musicId){
        try{
            MusicValidator.validate(newMusic);
            return repository.findById(musicId).map(music -> {
                music.setTitle(newMusic.getTitle());
                music.setArtist(newMusic.getArtist());
                music.setRating(newMusic.getRating());
                music.setYearOfRelease(newMusic.getYearOfRelease());
                return repository.save(music);
            }).orElseThrow(() -> new MusicNotFoundException(musicId));
        }catch(InvalidMusicException ex){
            System.out.println(ex.getMessage());
            return new Music("Invalid Music", "", 0, -1);
        }
    }

    @DeleteMapping("/delete/{musicId}")
    void deleteMusic(@PathVariable Long musicId){
        repository.deleteById(musicId);
    }

    /*@Async
    @Scheduled(fixedRate = 20000)
    public void sendMusicPeriodically() {
        // Retrieve or generate a Music entity
        Music music = generateMusicEntity();
        //first save it to the repo
        // Send the Music entity to the client
        messagingTemplate.convertAndSend("/generatedmusic", repository.save(music));

    }*/
    private Music generateMusicEntity() {
        Faker faker = new Faker();
        return new Music(faker.book().title(), faker.rockBand().name(), faker.number().numberBetween(1,6), faker.number().numberBetween(1970, 2025));
    }
}

    