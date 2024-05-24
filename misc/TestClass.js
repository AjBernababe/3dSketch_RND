export default class Car {
    constructor(make, model, year, color) {
        this.make = make;
        this.model = model;
        this.year = year;
        this.color = color;
        this.isEngineOn = false;
    }

    startEngine() {
        if (this.isEngineOn) {
            console.log('The engine is already on.');
        } else {
            this.isEngineOn = true;
            console.log('The engine is now on.');
        }
    }

    stopEngine() {
        if (this.isEngineOn) {
            this.isEngineOn = false;
            console.log('The engine is now off.');
        } else {
            console.log('The engine is already off.');
        }
    }

    drive() {
        if (this.isEngineOn) {
            console.log(`The ${this.make} ${this.model} is now driving.`);
        } else {
            console.log('You need to start the engine first.');
        }
    }

    displayDetails() {
        console.log(`Car Details: ${this.year} ${this.color} ${this.make} ${this.model}`);
    }
}