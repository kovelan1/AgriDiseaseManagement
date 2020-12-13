package com.agri.oauth.model;


import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.agrisoft.user.User;


public class AuthUserDetail extends User implements UserDetails{


	public AuthUserDetail() {
		
	}

	public AuthUserDetail(User user) {
		super(user);
		// TODO Auto-generated constructor stub
	}

	@Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
		
		List<GrantedAuthority> grantedAuthority = new ArrayList<>();

        
        	grantedAuthority.add(new SimpleGrantedAuthority(getRole().getName()));
            getRole().getPermissions().forEach(permission -> {
            	grantedAuthority.add(new SimpleGrantedAuthority(permission.getName()));
            });

        
        return grantedAuthority;
	}

	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return super.getPassword();
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return super.getUsername();
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return super.isAccountNonExpired();
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return super.isAccountNonLocked();
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return super.isCredentialsNonExpired();
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return super.isEnabled();
	}

	
}
