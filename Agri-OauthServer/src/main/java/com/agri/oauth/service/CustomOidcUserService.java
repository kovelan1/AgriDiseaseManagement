package com.agri.oauth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Service;

import com.agri.oauth.config.OAuth2AccessTokenGenerator;
import com.agri.oauth.model.*;
import com.agri.oauth.repository.UserDetailsRepository;
import com.agrisoft.user.Address;
import com.agrisoft.user.AuthProvider;
import com.agrisoft.user.Role;
import com.agrisoft.user.User;

import java.net.URI;
import java.net.URISyntaxException;
import java.security.ProviderException;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;


@Service
public class CustomOidcUserService extends OidcUserService {

    @Autowired
    private UserDetailsRepository userRepository;
    
    @Autowired
    BCryptPasswordEncoder passwordEncoder;
    
    @Autowired
    OAuth2AccessTokenGenerator tokenGenerator;
    
    
    @Override
    synchronized public OidcUser loadUser(OidcUserRequest userRequest) throws OAuth2AuthenticationException {
        OidcUser oidcUser = super.loadUser(userRequest);
        
        Map attributes = oidcUser.getAttributes();
        
       // OAuth2UserInfo oAuth2UserInfo=OAuth2UserInfoFactory.getOAuth2UserInfo(userRequest.getClientRegistration().getRegistrationId(), attributes);
        GoogleUser googleUser=new GoogleUser(attributes);
        String oauthProvider=userRequest.getClientRegistration().getRegistrationId();
        
        try {
			updateUser(googleUser,oauthProvider);
		} catch (URISyntaxException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
        return oidcUser;
    }

    
    synchronized private void updateUser(GoogleUser userInfo,String oauthProvider) throws URISyntaxException {
        Optional<User> optionalUser = userRepository.findByUsername(userInfo.getEmail());
        User user=new User();
        if(optionalUser.isPresent()) {
            user = optionalUser.get();
            if(!user.getProvider().equals(AuthProvider.valueOf(oauthProvider))) {
            	System.out.print(AuthProvider.valueOf(oauthProvider));
                throw new ProviderException("Looks like you're signed up with " +
                        user.getProvider() + " account. Please use your " + user.getProvider() +
                        " account to login.");
                
            }
        }
        
        Address address=new Address(null,null,null,null,null,0.0,0.0);
        
        Role role=new Role();
        role.setId(2);
        role.setName("ROLE_farmer");
        user.setRole(role);
        user.setProvider(AuthProvider.valueOf(oauthProvider));
        user.setUsername(userInfo.getEmail());
        user.setAccountNonExpired(true);
        user.setAccountNonLocked(true);
        user.setCredentialsNonExpired(true);
        user.setEnabled(true);
        user.setPassword(passwordEncoder.encode(UUID.randomUUID().toString()));
        user.setAddress(address);
        user.setCoverImage(userInfo.getImageUrl());
        user.setFirstName(userInfo.getFirstName());
        user.setLastName(userInfo.getLastName());
        
		userRepository.save(user);
		
	    
    }
    
    public ResponseEntity<Object> errorRedirect(String mgs) throws URISyntaxException {
  	   URI axallant = new URI("http://localhost:3000/oauth/token?access_token="
  				+"&"+"token_type="
  				+"&"+"refresh_token="
  				+"&"+"expires_in="
  				+"&"+"scope="
  				+"&"+"error="+mgs);
  			HttpHeaders httpHeaders = new HttpHeaders();
  			httpHeaders.setLocation(axallant);
  			
  		return	new ResponseEntity<>(httpHeaders, HttpStatus.SEE_OTHER);
  	
     }
  
}