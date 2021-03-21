import { Asset } from 'expo-asset';

class Sound {
    module : any
    name: string

    constructor(module: any, name: string) {
        this.module = module
        this.name = name
        Asset.fromModule(this.module).downloadAsync();
    }
}

export default [
    new Sound(
        require("../../../../assets/sounds/analog.mp3"),
        "Analog"
    ),
    new Sound(
        require("../../../../assets/sounds/bomb_siren.mp3"),
        "Bomb Siren"
    ),
    new Sound(
        require("../../../../assets/sounds/clock_buzzer.mp3"),
        "Clock Buzzer"
    ),
    new Sound(
        require("../../../../assets/sounds/doorbell.mp3"),
        "Door Bell"
    ),
    new Sound(
        require("../../../../assets/sounds/fire_alarm.mp3"),
        "Fire Alarm"
    ),
    new Sound(
        require("../../../../assets/sounds/foghorn.mp3"),
        "Foghorn"
    ),
    new Sound(
        require("../../../../assets/sounds/massive_war.mp3"),
        "Massive War"
    ),
    new Sound(
        require("../../../../assets/sounds/railroad.mp3"),
        "Rail Road"
    ),
    new Sound(
        require("../../../../assets/sounds/schoolbell.mp3"),
        "School Bell"
    ),
    new Sound(
        require("../../../../assets/sounds/submarine.mp3"),
        "Submarine"
    ),
]
