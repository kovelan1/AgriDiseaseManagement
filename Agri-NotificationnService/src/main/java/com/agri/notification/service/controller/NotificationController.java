package com.agri.notification.service.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.agri.notification.exception.ResourceNotFoundException;
import com.agri.notification.service.NotificationService;
import com.agrisoft.common.Response;
import com.agrisoft.notification.Notification;
import com.agrisoft.notification.NotificationRequest;



@RestController
@RequestMapping("/api")
public class NotificationController {
	
	@Autowired
	private NotificationService notificationService;
	
	//this will call in other services along with the functions which are needs notification
	@PostMapping("/notification")
	public List<Notification> create(@RequestBody NotificationRequest notification) {
		return notificationService.createNotification(notification.getNotification(),notification.getRecipientType(),notification.getRecipients());
	}
	
	//get the unseen count - this data will be shown in the notification count 
    @GetMapping("/notification/count/{user}")
    public int numberofcoulmn(@PathVariable(value = "user") String user) {
    	return notificationService.notificationCount(user);
    }
    
    //update the seen status, once the user click the notification in the ui this method need to call,
    @GetMapping("/notification/notification-update/{notificationId}")
    public Response<Notification, Boolean> notificationUpdate(@PathVariable(value = "notificationId") long notificationId) throws ResourceNotFoundException {
    	 
    	 Response< Notification, Boolean> responce=new Response<>();
    	 responce.setData(notificationService.updateSeen(notificationId));
    	 responce.setStatus(true);
    	 return responce;
    }
    
    //get all the notifications belongs to the login user 
    @GetMapping("/notification/{recipient}")
    public Response<?, Boolean>getNotificationByRecipient(@PathVariable(value = "recipient") String recipient){
    	 Response< List<Notification>, Boolean> responce=new Response<>();
    	 responce.setData(notificationService.getNotificationByRecipient(recipient));
    	 responce.setStatus(true);
    	 return responce;
    }
    
    //delete the notification
    @DeleteMapping("/notification/{notificationId}")
    public Response<String, Boolean> notificationdelete(@PathVariable(value = "notificationId") long notificationId) {
   	
   	 Response< String, Boolean> responce=new Response<>();
   	 responce.setData( notificationService.delete(notificationId));
   	 responce.setStatus(true);
   	 return responce;
   }
    
  
   
    //get unseen count by disease request 
    
   
    //get unseen count by disease response
    
    
   
}