package com.portoky.servermusicforum.controller;

import com.portoky.servermusicforum.entity.Music;
import com.portoky.servermusicforum.exception.InvalidMusicException;
import com.portoky.servermusicforum.exception.MusicNotFoundException;
import com.portoky.servermusicforum.repository.MusicRepository;
import com.portoky.servermusicforum.validator.MusicValidator;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@CrossOrigin("http://localhost:3030")
@Controller
public class MusicSocketController {

    private final MusicRepository repository;

    public MusicSocketController(MusicRepository repository) {
        this.repository = repository;
    }
    @MessageMapping("/")
    @SendTo("/")
    List<Music> all(){
        System.out.println("adawdadawdawd");
        return repository.findAll();
    }

    @MessageMapping("/createmusic")
    @SendTo("/pages/addmusic") //send to all sockets that are subscribed here
    Music newMusic(@RequestBody Music newMusic){
        try{
            MusicValidator.validate(newMusic);
            return repository.save(newMusic);
        }catch (InvalidMusicException ex){
            System.out.println(ex.getMessage());
            return new Music("Invalid Music", "", 0, -1);
        }
    }

    @MessageMapping("view")
    @SendTo("/view/{serialId}")
    Music one(@PathVariable Long serialId) throws MusicNotFoundException {
        return repository.findById(serialId).orElseThrow(() -> new MusicNotFoundException(serialId)); //if not found
    }

}
