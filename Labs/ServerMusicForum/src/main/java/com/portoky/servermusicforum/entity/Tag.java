package com.portoky.servermusicforum.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Tag {
    private @Id
    @GeneratedValue
    @Column(name="TagId")
    Long tagId;


}
