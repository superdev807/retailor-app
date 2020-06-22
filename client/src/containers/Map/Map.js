import React from 'react';
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

    const center = { lat: -33.8688197, lng: 151.2092955 };
    return (
        <div style={{ height: '100vh', width: '100%', marginTop: '15px' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'replace your api key' }}
                defaultCenter={center}
                defaultZoom={1}
                options={getMapOptions}>
                {locations.map((location, index) => {
                    return <Marker key={`marker-${index}`} lat={location.lat} lng={location.lng} name="My Marker" color="blue" />;
                })}
            </GoogleMapReact>
        </div>
    );
};

export default SimpleMap;
