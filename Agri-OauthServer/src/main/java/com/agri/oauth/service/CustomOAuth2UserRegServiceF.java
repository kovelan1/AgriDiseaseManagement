package com.agri.oauth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.net.URI;
import java.net.URISyntaxException;
import java.security.ProviderException;
import java.util.Optional;
import java.util.UUID;

import com.agri.oauth.model.*;
import com.agri.oauth.repository.UserDetailsRepository;
import com.agrisoft.user.Address;
import com.agrisoft.user.AuthProvider;
import com.agrisoft.user.User;
import com.restfb.DefaultFacebookClient;
import com.restfb.FacebookClient;
import com.restfb.Parameter;
import com.restfb.Version;
@Service
public class CustomOAuth2UserRegServiceF extends DefaultOAuth2UserService {
//this method for get the facebook data 
    @Autowired
    private UserDetailsRepository userRepository;
    
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    synchronized public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
    	//String toeknString=oAuth2UserRequest.getAccessToken().getTokenValue();
    	
        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);
        try {
            return processOAuth2User(oAuth2UserRequest, oAuth2User);
        } catch (AuthenticationException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) throws URISyntaxException {
    	
    	//next Oauth2UserInfo class ignore bcz to customize the fb data and to use restfb api
       // OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(oAuth2UserRequest.getClientRegistration().getRegistrationId(), oAuth2User.getAttributes());
    	
    	String toeknString=oAuth2UserRequest.getAccessToken().getTokenValue();
    	
    	FacebookClient facebookClient=new DefaultFacebookClient(toeknString, Version.LATEST);
    	
		FacebookUser facebookUser = facebookClient.fetchObject("me",FacebookUser.class, 
											Parameter.with("fields","name,id,email,first_name,last_name"));
		
		//Separate class created for get the picture with large size.
		DataPictureHolder picture = 
        		facebookClient.fetchObject("me/picture", 
        				DataPictureHolder.class, Parameter.with("type","large"), // the image size
        		       Parameter.with("redirect","false"));
		
		facebookUser.setPictureHolder(picture);
    	
    	if(StringUtils.isEmpty(facebookUser.getEmail())) {
            throw new ProviderException("Email not found from OAuth2 provider");
        }

        Optional<User> userOptional = userRepository.findByUsername(facebookUser.getEmail());
        User user;
        
        if(userOptional.isPresent()) {
            user = userOptional.get();
            if(!user.getProvider().equals(AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()))) {
                throw new ProviderException("Looks like you're signed up with " +
                        user.getProvider() + " account. Please use your " + user.getProvider() +
                        " account to login.");
                
            }
            user = updateExistingUser(user,facebookUser);
        } else {
            user = registerNewUser(oAuth2UserRequest,facebookUser);
        }

        return UserPrincipal.create(user, oAuth2User.getAttributes());
    }

    private User registerNewUser(OAuth2UserRequest oAuth2UserRequest, FacebookUser facebookUser) {
	
        User user = new User();
        user.setProvider(AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()));
        Address address=new Address(null,null,null,null,null,0.0,0.0);

      	user.setAccountNonExpired(true);
	    user.setAccountNonLocked(true);
	    user.setCredentialsNonExpired(true);
	    user.setEnabled(true);
	    user.setPassword(passwordEncoder.encode(UUID.randomUUID().toString()));
	    user.setAddress(address);
        user.setFirstName(facebookUser.getFirstName());
        user.setLastName(facebookUser.getLastName());
        user.setUsername(facebookUser.getEmail());
        user.setCoverImage(facebookUser.getPictureHolder().getPicture().getUrl().toString());
        return userRepository.save(user);
    }

    private User updateExistingUser(User existingUser,FacebookUser facebookUser) {
    	existingUser.setFirstName(facebookUser.getFirstName());
    	existingUser.setLastName(facebookUser.getLastName());
        existingUser.setCoverImage(facebookUser.getPictureHolder().getPicture().getUrl().toString());
        return userRepository.save(existingUser);
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