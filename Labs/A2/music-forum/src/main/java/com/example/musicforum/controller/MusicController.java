package com.example.musicforum.controller;

import com.example.musicforum.entities.Music;
import com.example.musicforum.exceptions.MusicNotFoundException;
import com.example.musicforum.repository.MusicRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3030")
@RestController
public class MusicController {
    private final MusicRepository repository;

    public MusicController(MusicRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/")
    List<Music> all(){
        return repository.findAll();
    }

    @PostMapping("/pages/addmusic")
    Music newMusic(@RequestBody Music newMusic){
        return repository.save(newMusic);
    }

    @GetMapping("/view/{serialId}")
    Music one(@PathVariable Long serialId) throws MusicNotFoundException{
        return repository.findById(serialId).orElseThrow(() -> new MusicNotFoundException(serialId)); //if not found
    }

    @PutMapping("/edit/{serialId}")
    Music replaceMusic(@RequestBody Music newMusic, @PathVariable Long serialId) throws MusicNotFoundException{
        return repository.findById(serialId).map(music ->{
            music.setTitle(newMusic.getTitle());
            music.setArtist(newMusic.getArtist());
            music.setRating(newMusic.getRating());
            music.setYearOfRelease(newMusic.getYearOfRelease());
            return repository.save(music);
        }).orElseThrow(() -> new MusicNotFoundException(serialId));
    }

    @DeleteMapping("/delete/{serialId}")
    void deleteMusic(@PathVariable Long serialId){
        repository.deleteById(serialId);
    }
}
