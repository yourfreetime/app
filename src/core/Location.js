import React, { useEffect } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { View, PermissionsAndroid } from 'react-native';
import { useMutation } from '@apollo/react-hooks';
import { SET_LOCATION } from 'yourfreetime/mutations';

import { useStorage } from '../provider/StorageProvider';

const LocationCore = () => {
  const { currentUser } = useStorage();
  const [setLocation] = useMutation(SET_LOCATION);

  useEffect(() => {
    let watchId = null;

    const runLocation = async () => {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        watchId = Geolocation.watchPosition(info => {
          if (currentUser) {
            setLocation({
              variables: {
                latitude: info.coords.latitude,
                longitude: info.coords.longitude
              }
            });
          }
        });
      }
    };

    runLocation();

    return () => {
      if (watchId) Geolocation.clearWatch(watchId);
    };
  });

  return <View />;
};

export default LocationCore;
