package com.agri.notification.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.agrisoft.notification.Notification;

import java.lang.String;
import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long>{

	@Query(value = "SELECT COUNT(*) FROM notification WHERE notification_to='?1' AND seen=false",nativeQuery = true)
	long notificationCount(String user);
	
	List<Notification> findByNotificationToAndSeen(String user,boolean bool);
	
	List<Notification> findByNotificationTo(String user);
	
	
}
