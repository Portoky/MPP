package com.portoky.servermusicforum.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="Artists")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "musicList"})
public class Artist {
    private @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ArtistId")
    Long artistId;
    @Column(name="Name")
    private String name;
    @Column(name="Biography")
    private String biography;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "artist", cascade = CascadeType.ALL)
    private List<Music> musicList = new ArrayList<>();

    public Artist(String name, String biography) {
        this.name = name;
        this.biography = biography;
    }

    public Artist(){

    }

    public Long getArtistId() {
        return artistId;
    }

    public void setArtistId(Long artistId) {
        this.artistId = artistId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBiography() {
        return biography;
    }

    public void setBiography(String biography) {
        this.biography = biography;
    }

    public List<Music> getMusicList() {
        return musicList;
    }

    public void setMusicList(List<Music> musicList) {
        this.musicList = musicList;
    }

    @Override
    public String toString() {
        return "Tag{" +
                "artistId=" + artistId +
                ", name='" + name + '\'' +
                ", biography='" + biography + '\'' +
                '}';
    }
}
