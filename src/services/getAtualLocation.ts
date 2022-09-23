const getAtualLocation = (setPosition: Function, lat: any, long: any) => {
  if (navigator) {
    navigator.geolocation.getCurrentPosition(position => {
      setPosition({
        lat: position.coords.latitude,
        long: position.coords.longitude
      })
    })
  }
}

export default getAtualLocation;