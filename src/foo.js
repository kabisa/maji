class Base {
  constructor() {
    console.log('hi')
  }
}

class Hello extends Base {
  constructor() {
    super()
    this.log()
  }

  log() {
    const bar = "world";
    console.log(`hello ${bar}`);
  }
}

export default function() {
  new Hello().log();
}
