'use client';
import { APIProvider, Map } from '@vis.gl/react-google-maps';

const GoogleMap = () => {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API!;

  return (
    <div className='mt-12'>
      <APIProvider apiKey={API_KEY}>
        <Map
          defaultCenter={{ lat: 52.3534749, lng: 0.4988677 }}
          defaultZoom={17}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
        />
      </APIProvider>
    </div>
  );
};

export default GoogleMap;
