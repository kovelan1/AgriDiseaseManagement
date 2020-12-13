package com.agri.oauth.model;

import com.restfb.Facebook;
import com.restfb.types.ProfilePictureSource;

public class DataPictureHolder {
    @Facebook("data")
    public ProfilePictureSource picture;

	public ProfilePictureSource getPicture() {
		return picture;
	}

	public void setPicture(ProfilePictureSource picture) {
		this.picture = picture;
	}
    
    
}