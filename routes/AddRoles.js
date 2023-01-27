const AddRoles = require('./AddRoles');

class AddRoles extends Employee {
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

const Roles = [
  'Sales Manager',
  'Sales Person',
  'Head Engineer',
  'Testing Engineer',
  'Softwarer Engineer',
  'Customer Service Rep',
  'Marketing Manager',
  'Marketing Intern',
];

const AddRoles = new AddRoles(16, 'sailboat', Roles);

console.log('---Roles---');
boat.printInfo();
boat.useHorn();
boat.crewSoundOff();