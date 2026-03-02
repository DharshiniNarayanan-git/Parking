
 export const mappingData = (data) => {
  
  console.log('kiooo',data);
  

    const result = {
        "geometry": {
          "type": "Point",
          "coordinates": [data.location?.lng, data.location?.lat]
        },
        "properties": {
          "id":data.id,
          "name": data.name,
          "status" : data.availableSlots > 0 ? 'available' : 'occupied',
          "availableSlots": data.availableSlots,
          "occupiedSlots": data.occupiedSlots,
          "parking_bay_type":data.parking_bay_type,
          // "max_capacity": 1,
          // "authSts" : data.authorizationStatus?.value === undefined ? 'Not Available': data.authorizationStatus?.value,
          // "tokenBatSts": data.tokenBatteryStatus?.value === undefined ? 'Not Available': data.tokenBatteryStatus?.value,
        }
      }

      console.log('rest',result);
      

   return {...data,...result}
  }