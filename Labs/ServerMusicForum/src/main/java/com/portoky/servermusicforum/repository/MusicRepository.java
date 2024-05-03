package com.portoky.servermusicforum.repository;

import com.portoky.servermusicforum.entity.Music;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MusicRepository extends JpaRepository<Music, Long> {
    List<Music> findByArtistArtistId(Long artistId);

    @Query(value = "SELECT * FROM musics ORDER BY music_id OFFSET :offset ROWS FETCH NEXT :pageSize ROWS ONLY", nativeQuery = true)
    List<Music> findAllForPage(@Param("offset") int offset, @Param("pageSize") int pageSize);

    @Query(value = "SELECT * FROM musics WHERE artist_id = :artistId ORDER BY music_id  OFFSET :offset ROWS FETCH NEXT :pageSize ROWS ONLY", nativeQuery = true)
    List<Music> findAllArtistMusicForPage(@Param("offset") int offset, @Param("pageSize") int pageSize, @Param("artistId") Long artistId);
}
