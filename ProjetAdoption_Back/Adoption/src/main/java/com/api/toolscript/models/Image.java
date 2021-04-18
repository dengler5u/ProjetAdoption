package com.api.toolscript.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;

@Entity
@Table(name = "image")
public class Image {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id_image;
	
	private Long idAnimal;
	
	@Lob
	private byte[] image;
	
	
}
