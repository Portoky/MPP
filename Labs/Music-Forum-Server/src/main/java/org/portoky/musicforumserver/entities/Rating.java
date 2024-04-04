package org.portoky.musicforumserver.entities;

public enum Rating {
    ONESTAR(1),
    TWOSTAR(2),
    THREESTAR(3),
    FOURSTAR(4),
    FIVESTAR(5);

    public int getRating() {
        return rating;
    }

    private final int rating;
    Rating (int rating){
        this.rating = rating;
    }


}