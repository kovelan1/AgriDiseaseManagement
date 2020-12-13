package com.agri.oauth.controller;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.security.Principal;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.core.AuthenticationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.agri.oauth.config.OAuth2AccessTokenGenerator;
import com.agri.oauth.exception.ResourceNotFoundException;
import com.agri.oauth.model.AuthUserDetail;
import com.agri.oauth.repository.UserDetailsRepository;
import com.agrisoft.user.User;
import com.nimbusds.oauth2.sdk.ErrorResponse;

@RestController
public class OauthController {


	
	@Autowired
    private UserDetailsRepository userRepository;
	
	@Autowired
    OAuth2AccessTokenGenerator tokenGenerator;
	

//	
//	@GetMapping(value = "/")
//	public String tokenResponce(Principal principal,ConnectionRepository connectionRepository) {
//		
//		if(connectionRepository.findPrimaryConnection(Facebook.class) == null) {
//          return "redirect:/connect/facebook";
//		}
//			
//		
//		String emailString="";
//		String principalString=principal.toString();
//		String [] dataStrings=principalString.split(",");
//		
//		
//		for(String ss:dataStrings) {
//			if(ss.startsWith(" email=")) {
//				emailString = ss.substring(ss.indexOf("=")+1, ss.lastIndexOf("}"));
//				break;
//			}
//		}
		
//		User result =userRepository.findByUsername(emailString);
//		
//		AuthUserDetail oauthUser=new AuthUserDetail(result);
//		    
//		OAuth2AccessToken tokengen= tokenGenerator.generate(oauthUser,"mobile");
//		    
//		return new TokenModel(tokengen.getValue(),tokengen.getTokenType(),tokengen.getRefreshToken().getValue(),tokengen.getExpiresIn(),tokengen.getScope());
//		
//		return emailString;
//	}
	


	

	@GetMapping(value = "/")
	public ResponseEntity<Object> redirectToExternalUrl(@AuthenticationPrincipal OAuth2User principal) 
			throws URISyntaxException,ResourceNotFoundException {
	   
	    String emailString=principal.getAttribute("email").toString();

		User result =userRepository.findByUsername(emailString).orElseThrow(()-> new ResourceNotFoundException("no user found"));
		
		AuthUserDetail oauthUser=new AuthUserDetail(result);
		    
		OAuth2AccessToken tokengen= tokenGenerator.generate(oauthUser,"web");
		    
		URI axallant = new URI("http://localhost:3000/oauth/token?access_token="+tokengen.getValue() 
		 																+"&"+"token_type="+tokengen.getTokenType()
		 																+"&"+"refresh_token="+tokengen.getRefreshToken().getValue()
		 																+"&"+"expires_in="+tokengen.getExpiresIn()
		 																+"&"+"scope="+tokengen.getScope());
		 
		HttpHeaders httpHeaders = new HttpHeaders();
		httpHeaders.setLocation(axallant);
		
	    return new ResponseEntity<>(httpHeaders, HttpStatus.SEE_OTHER);
	    
	}
	
	
	
	@GetMapping(value = "/oauth/errors")
	public void error(AuthenticationException exception)throws IOException, URISyntaxException{
		
		//System.out.print(principal.toString());
		
//		URI axallant = new URI("http://localhost:3000/oauth/token?access_token="
//			+"&"+"token_type="
//			+"&"+"refresh_token="
//			+"&"+"expires_in="
//			+"&"+"scope="
//			+"&"+"error=");
//		HttpHeaders httpHeaders = new HttpHeaders();
//		httpHeaders.setLocation(axallant);
//		
//		return new ResponseEntity<>(httpHeaders, HttpStatus.SEE_OTHER);
		System.out.print(exception.getLocalizedMessage());
		//String message = request.getSession().getAttribute("error.message").toString();
		//request.getSession().removeAttribute("error.message");
		//return message;
	}
	
//	private Facebook facebook;
//	
//	private ConnectionRepository connectionRepository;
//    
//    
//    public OauthController() {
//		// TODO Auto-generated constructor stub
//	}
//	
//	
//    public OauthController(Facebook facebook, ConnectionRepository connectionRepository) {
//        this.facebook = facebook;
//        this.connectionRepository = connectionRepository;
//    }
//
//   // @RequestMapping(value = "feed", method = RequestMethod.GET)
//    @GetMapping(value = "/")
//    public String feed(Model model) {
//
//        if(connectionRepository.findPrimaryConnection(Facebook.class) == null) {
//            return "redirect:/connect/facebook";
//        }
//
//        User userProfile = facebook.userOperations().getUserProfile();
//        model.addAttribute("userProfile", userProfile);
//        PagedList<Post> userFeed = facebook.feedOperations().getFeed();
//        model.addAttribute("userFeed", userFeed);
//        //return "feed";
//        return userProfile.getEmail();
//    }

//	String principalString=principal.toString();
//	String [] dataStrings=principalString.split(",");
//	
//	for(String ss:dataStrings) {
//		if(ss.startsWith(" email=")) {
//			emailString = ss.substring(ss.indexOf("=")+1, ss.lastIndexOf("}"));
//			break;
//		}
//	}

}
