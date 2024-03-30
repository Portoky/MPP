package com.example.musicforum.repository;

import com.example.musicforum.entities.Music;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MusicRepository extends JpaRepository<Music, Long> {

}
