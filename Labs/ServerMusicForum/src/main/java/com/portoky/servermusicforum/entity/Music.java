package com.portoky.servermusicforum.entity;

import jakarta.persistence.*;

@Entity
@Table(name="Music")
public class Music {
    private @Id
    @GeneratedValue
    @Column(name="MusicId")
    Long musicId;
    @Column(name="Title")
    private String title;
    @Column(name="Artist")
    private String artist;
    @Column(name="Rating")
    private Integer rating;
    @Column(name="ReleaseYear")
    private Integer yearOfRelease;

    public Music(){}
    public Music(String title, String artist, Integer rating, Integer yearOfRelease) {
        this.title = title;
        this.artist = artist;
        this.rating = rating;
        this.yearOfRelease = yearOfRelease;
    }

    @Override
    public String toString() {
        return "Music{" +
                "musicId=" + musicId +
                ", title='" + title + '\'' +
                ", artist='" + artist + '\'' +
                ", rating=" + rating +
                ", yearOfRelease=" + yearOfRelease +
                '}';
    }

    public Long getMusicId() {
        return musicId;
    }

    public void setMusicId(Long musicId) {
        this.musicId = musicId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getArtist() {
        return artist;
    }

    public void setArtist(String artist) {
        this.artist = artist;
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



}
