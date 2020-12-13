package com.agri.user.service;

import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import javax.transaction.Transactional;

import org.apache.http.entity.ContentType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.agri.user.exception.ResourceNotFoundException;
import com.agri.user.repository.*;
import com.agri.user.s3.BucketName;
import com.agri.user.s3.FileStore;
import com.agrisoft.user.*;




@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private  FileStore fileStore;
	
	@Autowired
    private VerificationTokenRepository tokenRepository;
	

	

	public User getUserbyId(String name) throws ResourceNotFoundException {
		return userRepository.findById(name).orElseThrow(()-> new ResourceNotFoundException("user not found "+name));
	}

	@Transactional
	public User createUser(User user){
		String password=user.getPassword();
		String encodePass=passwordEncoder.encode(password);
		user.setPassword(encodePass);
		//user.setEnabled(false);
		//confirmRegistration(user);
		
		return userRepository.save(user);
		
	}
	
	public void updateUser(User user){
		userRepository.save(user);
	}
	
	public byte[] downloadProfileImage(String UserName) throws ResourceNotFoundException{
	    	
        User user = userRepository.findById(UserName).orElseThrow(()-> new ResourceNotFoundException("not found "));

        String path = String.format("%s/%s/%s",
                BucketName.PROFILE_IMAGE.getBucketName(),
                "user",
               user.getUsername());
        
         return user.getCoverImage()
        		.map(key -> fileStore.download(path, key))
                .orElse(new byte[0]);
         
    }
	 
	 public void uploadProfileImage(String userName, MultipartFile file) throws ResourceNotFoundException{
        // 1. Check if image is not empty
        isFileEmpty(file);
        // 2. If file is an image
        isImage(file);

        // 3. The property exists in our database
        User user = userRepository.findById(userName).orElseThrow(()-> new ResourceNotFoundException("not found "));

        // 4. Grab some metadata from file if any
        Map<String, String> metadata = extractMetadata(file);

        // 5. Store the image in s3 and update database (userProfileImageLink) with s3 image link
        String path = String.format("%s/%s/%s", BucketName.PROFILE_IMAGE.getBucketName(),"user", user.getUsername());
        String filename = String.format("%s-%s", file.getOriginalFilename(), UUID.randomUUID());

        try {
            fileStore.save(path, filename, Optional.of(metadata), file.getInputStream());
           user.setCoverImage(filename);
           userRepository.save(user);
        } catch (IOException e) {
            throw new IllegalStateException(e);
        }

    }
	 
	 private Map<String, String> extractMetadata(MultipartFile file) {
        Map<String, String> metadata = new HashMap<>();
        metadata.put("Content-Type", file.getContentType());
        metadata.put("Content-Length", String.valueOf(file.getSize()));
        return metadata;
    }
	
	private void isImage(MultipartFile file) {
        if (!Arrays.asList(
        		ContentType.IMAGE_JPEG.getMimeType(),
        		ContentType.IMAGE_PNG.getMimeType(),
        		ContentType.IMAGE_GIF.getMimeType()).contains(file.getContentType())) {
            throw new IllegalStateException("File must be an image [" + file.getContentType() + "]");
        }
    }

    private void isFileEmpty(MultipartFile file) {
        if (file.isEmpty()) {
            throw new IllegalStateException("Cannot upload empty file [ " + file.getSize() + "]");
        }
    }
    
    
    public VerificationToken getVerificationToken(String VerificationToken) {
        return tokenRepository.findByToken(VerificationToken);
    }
    
    public void createVerificationToken(User user, String token) {
        VerificationToken myToken = new VerificationToken(token, user);
        tokenRepository.save(myToken);
    }

	
	
}
