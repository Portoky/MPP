package org.portoky.musicforumserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan("org.portoky.musicforumserver.entities")
public class MusicForumServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(MusicForumServerApplication.class, args);
    }

}
