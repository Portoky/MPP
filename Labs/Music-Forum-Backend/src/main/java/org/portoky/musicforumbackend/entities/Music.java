package org.portoky.musicforumbackend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Music {
    private @Id
    @GeneratedValue Long serialId;
    private String title;
    private String artist;
    private Integer rating;
    private Integer yearOfRelease;
    public Long getSerialId() {
        return serialId;
    }
    public void setSerialId(Long serialId) {
        this.serialId = serialId;
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
    public Music(String title, String artist, Integer rating, Integer yearOfRelease) {
        this.title = title;
        this.artist = artist;
        this.rating = rating;
        this.yearOfRelease = yearOfRelease;
    }
    public Music() {
    }

    @Override
    public String toString() {
        return "Music{" +
                "serialId=" + serialId +
                ", title='" + title + '\'' +
                ", artist='" + artist + '\'' +
                ", rating=" + rating +
                ", yearOfRelease=" + yearOfRelease +
                '}';
    }
}
