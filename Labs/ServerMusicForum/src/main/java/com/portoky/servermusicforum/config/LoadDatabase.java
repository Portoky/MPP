package com.portoky.servermusicforum.config;

import com.portoky.servermusicforum.entity.Artist;
import com.portoky.servermusicforum.entity.Music;
import com.portoky.servermusicforum.repository.ArtistRepository;
import com.portoky.servermusicforum.repository.MusicRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import net.datafaker.Faker;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Configuration
public class LoadDatabase {
    private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);
    //no need for all this
    @Bean
    CommandLineRunner initDatabase(ArtistRepository artistRepository, MusicRepository musicRepository) {
        Faker faker = new Faker();
        return args -> {
            /*for(int i = 0; i < 10000; ++i){

                Artist newArtist = new Artist(faker.rockBand().toString(), faker.text().text());
                artistRepository.save(newArtist);//for each artist 5 music

            }*/
            /*for(int j = 0; j < 50000; ++j) {
                    Music newMusic = new Music(faker.book().title(), faker.number().numberBetween(1, 5), faker.number().numberBetween(1970, 2000));
                    musicRepository.save(newMusic);
            }
            //Artist artist1 = artistRepository.save(new Artist("The Beatles", "balblabla"));
            /*Artist artist2 =
            Artist artist3 = artistRepository.save(new Artist("Beton Hofi", "balbladwabla"));*/
            /*log.info("Preloading " + musicRepository.save(new Music("Get Back", 4, 1969)));
            log.info("Preloading " + musicRepository.save(new Music("Blackbird", 5, 1967)));
            log.info("Preloading " + musicRepository.save(new Music("Rocky Racoon", 5, 1966)));
            log.info("Preloading " + musicRepository.save(new Music("Nowhere Man", 4, 1965)));
            log.info("Preloading " + musicRepository.save(new Music("Let It Be", 4, 1970)));
            log.info("Preloading " + musicRepository.save(new Music("The Adults Are Talking", 3, 2020)));
            log.info("Preloading " + musicRepository.save(new Music("Végül", 5, 2022)));
            log.info("Preloading " + musicRepository.save(new Music("Sisi", 2, 2022)));
            log.info("Preloading " + musicRepository.save(new Music("Krúbi", 5, 2021)));*/
        };
    }

}
