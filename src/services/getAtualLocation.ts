const getAtualLocation = (setPosition: Function, latitude: any, longitude: any) => {

    if (navigator) {
    	navigator.geolocation.getCurrentPosition(position => {
            setPosition({latitude: position.coords.latitude, longitude: position.coords.longitude});
    	});
    }
};

export default getAtualLocation;