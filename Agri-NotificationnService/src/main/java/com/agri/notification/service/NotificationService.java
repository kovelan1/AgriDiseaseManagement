package com.agri.notification.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.agri.notification.exception.ResourceNotFoundException;
import com.agri.notification.repository.NotificationRepository;
import com.agrisoft.notification.Notification;


@Service
public class NotificationService {

	private  SimpMessagingTemplate template;
	
	public NotificationService(SimpMessagingTemplate template) {
		this.template=template;
	}
	
	@Autowired
	private NotificationRepository notificationRepository;
	
	
	@Bean
    RestTemplate getRestTemplate(RestTemplateBuilder builder){
        return builder.build();
    }

    @Autowired
    RestTemplate restTemplate;
	
	public int notificationCount(String user) {
		List<Notification> notifications=notificationRepository.findByNotificationToAndSeen(user, false);
		return notifications.size();
	}
	
	public List<Notification> createNotification(Notification notification, String recipientType, List<String> recipients) {
		
		recipients.forEach(
			(recipient)->{
				Notification newNotification=new Notification();
				newNotification.setActionId(notification.getActionId());
				newNotification.setActionBy(notification.getActionBy());
				newNotification.setCatogory(notification.getCatogory());
				newNotification.setNotificationTo(recipient);
				newNotification.setSeen(false);
				newNotification.setMessage(notification.getMessage());
				notificationRepository.save(newNotification);
				
			}
		);
		
		this.template.convertAndSend("/officer/user",""); // this method will hit the client service, once this message received in the client, 
															//client will call the count and notification get methods 
		return null;
	}
	
	public List<Notification> getNotificationByRecipient(String user){
		return notificationRepository.findByNotificationTo(user);
	}
	
	public Notification updateSeen(long notificationId) throws ResourceNotFoundException {
		Notification notification=notificationRepository.findById(notificationId).orElseThrow(()-> new ResourceNotFoundException("not found "));
		notification.setSeen(true);
		Notification savedNotification=notificationRepository.save(notification);
		
		this.template.convertAndSend("/officer/user","");// same as createNotification function
		return savedNotification;
	}
	
	public String delete(long notificationId) {
		notificationRepository.deleteById(notificationId);
		this.template.convertAndSend("/officer/user","");
		return "deleted";
	}

	
//	public List<Notification> getNotificationByProperty(long propertyId) {
//		
//		HttpHeaders httpHeaders = new HttpHeaders();
//		HttpEntity<ViewRenatlEntity> customHttpEntity = new HttpEntity<>(httpHeaders);
//		ResponseEntity<Object[]> view=restTemplate.exchange("https://api.axallant.com/api/property/listingId/"+propertyId,HttpMethod.GET,customHttpEntity,Object[].class);
//		List<Object> entitiesObjects=Arrays.asList(view.getBody());
//		
//		List<Notification> notifications=new ArrayList<Notification>();
//		
//		
//		List<Long> idsList=entitiesObjects.stream()
//		   .map(object ->Long.parseLong(object.toString()))
//		   .collect(Collectors.toList()); 
//		idsList.forEach(id->{
//			notifications.addAll(notificationRepository.findByRentalEnitiyId(id));
//		});
//		
//		return notifications;
//	}
	
	
	
	
	
}
