import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';

const SimpleMap = (props) => {
    const { locations } = props;
    const getMapOptions = (maps) => {
        return {
            disableDefaultUI: true,
            mapTypeControl: true,
            streetViewControl: true,
            styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'on' }] }],
        };
    };

    const [center, setCenter] = useState({ lat: -33.8688197, lng: 151.2092955 });
    return (
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'replace your api key' }}
                defaultCenter={center}
                defaultZoom={11}
                options={getMapOptions}>
                {locations.map((location, index) => {
                    return <Marker key={`marker-${index}`} lat={location.lat} lng={location.lng} name="My Marker" color="blue" />;
                })}
            </GoogleMapReact>
        </div>
    );
};

export default SimpleMap;
