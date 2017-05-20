export const propertyDecorator: PropertyDecorator = function (target: any, name: string) {
  const valueName = `${name}_value`;

  console.log('field value', target[name]);

  if (delete target[name]) {
     Object.defineProperty(target, name, {
      get: function() {
        console.log('get:::propDescriptor', this.name, this[valueName]);
        return this[valueName];
      },
      set: function(val) {
        if (val === this[valueName]) {
          return;
        }
        console.log('set:::propDescriptor', this.name, val);
        this[valueName] = val;
      },
      enumerable: true,
      configurable: true
    });

  }

};
