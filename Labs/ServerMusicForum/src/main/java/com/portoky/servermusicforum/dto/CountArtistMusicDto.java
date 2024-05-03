package com.portoky.servermusicforum.dto;

public class CountArtistMusicDto {
    private Long artistId;
    private Long count;

    public CountArtistMusicDto(Long artistId, Long count) {
        this.artistId = artistId;
        this.count = count;
    }

    public Long getArtistId() {
        return artistId;
    }

    public void setArtistId(Long artistId) {
        this.artistId = artistId;
    }

    public Long getCount() {
        return count;
    }

    public void setCount(Long count) {
        this.count = count;
    }


}
