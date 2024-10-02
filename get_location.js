// get_location.js

import { fetch } from 'wix-fetch'; // Importing Wix's fetch module

// Function to fetch location using the provided IP address
export async function getLocation(userIP) {
  try {
    // Use IP to get location
    const locationResponse = await fetch(`https://ipinfo.io/${userIP}/json`, { method: 'GET' });
    const locationData = await locationResponse.json();

    const city = locationData.city;
    const region = locationData.region;
    const country = locationData.country;

    // Return the location details
    return { city, region, country };

  } catch (error) {
    console.error("Error fetching location: ", error);
    return null; // Handle error if fetching fails
  }
}
