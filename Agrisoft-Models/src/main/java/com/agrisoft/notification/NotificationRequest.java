package com.agrisoft.notification;

import java.util.List;


public class NotificationRequest {
	
	private Notification notification;
	private String recipientType;
	private List<String> recipients;
	
	public NotificationRequest() {}

	public NotificationRequest(Notification notification, String recipientType, List<String> recipients) {
		super();
		this.notification = notification;
		this.recipientType = recipientType;
		this.recipients = recipients;
	}

	

	public Notification getNotification() {
		return notification;
	}

	public void setNotification(Notification notification) {
		this.notification = notification;
	}

	public String getRecipientType() {
		return recipientType;
	}

	public void setRecipientType(String recipientType) {
		this.recipientType = recipientType;
	}

	public List<String> getRecipients() {
		return recipients;
	}

	public void setRecipients(List<String> recipients) {
		this.recipients = recipients;
	}

	
	
	

}
