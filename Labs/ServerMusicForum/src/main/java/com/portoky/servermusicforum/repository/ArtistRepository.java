package com.portoky.servermusicforum.repository;

import com.portoky.servermusicforum.entity.Artist;
import com.portoky.servermusicforum.entity.Music;
import com.portoky.servermusicforum.dto.CountArtistMusicDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
public interface ArtistRepository extends JpaRepository<Artist, Long> {
    @Query(value = "SELECT * FROM artists ORDER BY artist_id OFFSET :offset ROWS FETCH NEXT :pageSize ROWS ONLY", nativeQuery = true)
    List<Artist> findAllForPage(@Param("offset") int offset, @Param("pageSize") int pageSize);

    @Query(value = "SELECT NEW com.portoky.servermusicforum.dto.CountArtistMusicDto(m.artist.artistId, COUNT(m)) FROM Music m GROUP BY m.artist.artistId")
    List<CountArtistMusicDto> countAllArtistsMusic();

}
