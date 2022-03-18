/** fib(n) = nth fibbonaci number, or print first n fibonacci numbers rather */
function fib(n) {
  var fibList = [0, 1];
  for (let i = 1; i < n; i += 1) {
    fibList[i] = fibList[i - 1] + fibList[i - 2];
  }

  return fibList;
}

// concatStrings("a", "b") == "ab"
// concatStrings("grass", "mother")
function concatStrings(a, b) {
  return `Your ass is ${a}, mother ${b}er`;
}

// Datasets
function dataStructures(arg1, arg2, arg3) {
  const fn = function () {
    let i = 0;
    function someInnerFunction() {
      i += 1;
    }

    someInnerFunction();
    someInnerFunction();
    // i == 2
  };
  const arr = [1, "two"];
  const obj = { nuts: "2buts" }; // kinda like a dict, yeah?

  const num = 1;
  const float = 1.5;
  const string = "strong";
  const booly = true && false;

  const nool = null; // None
  const undef = undefined; // None

  let x; // x === undefined

  // "||" is 'or' in JS
  function p(n) {
    if (n === null || n === undefined) {
      n = 0; // haha gottem, we didn't crash
    }
    console.log(n);
  }

  // Try:Except block
  try {
    throw new Error("Boopy");
  } catch (err) {
    // do stuff with err
  } finally {
    // do stuff for sure
    die();
  }

  p(); // n === undefined
}

// Boolean comparisons
function booleanLogic() {
  !true === false;
  !false === true;

  true && true === true;
  true && false === false;

  true || false === true;
  true || true === true;
  false || false === false;

  true && console.log("that was true");
  false && console.log("this won't run");

  true || console.log("this won't run");
  false || console.log("that was false");

  if (true) {
    // this will run
  } else {
    // this won't run
  }

  if (false) {
    // this won't run
  } else {
    // this will run
  }

  // falsy values!
  const falsy = [0, false, undefined, null, ""];
  const truthy = [[], {}, () => {}, "ya mama", new Date("0/0/0")];

  const nullish = [null, undefined];
  function isNullish(val) {
    return !val;
  }

  const obj1 = {
    item: {
      _id: "item-1",
      name: "Item One!",
    },
  };

  const obj2 = {
    item: "item-2",
  };

  function getIdOfItem(recipe) {
    return recipe.item._id || recipe.item;
  }

  const valObj = {
    val: 10,
  };

  /**
   *
   * @param { any } objOrNull
   * @returns Null if obj is null, otherwise obj.val
   */
  function getNullSafe(objOrNull) {
    const result = obj && obj.val;
    return result;
  }
}

function shorty() {
  const arrrr = ["one", "twothree"];
  const [a, b] = arrrr;

  a && a.b;
  if (!a) {
    return a.b;
  } else {
    return a;
  }

  // this ain't the above tho
  // logically _distinct_
  if (a.length < 3) {
    return b;
  } else {
    return a;
  }
}

let aVar = [];
if (Array.isArray(aVar)) {
}
const someVar = [1, 2];
const anotherVar = { 0: 1, 1: 2 };
const typeOfAVar = typeof aVar; // tpyeOfAVar === "Object"

const examplePrototype = {
  setVal: function (n) {
    console.log(this.val);
  },
};

const exampleObject = {
  val: 1,
  prototype: examplePrototype,
};
const exampleObject2 = {
  val: 2,
  prototype: examplePrototype,
};

const setValFn = exampleObject.prototype.setVal;
setValFn(); // [TypeError: could not read property "val" of undefined]

class SomeClass extends Object {
  constructor() {
    this.someVal = 0;
  }
  setSomeVal(n) {
    this.someVal = n;
  }
}

class SomeDerivedClass extends SomeClass {
  someOtherVal(n) {
    console.log(n);
  }
}

const someClass = new SomeDerivedClass();
const isSomeClass = someClass instanceof SomeClass; // true
const isSomeDerivedClass = someClass instanceof SomeDerivedClass; // true
someClass.setSomeVal(100);
console.log(someClass);
