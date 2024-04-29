package com.portoky.servermusicforum.entity;

import jakarta.persistence.*;

@Entity
@Table(name="Musics")
public class Music {
    private @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="MusicId")
    Long musicId;
    @Column(name="Title")
    private String title;

    @Column(name="Rating")
    private Integer rating;
    @Column(name="ReleaseYear")
    private Integer yearOfRelease;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH})
    @JoinColumn(name = "artist_id")
    private Artist artist;

    public Music(){}
    public Music(String title, Integer rating, Integer yearOfRelease) {
        this.title = title;
        this.rating = rating;
        this.yearOfRelease = yearOfRelease;
    }

    public Music(String title, Integer rating, Integer yearOfRelease, Artist artist) {
        this.title = title;
        this.rating = rating;
        this.yearOfRelease = yearOfRelease;
        this.artist = artist;
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

    public Artist getArtist() {
        return artist;
    }

    public void setArtist(Artist artist) {
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
