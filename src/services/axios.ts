import axios from 'axios'

export const geoLocationApiClient = axios.create({
  baseURL: 'http://www.mapquestapi.com/geocoding/v1/reverse',
  params: {
    key: import.meta.env.VITE_GEOLOCATION_API_KEY,
    includeRoadMetadata: true,
    includeNearestIntersection: true,
  },
})
