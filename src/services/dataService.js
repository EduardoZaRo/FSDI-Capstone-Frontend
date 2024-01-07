var userData = {
    "name": "EduardoZaRo",
    "devices": [
        {
            "id": "eduardozaro-device-1",
            "microcontroller": {
                "name": "ESP32",
                "availablePins": 32,
                "infoLink": "https://www.espressif.com/sites/default/files/documentation/esp32_technical_reference_manual_en.pdf",
                "_id": "1"
            },
            "elements": [
                {
                    "title": "LED",
                    "type": "INPUT",
                    "position": "left",
                    "icon": "lightbulb",
                    "neededPins": 1,
                    "_id": "1"
                },
            ],
        },
        {
            "id": "eduardozaro-device-2",
            "microcontroller": {
                "name": "Raspberry Pi Pico",
                "availablePins": 32,
                "infoLink": "https://www.raspberrypi.com/documentation/microcontrollers/raspberry-pi-pico.html",
                "_id": "2"
            },
            "elements": [
                {
                    "title": "BUZZER",
                    "type": "OUTPUT",
                    "position": "left",
                    "icon": "volume-up",
                    "neededPins": 1,
                    "_id": "2"
                },
                {
                    "title": "POTENTIOMETER",
                    "type": "INPUT",
                    "position": "left",
                    "icon": "speedometer2",
                    "neededPins": 1,
                    
                    "_id": "4"
                },
            ],
        },
    ],
}
var microcontrollers = [
    {
        "name": "ESP32",
        "availablePins": 32,
        "infoLink": "https://www.espressif.com/sites/default/files/documentation/esp32_technical_reference_manual_en.pdf",
        "_id": "1"
    },
    {
        "name": "Raspberry Pi Pico",
        "availablePins": 32,
        "infoLink": "https://www.raspberrypi.com/documentation/microcontrollers/raspberry-pi-pico.html",
        "_id": "2"
    },
    {
        "name": "Arduino Uno R4",
        "availablePins": 20,
        "infoLink": "https://docs.arduino.cc/hardware/uno-r4-wifi",
        "_id": "3"
    },
];
var elements = [
    {
        "title": "LED",
        "type": "INPUT",
        "position": "left",
        "icon": "lightbulb",
        "neededPins": 1,
        "_id": "1"
    },
    {
        "title": "BUZZER",
        "type": "OUTPUT",
        "position": "left",
        "icon": "volume-up",
        "neededPins": 1,
        "_id": "2"
    },
    {
        "title": "DHT11",
        "type": "INPUT",
        "position": "left",
        "icon": "thermometer-half",
        "neededPins": 1,
        "_id": "3"
    },
    {
        "title": "POTENTIOMETER",
        "type": "INPUT",
        "position": "left",
        "icon": "speedometer2",
        "neededPins": 1,
        
        "_id": "4"
    },
    {
        "title": "PIR",
        "type": "INPUT",
        "position": "left",
        "icon": "eye",
        "neededPins": 1,
        "_id": "5"
    },
];

class DataService {
    getElements(){
        return elements;
    }
    getMicrocontrollers(){
        return microcontrollers;
    }
    getUserData(){
        return userData;
    }
}

export default DataService;