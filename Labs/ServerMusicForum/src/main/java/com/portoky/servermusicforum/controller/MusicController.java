package com.portoky.servermusicforum.controller;

import com.portoky.servermusicforum.entity.Music;
import com.portoky.servermusicforum.exception.InvalidMusicException;
import com.portoky.servermusicforum.exception.MusicNotFoundException;
import com.portoky.servermusicforum.repository.MusicRepository;
import com.portoky.servermusicforum.validator.MusicValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3030/")
public class MusicController {

    private final MusicRepository repository;

    public MusicController(MusicRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/")
    @MessageMapping
    List<Music> all(){
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

    @GetMapping("/view/{serialId}")
    Music one(@PathVariable Long serialId) throws MusicNotFoundException {
        return repository.findById(serialId).orElseThrow(() -> new MusicNotFoundException(serialId)); //if not found
    }

    @PutMapping("/edit/{serialId}")
    Music replaceMusic(@RequestBody Music newMusic, @PathVariable Long serialId){
        try{
            MusicValidator.validate(newMusic);
            return repository.findById(serialId).map(music -> {
                music.setTitle(newMusic.getTitle());
                music.setArtist(newMusic.getArtist());
                music.setRating(newMusic.getRating());
                music.setYearOfRelease(newMusic.getYearOfRelease());
                return repository.save(music);
            }).orElseThrow(() -> new MusicNotFoundException(serialId));
        }catch(InvalidMusicException ex){
            System.out.println(ex.getMessage());
            return new Music("Invalid Music", "", 0, -1);
        }
    }

    @DeleteMapping("/delete/{serialId}")
    void deleteMusic(@PathVariable Long serialId){
        repository.deleteById(serialId);
    }
}

