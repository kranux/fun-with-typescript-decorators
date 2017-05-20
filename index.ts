import { propertyDecorator } from './decorator';

class DecoratorTest{
  @propertyDecorator private isLoading = true;

  constructor(private name: string) {
    console.log(this.isLoading);
    this.isLoading = true;

    setTimeout(() => {
      this.onInit();
    }, 1000);

    setTimeout(() => {
      this.onDestruct();
    }, 2000);
  }

  onInit() {
    this.isLoading = false;
    console.log('original onInit', this.name);
  }

  onDestruct() {
    console.log('original onDestruct', this.name);
  }
}

const decoratorTestA = new DecoratorTest("A");

const decoratorTestB = new DecoratorTest("B");


//console.log('init');
