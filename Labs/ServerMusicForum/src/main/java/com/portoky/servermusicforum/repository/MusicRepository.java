package com.portoky.servermusicforum.repository;

import com.portoky.servermusicforum.entity.Music;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MusicRepository extends JpaRepository<Music, Long> {
    List<Music> findByArtistArtistId(Long artistId);
}
