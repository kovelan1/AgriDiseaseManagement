package com.agrisoft.disease;


public class ResponceToDiseaseRec {

	private Disease disease;
	private boolean visited;
	private String sugessions;
	
	public ResponceToDiseaseRec() {
		// TODO Auto-generated constructor stub
	}

	public Disease getDisease() {
		return disease;
	}

	public void setDisease(Disease disease) {
		this.disease = disease;
	}

	
	public boolean isVisited() {
		return visited;
	}

	public void setVisited(boolean visited) {
		this.visited = visited;
	}

	public String getSugessions() {
		return sugessions;
	}

	public void setSugessions(String sugessions) {
		this.sugessions = sugessions;
	}
	
	
}
