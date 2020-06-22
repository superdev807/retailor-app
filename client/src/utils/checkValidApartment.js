export default function isValidApartment(filterValues, apartment) {
    let floorCheck = false;
    let priceCheck = false;
    let roomCheck = false;
    let { floorAreaSizeMin, floorAreaSizeMax, pricePerMonthMin, pricePerMonthMax, numberOfRoomsMin, numberOfRoomsMax } = filterValues;
    floorAreaSizeMin = floorAreaSizeMin ? floorAreaSizeMin : 0;
    floorAreaSizeMax = floorAreaSizeMax ? floorAreaSizeMax : 1000000000;
    pricePerMonthMin = pricePerMonthMin ? pricePerMonthMin : 0;
    pricePerMonthMax = pricePerMonthMax ? pricePerMonthMax : 1000000000;
    numberOfRoomsMin = numberOfRoomsMin ? numberOfRoomsMin : 0;
    numberOfRoomsMax = numberOfRoomsMax ? numberOfRoomsMax : 1000000000;
    const { floorAreaSize, pricePerMonth, numberOfRooms } = apartment;
    floorCheck = floorAreaSize >= floorAreaSizeMin && floorAreaSize <= floorAreaSizeMax;
    priceCheck = pricePerMonth >= pricePerMonthMin && pricePerMonth <= pricePerMonthMax;
    roomCheck = numberOfRooms >= numberOfRoomsMin && numberOfRooms <= numberOfRoomsMax;
    return floorCheck && priceCheck && roomCheck;
}
