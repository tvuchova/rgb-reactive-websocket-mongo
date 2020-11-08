package com.rgb.spring.boot.reactive.websocket.mogodb.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Objects;

@Document(collection = "RgbSlider")
public class RgbSlider {

	@Id
	private String id;
	private String rgbValue;

	public RgbSlider() {
	}

	public RgbSlider(String rgbValue) {
		this.rgbValue = rgbValue;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getRgbValue() {
		return rgbValue;
	}

	public void setRgbValue(String rgbValue) {
		this.rgbValue = rgbValue;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		RgbSlider rgbSlider = (RgbSlider) o;
		return Objects.equals(id, rgbSlider.id) &&
				Objects.equals(rgbValue, rgbSlider.rgbValue);
	}

	@Override
	public int hashCode() {
		return Objects.hash(id, rgbValue);
	}
}
