package com.agri.oauth.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.oauth2.client.web.AuthorizationRequestRepository;
import org.springframework.security.oauth2.client.web.HttpSessionOAuth2AuthorizationRequestRepository;

import com.agri.oauth.service.CustomOAuth2UserRegServiceF;


@Configuration
@Order(1)
public class OAuth2Configuration extends WebSecurityConfigurerAdapter {

	@Autowired
    private CustomOAuth2UserRegServiceF customOAuth2UserService;
	
	@Autowired
    private OAuth2AuthenticationFailureHandler authenticationFailureHandler;

	
	@Bean
	public AuthorizationRequestRepository customAuthorizationRequestRepository() {
		return new HttpSessionOAuth2AuthorizationRequestRepository();
	}
	
	@Override
    protected void configure(HttpSecurity http) throws Exception {
		http
        .antMatcher("/**").authorizeRequests()
        .anyRequest().authenticated()
        .and()
        .oauth2Login()
        .redirectionEndpoint()
        .and()
        .userInfoEndpoint()
        .userService(customOAuth2UserService)
        .and()
        .failureHandler(authenticationFailureHandler);
        
    }

}