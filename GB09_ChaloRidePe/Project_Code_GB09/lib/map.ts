import { Driver, MarkerData } from "@/types/type";

const apiKey = process.env.EXPO_PUBLIC_HERE_MAPS_API_KEY;

export const generateMarkersFromData = ({
  data,
  userLatitude,
  userLongitude,
}: {
  data: Driver[];
  userLatitude: number;
  userLongitude: number;
}): MarkerData[] => {
  return data.map((driver) => {
    const latOffset = (Math.random() - 0.5) * 0.01; // Random offset between -0.005 and 0.005
    const lngOffset = (Math.random() - 0.5) * 0.01; // Random offset between -0.005 and 0.005

    return {
      latitude: userLatitude + latOffset,
      longitude: userLongitude + lngOffset,
      title: `${driver.first_name} ${driver.last_name}`,
      ...driver,
    };
  });
};

export const calculateRegion = ({
  userLatitude,
  userLongitude,
  destinationLatitude,
  destinationLongitude,
}: {
  userLatitude: number | null;
  userLongitude: number | null;
  destinationLatitude?: number | null;
  destinationLongitude?: number | null;
}) => {
  if (!userLatitude || !userLongitude) {
    return {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  }

  if (!destinationLatitude || !destinationLongitude) {
    return {
      latitude: userLatitude,
      longitude: userLongitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  }

  const minLat = Math.min(userLatitude, destinationLatitude);
  const maxLat = Math.max(userLatitude, destinationLatitude);
  const minLng = Math.min(userLongitude, destinationLongitude);
  const maxLng = Math.max(userLongitude, destinationLongitude);

  const latitudeDelta = (maxLat - minLat) * 1.3; // Adding some padding
  const longitudeDelta = (maxLng - minLng) * 1.3; // Adding some padding

  const latitude = (userLatitude + destinationLatitude) / 2;
  const longitude = (userLongitude + destinationLongitude) / 2;

  return {
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
  };
};

export const calculateDriverTimes = async ({
  markers,
  userLatitude,
  userLongitude,
  destinationLatitude,
  destinationLongitude,
}: {
  markers: MarkerData[];
  userLatitude: number | null;
  userLongitude: number | null;
  destinationLatitude: number | null;
  destinationLongitude: number | null;
}) => {
  if (
    !userLatitude ||
    !userLongitude ||
    !destinationLatitude ||
    !destinationLongitude
  )
    return;

  try {
    const timesPromises = markers.map(async (marker) => {
      // First leg: From the driver's location to the user
      const urlToUser = `https://router.hereapi.com/v8/routes?transportMode=car&origin=${marker.latitude},${marker.longitude}&destination=${userLatitude},${userLongitude}&return=summary&apikey=${apiKey}`;

      const responseToUser = await fetch(urlToUser);
      // await fetch(
      //   `https://maps.googleapis.com/maps/api/directions/json?origin=${marker.latitude},${marker.longitude}&destination=${userLatitude},${userLongitude}&key=${apiKey}`
      // );

      const dataToUser = await responseToUser.json();
      // console.log("User data: \n" + dataToUser);

      const timeToUser = dataToUser.routes[0].sections[0].summary.duration; // Time in seconds
      // console.log("Time (to user):" + timeToUser);
      // const timeToUser =
      //   responseToUser.data.routes[0].sections[0].summary.duration; // Time in seconds

      // Second leg: From the user to the destination
      const urlToDestination = `https://router.hereapi.com/v8/routes?transportMode=car&origin=${userLatitude},${userLongitude}&destination=${destinationLatitude},${destinationLongitude}&return=summary&apikey=${apiKey}`;

      const responseToDestination = await fetch(urlToDestination);
      // await fetch(
      //   `https://maps.googleapis.com/maps/api/directions/json?origin=${userLatitude},${userLongitude}&destination=${destinationLatitude},${destinationLongitude}&key=${apiKey}`
      // );

      const dataToDestination = await responseToDestination.json();
      // console.log("Destination data: \n" + dataToDestination);

      const timeToDestination =
        dataToDestination.routes[0].sections[0].summary.duration; // Time in seconds

      // console.log("Time (to destination):" + timeToDestination);
      // const timeToDestination =
      //   responseToDestination.data.routes[0].sections[0].summary.duration; // Time in seconds

      const totalTime = (timeToUser + timeToDestination) / 60; // Total time in minutes
      const price = (totalTime * 0.5).toFixed(2); // Calculate price based on time
      // console.log("done till here");

      try {
        if (marker && totalTime && price) {
          return { ...marker, time: totalTime, price };
        }
      } catch (error) {
        console.log("Error: Values found null" + error);
      }
    });

    return await Promise.all(timesPromises);
  } catch (error) {
    //console.error("Error calculating driver times:", error);
  }
};
