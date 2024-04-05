package com.portoky.servermusicforum.repository;

import com.portoky.servermusicforum.entity.Music;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MusicRepository extends JpaRepository<Music, Long> {

}
