package com.agri.oauth.model;

import com.restfb.Facebook;

public class FacebookUser {

	@Facebook("first_name")
    private String firstName;
 
    @Facebook("last_name")
    private String lastName;
 
    @Facebook("name")
    private String fullName;
 
    @Facebook
    private String email;
    
    private DataPictureHolder pictureHolder;
 
    public String getFirstName() {
        return firstName;
    }
 
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }
 
    public String getLastName() {
        return lastName;
    }
 
    public void setLastName(String lastName) {
        this.lastName = lastName;
    }
 
    public String getFullName() {
        return fullName;
    }
 
    public void setFullName(String fullName) {
        this.fullName = fullName;
    }
 
    public String getEmail() {
        return email;
    }
 
    public void setEmail(String email) {
        this.email = email;
    }

	public DataPictureHolder getPictureHolder() {
		return pictureHolder;
	}

	public void setPictureHolder(DataPictureHolder pictureHolder) {
		this.pictureHolder = pictureHolder;
	}

	
    
}
