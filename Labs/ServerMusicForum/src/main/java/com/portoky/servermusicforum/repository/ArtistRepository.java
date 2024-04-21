package com.portoky.servermusicforum.repository;

import com.portoky.servermusicforum.entity.Artist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ArtistRepository extends JpaRepository<Artist, Long> {

}
