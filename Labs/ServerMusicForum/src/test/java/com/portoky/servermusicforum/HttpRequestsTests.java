package com.portoky.servermusicforum;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.portoky.servermusicforum.entity.Music;
import com.portoky.servermusicforum.repository.MusicRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.mock.http.server.reactive.MockServerHttpRequest.post;
import static org.springframework.mock.http.server.reactive.MockServerHttpRequest.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.springframework.boot.test.context.SpringBootTest;


@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
public class HttpRequestTest {
    @LocalServerPort
    private int port;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private MusicRepository musicRepository;

    @Test
    void testMainPage() throws Exception {
        assertThat(this.restTemplate.getForObject("http://localhost:" + port + "/",
                String.class)).contains("The Beatles");
    }
    @Test
    public void testUpdateMusic() throws Exception {
        // Given
        Music updatedMusic = new Music("testtitle", "testartist", 4, 1970);

        // When/Then
        mockMvc.perform(put("/edit/{serialId}", 1)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updatedMusic)))
                .andExpect(status().is(200));
    }

    @Test
    public void testAddMusic() throws Exception {

        // Given
        Music updatedMusic = new Music("testtitle", "testartist", 4, 1970);

        // When/Then
        mockMvc.perform(post("/pages/addmusic")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updatedMusic)))
                .andExpect(status().is(200));

    }