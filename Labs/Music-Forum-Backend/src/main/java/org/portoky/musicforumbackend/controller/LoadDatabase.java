package org.portoky.musicforumbackend.controller;

import org.portoky.musicforumbackend.entities.Music;
import org.portoky.musicforumbackend.entities.Rating;
import org.portoky.musicforumbackend.repository.MusicRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
@Configuration
public class LoadDatabase {
    private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);

    @Bean
    CommandLineRunner initDatabase(MusicRepository repository) {

        return args -> {
            log.info("Preloading " + repository.save(new Music("Get Back", "The Beatles", 4, 1969)));
            log.info("Preloading " + repository.save(new Music("Blackbird", "The Beatles", 5, 1967)));
            log.info("Preloading " + repository.save(new Music("Rocky Racoon", "The Beatles", 5, 1966)));
            log.info("Preloading " + repository.save(new Music("Nowhere Man", "The Beatles", 4, 1965)));
            log.info("Preloading " + repository.save(new Music("Let It Be", "The Beatles", 4, 1970)));
            log.info("Preloading " + repository.save(new Music("The Adults Are Talking", "The Strokes", 3, 2020)));
            log.info("Preloading " + repository.save(new Music("Végül", "Pocsai Eszter", 5, 2022)));
            log.info("Preloading " + repository.save(new Music("Sisi", "Sistematic", 2, 2022)));
            log.info("Preloading " + repository.save(new Music("Krúbi", "Copfocska", 5, 2021)));
        };
    }
}
