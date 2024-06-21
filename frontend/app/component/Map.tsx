import mapboxgl from 'mapbox-gl'; 
import { useEffect, useRef, useState} from 'react';
mapboxgl.accessToken = 'pk.eyJ1IjoibWljaGVsbGViZWtrIiwiYSI6ImNseG9rNWphaDBkMm0yanM4NDJod3UwenYifQ.fLKf7OmeQGjAMpB2BdgvjA';

export default function Map(){
    //mapboxgl.accessToken = ' <UserAccessToken /> ';
    
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);

    useEffect(() => {
        if (map.current) return; 
        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [lng, lat],
          zoom: zoom
        });
      });

    
    return (
        <div>
            <div ref={mapContainer} className="map-container" />
        </div>
        );

}