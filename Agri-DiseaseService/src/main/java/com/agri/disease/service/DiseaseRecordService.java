package com.agri.disease.service;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.apache.http.entity.ContentType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.agri.disease.config.AccessToken;
import com.agri.disease.exception.ResourceNotFoundException;
import com.agri.disease.repository.DiseaseRecordRepository;
import com.agri.disease.s3.BucketName;
import com.agri.disease.s3.FileStore;
import com.agrisoft.disease.DiseaseRecord;
import com.agrisoft.disease.ResponceToDiseaseRec;
import com.agrisoft.notification.Events;
import com.agrisoft.notification.Notification;
import com.agrisoft.notification.NotificationRequest;
import com.agrisoft.user.UserDTOList;

@Service
public class DiseaseRecordService {
	@Autowired
	private  FileStore fileStore;
	
	@Autowired DiseaseRecordRepository recordRepository;
	
	@Autowired
    RestTemplate restTemplate;
	
	 String url="http://localhost:";

	public List<DiseaseRecord> getAllRecord() {
		return recordRepository.findAll();
	}
	
	public List<DiseaseRecord> getAllCurrentIssues() {
		List<DiseaseRecord> allRecords=recordRepository.findAll();
		Date nowDate=new Date();
		//get the records which plants will get harvest after from  today
		return allRecords.stream().filter(f->  setHavestDate(f.getCreatedAt(),f.getDaysToHavest()).after(nowDate)).collect(Collectors.toList());
		
	}
	
	public Date setHavestDate(Date date,int havestOn) {
		
		Calendar cal =new  GregorianCalendar();
		cal.setTime(date);
		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
		cal.add(Calendar.DATE, havestOn);
		return cal.getTime();
		
		 
	}

	@Transactional
	public DiseaseRecord createRecord(DiseaseRecord record) {
		UserDTOList dtoList=new UserDTOList();
		try {
			HttpHeaders httpHeaders = new HttpHeaders();
	        httpHeaders.add("Authorization", AccessToken.getAccessToken());
	        HttpEntity<UserDTOList> customHttpEntity = new HttpEntity<>(httpHeaders);
	        
	        ResponseEntity<UserDTOList> responseEntity = restTemplate.exchange(url+"8081/api/user/workingLocation/1/"+record.getLocation(), HttpMethod.GET, customHttpEntity,UserDTOList.class);
	         dtoList=responseEntity.getBody();
	        
	        dtoList.getList().get(0).getUserId();
	       
		} catch (Exception e) {
			System.out.println(e);
		}
		
		List<String> officersList=new ArrayList<String>();
		dtoList.getList().forEach(obj->{
			officersList.add(obj.getUserId());
		});
		
        record.setResponsibleOfficer(officersList.get(0));
        
        DiseaseRecord responceDiseaseRecord= recordRepository.save(record);
        
        Notification notification=new Notification();
		notification.setActionBy(responceDiseaseRecord.getFarmer());
		notification.setActionId(responceDiseaseRecord.getId());
		notification.setCatogory(Events.disease_req_received);
		notification.setMessage("Disease request received");
		
		sendNotification(notification,"officer",officersList);
        
		
		return responceDiseaseRecord;
	}

	public DiseaseRecord getRecordById(long id) throws ResourceNotFoundException {
		return recordRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Record not found"));
	}

	public DiseaseRecord updateRecord(long id, DiseaseRecord record) {
		record.setId(id);
		return recordRepository.save(record);
	}

	public void deleteRecord(long id) {
		recordRepository.deleteById(id);
	}
	
	public byte[] downloadProfileImage(long recordId) throws ResourceNotFoundException{
    	
		DiseaseRecord record = recordRepository.findById(recordId).orElseThrow(()-> new ResourceNotFoundException("not found "));

        String path = String.format("%s/%s/%s",
                BucketName.PROFILE_IMAGE.getBucketName(),
                "disease-record",
               recordId);
        
         return  fileStore.download(path, record.getImageString());
         
    }
	 
	 public void uploadProfileImage(long recordId, MultipartFile file) throws ResourceNotFoundException{
        // 1. Check if image is not empty
        isFileEmpty(file);
        // 2. If file is an image
        isImage(file);

        // 3. The property exists in our database
        DiseaseRecord record = recordRepository.findById(recordId).orElseThrow(()-> new ResourceNotFoundException("not found "));

        // 4. Grab some metadata from file if any
        Map<String, String> metadata = extractMetadata(file);

        // 5. Store the image in s3 and update database (userProfileImageLink) with s3 image link
        String path = String.format("%s/%s/%s", BucketName.PROFILE_IMAGE.getBucketName(),"disease-record", recordId);
        String filename = String.format("%s-%s", file.getOriginalFilename(), UUID.randomUUID());

        try {
            fileStore.save(path, filename, Optional.of(metadata), file.getInputStream());
           record.setImageString(filename);
           recordRepository.save(record);
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

	public List<DiseaseRecord> getRecordOfAi(String aIuserName) {
		
		return recordRepository.findByResponsibleOfficerOrderByCreatedAtDesc(aIuserName);
	}

	public DiseaseRecord responceToReqest(long id, ResponceToDiseaseRec response) throws ResourceNotFoundException {
		
		DiseaseRecord record=recordRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Request not available"));
		record.setAnswred(true);
		record.setAnswredAt(new Date());
		record.setDisease(response.getDisease());
		record.setSugessions(record.getSugessions());
		
		DiseaseRecord responceDiseaseRecord =recordRepository.save(record);
		
		List<String> receiverList=new ArrayList<String>();
		receiverList.add(responceDiseaseRecord.getFarmer());
		
		Notification notification=new Notification();
		notification.setActionBy(responceDiseaseRecord.getFarmer());
		notification.setActionId(responceDiseaseRecord.getId());
		notification.setCatogory(Events.disease_req_answred);
		notification.setMessage("Request get Answred");
		
		sendNotification(notification,"farmer",receiverList);
		
		return responceDiseaseRecord;
	}

	public List<DiseaseRecord> getRecordOfFarmer(String farmerName) {
		// TODO Auto-generated method stub
		return recordRepository.findByFarmerOrderByCreatedAtDesc(farmerName);
	}
	
	private void sendNotification(Notification notification,String receiver,List<String>receiversList) {
		
		NotificationRequest notificationRequest=new NotificationRequest(notification,receiver,receiversList);
		
		HttpEntity<NotificationRequest> request=new HttpEntity<>(notificationRequest);
		
		restTemplate.postForObject(url+"8083/api/notification",request,NotificationRequest.class);
	}


	
	

}
