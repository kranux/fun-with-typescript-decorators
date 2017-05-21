import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/timeInterval';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/take';
import { SubscriptionPool } from './subscription-pool';
// import { propertyDecorator } from './decorator';

const source$ = Observable.timer(200, 100)
  .timeInterval()
  .pluck('interval')
  .take(100);

interface IComponent {
  ngOnInit: () => void;
  ngOnDestroy: () => void;
}

class DecoratorTest implements IComponent{
  // @propertyDecorator
  private isLoading = true;
  @SubscriptionPool private subscriptions;

  constructor(private name: string) {
    console.log(this.isLoading);
    this.isLoading = true;

    this.ngOnInit();

    setTimeout(() => {
      this.ngOnDestroy();
    }, 2000);
  }

  doStuff() {
    this.subscriptions.add(source$.subscribe(x => console.log(this.name, x)));
  }

  ngOnInit() {
    this.isLoading = false;
    console.log('original onInit', this.name);
  }

  ngOnDestroy() {
    console.log('original ngOnDestroy', this.name);
  }
}

const decoratorTestA = new DecoratorTest("A");
decoratorTestA.doStuff();

const decoratorTestB = new DecoratorTest("B");
decoratorTestB.doStuff();
