var elements = [
    {
        "title": "LED",
        "type": "INPUT",
        "position": "left",
        "_id": "1"
    },
    {
        "title": "BUZZER",
        "type": "OUTPUT",
        "position": "left",
        "_id": "2"
    },
    {
        "title": "DHT11",
        "type": "INPUT",
        "position": "left",
        "_id": "3"
    },
    {
        "title": "POTENTIOMETER",
        "type": "INPUT",
        "position": "left",
        "_id": "4"
    },
    {
        "title": "PIR",
        "type": "INPUT",
        "position": "left",
        "_id": "5"
    },
];

class DataService {
    getElements(){
        return elements;
    }
}

export default DataService;