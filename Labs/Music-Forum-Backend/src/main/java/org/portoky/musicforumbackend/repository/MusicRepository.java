package org.portoky.musicforumbackend.repository;

import org.portoky.musicforumbackend.entities.Music;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MusicRepository extends JpaRepository<Music, Long> {

}
