package com.agrisoft.common;

public class Response<D,S>{
	 private D data;
	 private S status;
	 
	public Response() {} 
	public Response(D data, S status) {
		super();
		this.data = data;
		this.status = status;
	}
	
	public D getData() {
		return data;
	}
	public void setData(D data) {
		this.data = data;
	}
	public S getStatus() {
		return status;
	}
	public void setStatus(S status) {
		this.status = status;
	}
	 
	 

}
