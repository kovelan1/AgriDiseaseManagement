package com.agri.oauth.model;

import java.util.Map;

public class GoogleUser {
	
	protected Map<String, Object> attributes;

    public GoogleUser(Map<String, Object> attributes) {
        this.attributes = attributes;
    }
    
   
    
    public String getId() {
        return (String) attributes.get("sub");
    }

   
    public String getName() {
        return (String) attributes.get("name");
    }

  
    public String getEmail() {
        return (String) attributes.get("email");
    }

    
    public String getImageUrl() {
        return (String) attributes.get("picture");
    }

	public String getFirstName() {
		return (String) attributes.get("given_name");
	}

	public String getLastName() {
		return (String) attributes.get("family_name");
	}
}
