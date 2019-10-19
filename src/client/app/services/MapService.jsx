import superrequest from '../utils/superrequest';
import { ApiEndpoints } from '../utils/Constants';

import MarkerWithInfo from '../components/map/marker-with-info/MarkerWithInfo';
import StoreMarker from '../components/map/store-marker/StoreMarker';
import GardenToolsMarker from '../components/map/garden-tools-marker/GardenToolsMarker';
import UserMarker from '../components/map/user-marker/UserMarker';
import FarmMarker from '../components/map/farm-marker/FarmMarker';

function getMarkerByType(type) {
  switch (type) {
  case 'Garden':
    return UserMarker;
  case 'Farm':
    return FarmMarker;
  case 'FoodShop':
    return StoreMarker;
  case 'ToolShop':
    return GardenToolsMarker;
  default:
    return MarkerWithInfo;
  }
}

export default class MapService {
  static fetchPlaces() {
    const endpoint = `${ApiEndpoints.map.entities.LIST}?sort=[["_id", 1]]`;
    return superrequest.get(endpoint)
      .then((res) => {
        if (!res || !res.data) {
          return [];
        }
        const places = res.data || [];
        return this.mapEntities(places);
      });
  }

  static mapEntities(places) {
    places.forEach((place) => {
      place.marker = getMarkerByType(place.type);
      if (place.type === 'Garden') {
        place.picture = `https://graph.facebook.com/${place.socials.fb}`
          + '/picture?type=square&width=200&height=200';
        // entity.cover = `https://graph.facebook.com/${entity.socials.fb}/cover-photo`;
      }
    });
    places.map(mapEntity => mapEntity.position);
    return places;
  }

  static async createPlace(place) {
    return superrequest.agentPost('/api/v1/map/places', place);
  }
}
