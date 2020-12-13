package com.agri.oauth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;

@SpringBootApplication
@EntityScan(basePackages = {"com.agrisoft.user"})
@EnableResourceServer
public class AgriOauthServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(AgriOauthServerApplication.class, args);
	}

}
