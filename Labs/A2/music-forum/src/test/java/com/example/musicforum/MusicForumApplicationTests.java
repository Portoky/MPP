package com.example.musicforum;

import com.example.musicforum.controller.MusicController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.assertj.core.api.Assertions.assertThat;
@SpringBootTest
class MusicForumApplicationTests {

    @Autowired
    private MusicController controller;
    @Test
    void contextLoads() {
        assertThat(controller).isNotNull();
    }

}
