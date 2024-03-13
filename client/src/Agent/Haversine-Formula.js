const haversine = (lat1, lon1, lat2, lon2) => {
  // TestParameters: console.log(lat1, lon1, lat2, lon2);
    const R = 6371; // Earth's radius in kilometers
    const deltaLat = toRadians(lat2 - lat1);
    const deltaLon = toRadians(lon2 - lon1);
    const radLat1 = toRadians(lat1);
    const radLat2 = toRadians(lat2);
  
    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(radLat1) * Math.cos(radLat2) *
      Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    const distance = R * c;
  
    return (distance);
  }
  
  function toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }

  export default haversine;
