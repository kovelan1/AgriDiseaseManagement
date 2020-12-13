package com.agri.user.controller;

import java.security.Principal;
import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.agri.user.event.OnRegistrationCompleteEvent;
import com.agri.user.exception.ErrorResponse;
import com.agri.user.exception.ResourceNotFoundException;
import com.agri.user.repository.UserRepository;
import com.agri.user.service.UserService;
import com.agrisoft.common.Response;
import com.agrisoft.user.User;
import com.agrisoft.user.UserDTOList;
import com.agrisoft.user.UserDto;
import com.agrisoft.user.VerificationToken;


@RestController
@RequestMapping("/api")
public class UserController {

	@Autowired
	private UserService userService;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	ApplicationEventPublisher eventPublisher;
	
	
//	@PreAuthorize("hasRole('ROLE_superadmin')")
	@GetMapping("/user/all/officers")
	public List<UserDto> getAllOfficers(){
		return userService.getAllOfficers();
	}
	
//	@PreAuthorize("hasRole('ROLE_superadmin')")
	@PostMapping("/user/active/officer/{userName}")
	public Response<String, Boolean> activateOfficer(@PathVariable("userName") String userName) {
		return userService.activateOfficer(userName);
	}
	
	@GetMapping("/user/user-name")
	public String getCurrentuser(Principal principal) {
		return principal.getName();
	}
	
	@GetMapping("/user")
	public UserDto getUserByToken(Principal principal) throws ResourceNotFoundException{
		return userService.getUserbyId(principal.getName());
		
	}
	
	@GetMapping("/user/{userName}")
	public UserDto getUserByToken(@PathVariable("userName") String userName) throws ResourceNotFoundException{
		return userService.getUserbyId(userName);
		
	}
	
	@GetMapping("/user/workingLocation/{roleId}/{location}")
	public UserDTOList getUserByLocationAndRole(@PathVariable("roleId")int  roleId,@PathVariable("location") String location) throws ResourceNotFoundException {
		return userService.getUserByRoleAndLocation(roleId,location);
	}
	
	
	@GetMapping("/user/isAvailable/{userName}")
	public boolean checkAvailable(@PathVariable(value ="userName") String userName){
		if(userRepository.existsById(userName)){
			return true;
		}
		else {
			return false;
		}
		
	}
	
	@PostMapping("/user/signup-user")
	public ResponseEntity<?> createUser(@RequestBody User user) {
		if(userRepository.existsById(user.getUsername())) {
			return ResponseEntity.badRequest().body(new ErrorResponse(null,null,"Email address already in use.",""));
			//throw new BadRequestException("Email address already in use.");
		}
		User resultUser=userService.createUser(user);
		if(!user.isEnabled()) {
			eventPublisher.publishEvent(new OnRegistrationCompleteEvent(resultUser, 
			          null));
		}
		
		return ResponseEntity.ok().body(resultUser);
	}
	
	
	@PostMapping("/user/registrationConfirmation")
	public Response<Boolean, String> confirmRegistration
	  (@RequestParam("token") String token) {
	 
	    VerificationToken verificationToken = userService.getVerificationToken(token);
	    if (verificationToken == null) {
	        return new Response<Boolean, String>(false, "invalid");
	    }
	    
	    User user = verificationToken.getUser();
	    Calendar cal = Calendar.getInstance();
	    if ((verificationToken.getExpiryDate().getTime() - cal.getTime().getTime()) <= 0) {
	    	return new Response<Boolean, String>(false, "expired");
	    } 
	    
	    user.setEnabled(true); 
	    userService.updateUser(user); 
	    return new Response<Boolean, String>(true, "sucessfully verified");
	}
	
	//Resends the registration confirmation link 
	@PostMapping("/user/resend/token")
	public Response<Boolean, String> resendRegistrationToken(@RequestParam("token") String token){
		
		 VerificationToken verificationToken = userService.getVerificationToken(token);
		    if (verificationToken == null) {
		        return new Response<Boolean, String>(false, "invalid");
		    }
		    
		    User user = verificationToken.getUser();
		    if(!user.isEnabled()) {
				eventPublisher.publishEvent(new OnRegistrationCompleteEvent(user,null));
				return new Response<Boolean, String>(true, "sucess");
			    
			}else {
				return new Response<Boolean, String>(false, "user is verified alredy");
			}
	}
	
	
	//update the user in after google/facebook signup 
	@PostMapping("/user/update-user")
	public Response<Boolean, String> updateUser(@RequestBody User userDt,Principal principal)throws ResourceNotFoundException{
		 User user=userRepository.findById(principal.getName()).orElseThrow(()->new ResourceNotFoundException("user not available"));
		 user.setAddress(userDt.getAddress());
		 user.setWorkingLocation(userDt.getWorkingLocation());
		 userService.createUser(user);
		 return new Response<Boolean, String>(true, "sucess");
	}
	
	
	@PostMapping(path= "user/image/upload",
			 consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
	         produces = MediaType.APPLICATION_JSON_VALUE)
	public Response<String, Boolean> uploadImage(
			@RequestParam("file") MultipartFile file,
			Principal principal)throws ResourceNotFoundException {
		userService.uploadProfileImage(principal.getName(), file);
		return new Response<>("Image uploaded", true);
	}
	
	@GetMapping("/user/{userId}/image/download")
    public byte[] downloadProfileImage(@PathVariable("userId") String userId) throws ResourceNotFoundException{
        return userService.downloadProfileImage(userId);
    }
	
	@GetMapping("/user-service/health")
	public ResponseEntity<String> responseEntity(){
		return ResponseEntity.ok("");
	}
	
	@GetMapping("/user-service/x")
	public String hi(){
		return "hello1";
	}
	
}
