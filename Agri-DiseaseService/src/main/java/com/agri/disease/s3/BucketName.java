package com.agri.disease.s3;

public enum BucketName {

	
	PROFILE_IMAGE("imagefilesproject");
	

	private final String bucketName;
	
	
	BucketName(String bucketName){
		this.bucketName=bucketName;
	
	}
	
	public String getBucketName() {
		return bucketName;
	}
	
}
