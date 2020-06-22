export default function isValidApartment(filterValues, apartment) {
    let floorCheck = false;
    let priceCheck = false;
    let roomCheck = false;
    let { floorAreaSizeMin, floorAreaSizeMax, pricePerMonthMin, pricePerMonthMax, numberOfRoomsMin, numberOfRoomsMax } = filterValues;
    floorAreaSizeMin = floorAreaSizeMin ? floorAreaSizeMin : 0;
    floorAreaSizeMax = floorAreaSizeMax ? floorAreaSizeMax : 100000;
    pricePerMonthMin = pricePerMonthMin ? pricePerMonthMin : 0;
    pricePerMonthMax = pricePerMonthMax ? pricePerMonthMax : 100000;
    numberOfRoomsMin = numberOfRoomsMin ? numberOfRoomsMin : 0;
    numberOfRoomsMax = numberOfRoomsMax ? numberOfRoomsMax : 200;
    const { floorAreaSize, pricePerMonth, numberOfRooms } = apartment;
    floorCheck = floorAreaSize >= floorAreaSizeMin && floorAreaSize <= floorAreaSizeMax;
    priceCheck = pricePerMonth >= pricePerMonthMin && pricePerMonth <= pricePerMonthMax;
    roomCheck = numberOfRooms >= numberOfRoomsMin && numberOfRooms <= numberOfRoomsMax;
    return floorCheck && priceCheck && roomCheck;
}
