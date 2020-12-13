package com.agri.disease.controller;


import java.security.Principal;
import java.util.List;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.agri.disease.exception.ResourceNotFoundException;
import com.agri.disease.service.DiseaseRecordService;
import com.agri.disease.service.DiseaseService;
import com.agri.disease.service.WeatherService;
import com.agrisoft.common.Response;
import com.agrisoft.disease.Disease;
import com.agrisoft.disease.DiseaseRecord;
import com.agrisoft.disease.ResponceToDiseaseRec;
import com.agrisoft.disease.WeatherResponse;


@RestController
@RequestMapping("/api")
public class DiseaseController {

	@Autowired
	private DiseaseService diseaseService;
	
	@Autowired
	private DiseaseRecordService diseaseRecoardService;
	
	@Autowired
	private WeatherService weatherService;
	
	//##############  Disease api
	
	@GetMapping("/diseases")
	public List<Disease> getAll() {
		Disease disease=new Disease();
		System.out.println(disease.toString());
		return diseaseService.getAllDisease();
	}
	
	@PostMapping("/disease")
	public Disease createDisease(@RequestBody Disease disease) {
		return diseaseService.createDisease(disease);
	}
	
	@GetMapping("/disease/{id}")
	public Disease getById(@PathVariable("id")long id) throws ResourceNotFoundException {
		return diseaseService.getDiseaseById(id);
	}
	
	@PutMapping("/disease/{id}")
	public Disease updateDisease(@RequestBody Disease disease,@PathVariable("id")long id) throws ResourceNotFoundException {
		return diseaseService.updateDisease(id,disease);
	}
	
	@DeleteMapping("/disease/{id}")
	public void deleteById(@PathVariable("id")long id) throws ResourceNotFoundException {
		 diseaseService.deleteDisease(id);
	}
	
	//#############################   diseases Record api
	
	@GetMapping("/diseasesRecords")
	public List<DiseaseRecord> getAllRecord() {
		return diseaseRecoardService.getAllRecord();
	}
	
	@GetMapping("/diseasesRecords/current")
	public List<DiseaseRecord> getAllCurrentIssues() {
		return diseaseRecoardService.getAllCurrentIssues();
	}
	
	@PostMapping("/diseasesRecord")
	public DiseaseRecord createRecord(@RequestBody DiseaseRecord record) {
		return diseaseRecoardService.createRecord(record);
	}
	
	@GetMapping("/diseasesRecord/{id}")
	public DiseaseRecord getRecordById(@PathVariable("id")long id) throws ResourceNotFoundException {
		return diseaseRecoardService.getRecordById(id);
	}
	
	@GetMapping("/diseasesRecord/ai/{aIuserName}")
	public List<DiseaseRecord> getRecordofAiOfficer(@PathVariable("aIuserName")String aIuserName) throws ResourceNotFoundException {
		return diseaseRecoardService.getRecordOfAi(aIuserName);
	}
	
	
	@GetMapping("/diseasesRecord/farmer/{farmerName}")
	public List<DiseaseRecord> getRecordofFarmer(@PathVariable("farmerName")String farmerName) throws ResourceNotFoundException {
		return diseaseRecoardService.getRecordOfFarmer(farmerName);
	}
	
	@PutMapping("/diseasesRecord/{id}")
	public DiseaseRecord updateRecord(@RequestBody DiseaseRecord record,@PathVariable("id")long id) throws ResourceNotFoundException {
		return diseaseRecoardService.updateRecord(id,record);
	}
	
	@PutMapping("/diseasesRecord/responce/{id}")
	public DiseaseRecord responceToRecord(@RequestBody ResponceToDiseaseRec response,@PathVariable("id")long id) throws ResourceNotFoundException {
		return diseaseRecoardService.responceToReqest(id,response);
	}
	
	@DeleteMapping("/diseasesRecord/{id}")
	public void deleteRecordById(@PathVariable("id")long id) throws ResourceNotFoundException {
		diseaseRecoardService.deleteRecord(id);
	}
	
	@PostMapping(path= "/diseasesRecord/image/upload/{id}",
			 consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
	         produces = MediaType.APPLICATION_JSON_VALUE)
	public Response<String, Boolean> uploadImage(
			@RequestParam("file") MultipartFile file,
			@PathVariable("id")long id)throws ResourceNotFoundException {
		diseaseRecoardService.uploadProfileImage(id, file);
		return new Response<>("Image uploaded", true);
	}
	
	@GetMapping("/diseasesRecord/{id}/image/download")
	public byte[] downloadProfileImage(@PathVariable("id")long id) throws ResourceNotFoundException{
       return diseaseRecoardService.downloadProfileImage(id);
	}
	
	//############################ weather api s######################
	
	
	@GetMapping("/weather/{lat}/{lng}")
	public WeatherResponse weatherOnCoordinaates(@PathVariable("lat") String lat,@PathVariable("lng") String lng) throws JSONException {
		
		weatherService.setLat(lat);
		weatherService.setLng(lng);
		System.out.println(weatherService.returnMainObject());
		WeatherResponse weather=new WeatherResponse();
		weather.setTemperatureMax(weatherService.returnMainObject().getString("temp_max"));
		weather.setTemperatureMin(weatherService.returnMainObject().getString("temp_min"));
		weather.setPressure(weatherService.returnMainObject().getString("pressure"));
		weather.setHumidity(weatherService.returnMainObject().getString("humidity"));
		weather.setWindDirection(weatherService.returnWindObject().getString("deg"));
		weather.setWindSpeed(weatherService.returnWindObject().getString("speed"));
		return weather;
		 
	}
	
//	weatherMax.setValue("Max Temp: "+weatherService.returnMainObject().getInt("temp_max")+"\u00b0" +unitSelect.getValue());
//    //Updating Min Temp
//    weatherMin.setValue("Min Temp: "+weatherService.returnMainObject().getInt("temp_min")+"\u00b0" +unitSelect.getValue());
//    //Updating Pressure
//    pressureLabel.setValue("Pressure: "+weatherService.returnMainObject().getInt("pressure"));
//    //Updating Humidity
//    humidityLabel.setValue("Humidity: "+weatherService.returnMainObject().getInt("humidity"));
//
//    //Updating Wind
//    windSpeedLabel.setValue("Wind: "+weatherService.returnWindObject().getInt("speed")+"m/s");
//    //Updating Feels Like
//    feelsLike.setValue("Feelslike: "+weatherService.returnMainObject().getDouble("feels_like"));

}
