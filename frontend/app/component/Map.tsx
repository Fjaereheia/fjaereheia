import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import "app/component/style.map.css"; //Midlertidig styling
import { Helmet } from "react-helmet"; //sjekk om dette er nødvendig

mapboxgl.accessToken =
  "pk.eyJ1IjoibWljaGVsbGViZWtrIiwiYSI6ImNseG9rNWphaDBkMm0yanM4NDJod3UwenYifQ.fLKf7OmeQGjAMpB2BdgvjA"; //Funnet på tutorial, burde bruke egen

export default function Map() {
  //mapboxgl.accessToken = ' <UserAccessToken /> ';

  const mapContainer = useRef<HTMLDivElement | null>(null); //Bedre måte deklarere typer på?
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(8.593782952081346); //Fjærheia koordinater
  const [lat, setLat] = useState(58.37773188054414);
  const [zoom, setZoom] = useState(12);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current ?? "", //burde ha standard kart
      style: "mapbox://styles/mapbox/light-v11",
      center: [lng, lat],
      zoom: zoom,
    });

    if (map.current instanceof mapboxgl.Map) {
      map.current.addControl(new mapboxgl.NavigationControl());

      const marker1 = new mapboxgl.Marker()
        .setLngLat([8.593782952081346, 58.37773188054414])
        .addTo(map.current);
    }

    //Legge til marker
  }, [lng, lat, zoom]);
  //Når burde den oppdatere seg...

  return (
    <div className="map-wrapper">
      <Helmet>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v3.4.0/mapbox-gl.css"
          rel="stylesheet"
        />
        <script src="https://api.mapbox.com/mapbox-gl-js/v3.4.0/mapbox-gl.js"></script>
      </Helmet>
      <div ref={mapContainer} className="map-container" />{" "}
    </div>
  );
}
