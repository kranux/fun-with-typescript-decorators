import { Subscription } from 'rxjs/Subscription';

// Usage
// in your-component.ts:
// @SubscriptionPool private subscriptions;
// ...
// this.subscriptions.add(stream$.subscribe( (a) => {
// ...
export const SubscriptionPool = function(target: any, name: string) {
  const originalOnDestroy = target.ngOnDestroy;
  const originalOnInit = target.ngOnInit;

  target.ngOnInit = function(...args) {

    this[name] = new Subscription();

    if (typeof originalOnInit === 'function') {
      originalOnInit.apply(this, args);
    }
  };

  target.ngOnDestroy = function(...args) {

    if (typeof originalOnDestroy === 'function') {
      originalOnDestroy.apply(this, args);
    }

    if (this[name] && typeof this[name].unsubscribe === 'function') {
      this[name].unsubscribe();
    }
  };
};
