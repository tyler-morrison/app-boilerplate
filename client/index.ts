class Greeter {
    constructor(public greeting: string) { }
    greet() {
        console.log(this.greeting);
    }
};

let greeter = new Greeter("Hello, world!");

greeter.greet();
