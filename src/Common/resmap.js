
 export const mappingData = (data) => {

    const result = {
        "geometry": {
          "type": "Point",
          "coordinates": [data.location?.value?.lng, data.location?.value?.lat]
        },
        "properties": {
          "id":data.id,
          "name": data.alias?.value?.name,
          "status" : data.status?.value,
          "num_spaces_occupied": data.status?.value === 'free' ? 0 : 1 ,
          "parking_bay_type":data.refParkingSite?.value === 'Accessible Parking' ? 'accessibility' : 'ev_charging',
          "max_capacity": 1,
          "authSts" : data.authorizationStatus?.value === undefined ? 'Not Available': data.authorizationStatus?.value,
          "tokenBatSts": data.tokenBatteryStatus?.value === undefined ? 'Not Available': data.tokenBatteryStatus?.value,
        }
      }

   return {...data,...result}
  }