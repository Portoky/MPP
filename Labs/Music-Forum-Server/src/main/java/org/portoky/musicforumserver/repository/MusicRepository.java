package org.portoky.musicforumserver.repository;

import org.portoky.musicforumserver.entities.Music;
import org.springframework.data.jpa.repository.JpaRepository;


public interface MusicRepository extends JpaRepository<Music, Long> {

}

