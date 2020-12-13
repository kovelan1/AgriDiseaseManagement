package com.agri.user.s3;

public enum BucketName {

	
	PROFILE_IMAGE("property-management-image");
	

	private final String bucketName;
	
	
	BucketName(String bucketName){
		this.bucketName=bucketName;
	
	}
	
	public String getBucketName() {
		return bucketName;
	}
	
}
