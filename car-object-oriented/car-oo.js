// Part 1
class Vehicle {
    constructor(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }

    honk() {
        return "Beep.";
    }

    toString() {
        return `The vehicle is a ${this.make} ${this.model} from ${this.year}.`
    }
}


// Part 2
class Car extends Vehicle {
    constructor(make, model, year) {
        super(make, model, year);
        this.numWheels = 4;
    }
}


// Part 3
class Motorcycle extends Vehicle {
    constructor(make, model, year) {
        super(make, model, year);
        this.numWheels = 2;
    }

    revEngine() {
        return "VROOM!!!";
    }
}


// Part 4
class Garage {
    constructor(capacity) {
        this.vehicles = [];
        this.capacity = capacity;
    }

    add(cl) {
        if (cl instanceof Vehicle) {
            if (this.vehicles.length < this.capacity) {
                this.vehicles.push(cl.constructor.name);
                return "Vehicle added!";
            } else {
                return "Sorry, we're full.";
            }
        } else {
            return "Only vehicles are allowed in here!";
        }
        
    }
    
}