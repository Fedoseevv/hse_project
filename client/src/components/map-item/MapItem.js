import React, { useState, useEffect, useCallback } from "react";
import { useHttp } from "../../hooks/httpHook";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./MapItem.css";

const MapItem = ({ label }) => {
  const url = "https://www.svgrepo.com/show/307836/football-football-player.svg";
  const { request } = useHttp();
  const [position, setPosition] = useState([]);
  const [start, setStart] = useState([55.83, 37.56995]);
  const [startTime, setStartTime] = useState(new Date().setHours(0, 0, 0, 0));
  const [endTime, setEndTime] = useState(new Date().getTime());

  const getData = useCallback(async () => {
    try {
      const response = await request(`/api/monitoring/position?startTime=${startTime}&endTime=${endTime}`); //for example
      setPosition([response.data.longitude, response.data.latitude]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [startTime, endTime, request]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="map-item">
      <div className="slider-container">
        <div className="slider-label">
          Начальное время: {new Date(startTime).toLocaleString()}
        </div>
        <Slider
          min={new Date().setHours(0, 0, 0, 0)}
          max={new Date().getTime()}
          value={startTime}
          onChange={(value) => setStartTime(value)}
        />
      </div>
      <div className="map">
        <YMaps>
          <Map
            height={750}
            width={750}
            state={{
              center: start,
              zoom: 19,
              controls: ["zoomControl", "fullscreenControl"],
            }}
            modules={["control.ZoomControl", "control.FullscreenControl"]}
          >
            <Placemark
              options={{
                iconCaption: label,
                iconLayout: "default#image",
                iconImageSize: [35, 35],
                iconImageOffset: [-5, -38],
                iconImageHref: url,
              }}
              properties={{
                iconCaption: label,
              }}
              geometry={position}
            />
          </Map>
        </YMaps>
      </div>
      <div className="slider-container">
        <div className="slider-label">
          Конечное время: {new Date(endTime).toLocaleString()}
        </div>
        <Slider
          min={new Date().setHours(0, 0, 0, 0)}
          max={new Date().getTime()}
          value={endTime}
          onChange={(value) => setEndTime(value)}
        />
      </div>
    </div>
  );
};

export default MapItem;
