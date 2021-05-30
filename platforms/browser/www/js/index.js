document.addEventListener('deviceready', onDeviceReady, false);

var storage = window.localStorage;

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}

//Default values
if(storage.getItem("set") != "true"){
    console.log("Setting default values");

    storage.setItem("set","true");
    storage.setItem("device",'{ "ready": false, "status":{ "location":{ "coordinates": "49.784504701411535, 18.21192370054265", "region": "Czech republic" }, "time":{ "year" : 2021, "day": 28, "month": 5 }, "deviceStatus":{ "fuelLevel": 0, "bateryLevel":0 } } }');

}

//loging device info
console.log(storage.getItem("device"));

//Storing device data in object
var device = JSON.parse(storage.getItem("device"));

//check fuel level
if(device.status.deviceStatus.fuelLevel == 100){
    device.ready = true;
    document.getElementById('device-status-box').style.backgroundColor = "rgba(35, 153, 31,0.5)";
    document.getElementById('low-fuel-alert').style.display = "none";
    document.getElementById('fuel-level-indicator').value = 100;
}
else {
    device.ready = false;
    document.getElementById('device-status-box').style.backgroundColor = "rgba(194, 53, 41,0.3)";
    document.getElementById('low-fuel-alert').style.display = "block";
    document.getElementById('fuel-level-indicator').value = 1;
    var low_fuel_level = new Audio('audio/low_fuel.mp3');
    low_fuel_level.play();
}
    


//Setting up data in homepage
document.getElementById('year').innerHTML = device.status.time.year;
document.getElementById('settings-year').value = device.status.time.year; 
document.getElementById('year-slider').value = device.status.time.year; 

document.getElementById('date').innerHTML = device.status.time.month + " / " + device.status.time.day;
document.getElementById('month-input').value = device.status.time.month;
document.getElementById('day-input').value = device.status.time.day;

document.getElementById('region').innerHTML = device.status.location.region;
document.getElementById('location-input').value = device.status.location.region;

document.getElementById('coordinates').innerHTML = device.status.location.coordinates;
document.getElementById('location-input-n').value = device.status.location.coordinates.split(" ")[0];
document.getElementById('location-input-e').value = device.status.location.coordinates.split(" ")[1];

document.getElementById('ready').innerHTML = device.ready;
document.getElementById('fuel').innerHTML = device.status.deviceStatus.fuelLevel;

var init_button = document.getElementById('initiate');
function travel(){
    //setting time
    device.status.time.year = document.getElementById('year-slider').value;
    device.status.time.month = document.getElementById('month-input').value;
    device.status.time.day = document.getElementById('day-input').value;

    //setting location
    device.status.location.region = document.getElementById('location-input').value;
    device.status.location.coordinates = document.getElementById('location-input-n').value + " " + document.getElementById('location-input-e').value;

    //Fuel
    device.status.deviceStatus.fuelLevel = 0;

    storage.setItem("device",JSON.stringify(device));
};
