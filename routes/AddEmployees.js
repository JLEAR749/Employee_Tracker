const AddEmployees = require('./employee');

class AddEmployees extends Employee {
  constructor(id, type, crew) {
    super(id, 0, 'bwom');
    this.type = type;
    this.crew = crew;
  }

  useHorn() {
    console.log(this.sound);
  }

  crewSoundOff() {
    this.crew.forEach((member) => {
      console.log(`${member} reporting for duty!`);
    });
  }
}

const AddEmployees = [
  'Bret Johnson',
  'Diane Larson', 
  'Karen Smith',
  'Brenda Johnson',
  'Kari Weiss',
  'Andy Grayson',
  'Johnny Baker',
  'Robert Petersen',
];

const AddEmployees = new AddEmployees(16, 'sailboat', boatPassengers);

console.log('---AddEmployees---');
boat.printInfo();
boat.useHorn();
boat.crewSoundOff();