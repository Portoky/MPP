package com.portoky.servermusicforum.dto;

import com.portoky.servermusicforum.entity.Artist;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

public class MusicDto {
    private Long musicId;
    private String title;
    private Integer rating;
    private Integer yearOfRelease;
    private Long artistId;

    public MusicDto(Long musicId, String title, Integer rating, Integer yearOfRelease, Long artistId) {
        this.musicId = musicId;
        this.title = title;
        this.rating = rating;
        this.yearOfRelease = yearOfRelease;
        this.artistId = artistId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public Integer getYearOfRelease() {
        return yearOfRelease;
    }

    public void setYearOfRelease(Integer yearOfRelease) {
        this.yearOfRelease = yearOfRelease;
    }

    public Long getArtistId() {
        return artistId;
    }

    public void setArtistId(Long artistId) {
        this.artistId = artistId;
    }

    public Long getMusicId() {
        return musicId;
    }
    public void setMusicId(Long musicId) {
        this.musicId = musicId;
    }
}
