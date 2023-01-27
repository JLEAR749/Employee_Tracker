const employee = require('./AddDepartment');

class AddDepartment extends Employee {
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

const Department = [
  'Sales',
  'Customer Service',
  'Marketing',
  'Engineering',
];

const AddDepartment = new AddDepartment(16, 'sailboat', boatPassengers);

console.log('---BOAT---');
boat.printInfo();
boat.useHorn();
boat.crewSoundOff();
