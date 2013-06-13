// Define the faces that can exist.
var FACE = {
  CHALLENGE: '{C}',
  DOUBLECHALLENGE: '{CC}',
  BANE: '{B}',
  DOUBLEBANE: '{BB}',
  CHAOSSTAR: '{S}',
  DELAY: '{D}',
  EXERTION: '{E}',
  BLANK: '{N}',
  SUCCESS: '*S*',
  DOUBLESUCCESS: '*SS*',
  RIGHTEOUSSUCCESS: '*R*',
  BOON: '*B*',
  DOUBLEBOON: '*BB*',
  COMET: '*C*',
  SUC_EXER: '*SE}',
  SUC_DELY: '*SD}',
  SUC_BOON: '*SB*',
  UNKNOWN: '???'
}

var D = {
  CO: 'conservative',
  CH: 'characteristic',
  RE: 'reckless',
  EX: 'expertise',
  CL: 'challenge',
  FO: 'fortune',
  MI: 'misfortune'
};

// Utility Functions
Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)]
};

// Classes
//
// Die : Superclass for all the dice types.
function Die() {
  this.state = FACE.UNKNOWN;
  this.sides = new Array();
};

Die.prototype.roll = function() {
    this.state = this.sides.randomElement();
    return this.state;
};

// Misfortune Die
function Misfortune() {
  Die.call(this);

  this.sides = [FACE.BLANK,
		FACE.BLANK,
		FACE.BLANK,
		FACE.CHALLENGE,
		FACE.CHALLENGE,
		FACE.BANE];
};
Misfortune.prototype = Object.create(Die.prototype);
Misfortune.prototype.constructor = Misfortune;

// Fortune Die
function Fortune() {
  Die.call(this);

  this.sides = [FACE.BLANK,
		FACE.BLANK,
		FACE.BLANK,
		FACE.SUCCESS,
		FACE.SUCCESS,
		FACE.BOON];
}
Fortune.prototype = Object.create(Die.prototype);
Fortune.prototype.constructor = Fortune;

// Expertise Die
function Expertise() {
  Die.call(this);

  this.sides = [FACE.BLANK,
		FACE.BOON,
		FACE.RIGHTEOUSSUCCESS,
		FACE.SUCCESS,
		FACE.COMET,
		FACE.BOON];
};
Expertise.prototype = Object.create(Die.prototype);
Expertise.prototype.constructor = Expertise;

// Challenge Die
function Challenge() {
  Die.call(this);

  this.sides = [FACE.BLANK,
		FACE.BANE,
		FACE.DOUBLEBANE,
		FACE.CHAOSSTAR,
		FACE.CHALLENGE,
		FACE.CHALLENGE,
		FACE.DOUBLECHALLENGE,
		FACE.DOUBLECHALLENGE];
};
Challenge.prototype = Object.create(Die.prototype);
Challenge.prototype.constructor = Challenge;

// Characteristic Die
function Characteristic() {
  Die.call(this);

  this.sides = [FACE.BLANK,
		FACE.BLANK,
		FACE.SUCCESS,
		FACE.SUCCESS,
		FACE.SUCCESS,
		FACE.SUCCESS,
		FACE.BOON,
		FACE.BOON];
};
Characteristic.prototype = Object.create(Die.prototype);
Characteristic.prototype.constructor = Characteristic;

// Reckless Die
function Reckless() {
  Die.call(this);

  this.sides = [FACE.BLANK,
		FACE.BLANK,
		FACE.DOUBLESUCCESS,
		FACE.SUC_EXER,
		FACE.DOUBLESUCCESS,
		FACE.SUC_EXER,
		FACE.SUC_BOON,
		FACE.BANE,
		FACE.DOUBLEBOON,
		FACE.BANE];
};
Reckless.prototype = Object.create(Die.prototype);
Reckless.prototype.constructor = Reckless;

// Conservative Die
function Conservative() {
  Die.call(this);

  this.sides = [FACE.BLANK,
		FACE.SUCCESS,
		FACE.SUCCESS,
		FACE.SUC_DELY,
		FACE.SUC_BOON,
		FACE.SUC_DELY,
		FACE.SUCCESS,
		FACE.SUCCESS,
		FACE.BOON,
		FACE.BOON];
};
Conservative.prototype = Object.create(Die.prototype);
Conservative.prototype.constructor = Conservative;


// Result Set
function ResultSet() {
  this.successes = 0;
  this.boons = 0;
  this.banes = 0;
  this.comets = 0;
  this.stars = 0;
  this.delays = 0;
  this.exertions = 0;
  this.challenges = 0;
};

ResultSet.prototype.tally = function(face) {
  switch (face) {
    case FACE.RIGHTEOUSSUCCESS:
      expDie = new Expertise();
      expDie.state = face;
      while (expDie.state != FACE.RIGHTEOUSSUCCESS) {
	this.successes += 1;
	expDie.roll();
      }
    case FACE.CHALLENGE:
      this.challenges += 1;
      break;
    case FACE.DOUBLECHALLENGE:
      this.challenges += 2
      break;
    case FACE.BANE:
      this.banes += 1;
      break;
    case FACE.DOUBLEBANE:
      this.banes += 2;
      break;
    case FACE.CHAOSSTAR:
      this.stars += 1;
      break;
    case FACE.DELAY:
      this.delays += 1;
      break;
    case FACE.EXERTION:
      this.exertions += 1;
      break;
    case FACE.BLANK:
      break;
    case FACE.SUCCESS:
      this.successes += 1;
      break;
    case FACE.DOUBLESUCCESS:
      this.successes += 2;
      break;
    case FACE.BOON:
      this.boons += 1;
      break;
    case FACE.DOUBLEBOON:
      this.boons += 2;
      break;
    case FACE.COMET:
      this.comets += 1;
      break;
    case FACE.SUC_EXER:
      this.successes += 1;
      this.exertions += 1;
      break;
    case FACE.SUC_DELY:
      this.successes += 1;
      this.delays += 1;
      break;
    case FACE.SUC_BOON:
      this.successes += 1;
      this.delays += 1;
      break;
    case FACE.UNKNOWN:
      // something's broken... this should never happen.
      alert("tallying an unknown face... what'd you do, Ray?");
    default:
      // If it's not one of these, something's *really* crazy...
  }
};

ResultSet.prototype.clear = function() {
  this.successes = 0;
  this.boons = 0;
  this.banes = 0;
  this.comets = 0;
  this.stars = 0;
  this.delays = 0;
  this.exertions = 0;
  this.challenges = 0;
}e

// Pool of Dice
function DicePool() {
  this.dice = new Object;
  this.rolled = false;
  this.dice['conservative'] = new Array();
  this.dice['characteristic'] = new Array();
  this.dice['reckless'] = new Array();
  this.dice['expertise'] = new Array();
  this.dice['challenge'] = new Array();
  this.dice['fortune'] = new Array();
  this.dice['misfortune'] = new Array();
};

// roll() takes a ResultSet object, which it fills with the results
DicePool.prototype.roll = function(results) {
  for (var dieType in this.dice) {
    this.dice[dieType].forEach(
		    function(die, index, array) {
		      die.roll();
                      results.tally(die.state);
		    }
		   );
  }
  this.rolled = true;
  return(this.rolled);
};

DicePool.prototype.add = function(type) {
  var newDie = null;
  switch (type) {
    case D.CO:
      newDie = new Conservative();
      break;
    case D.CH:
      newDie = new Characteristic();
      break;
    case D.RE:
      newDie = new Reckless();
      break;
    case D.EX:
      newDie = new Expertise();
      break;
    case D.CL:
      newDie = new Challenge();
      break;
    case D.FO:
      newDie = new Fortune();
      break;
    case D.MI:
      newDie = new Misfortune();
      break;
    default:
      // nothing.
  }
  this.dice[type].push(newDie);
};

DicePool.prototype.sub = function(type) {
  if (this.dice[type].length > 0) {
    this.dice[type].pop();
  }
};


DicePool.prototype.marshall = function () {
  // This is where I'll convert the dice to a string that can be saved in a cookie...
  return true;
};

DicePool.prototype.unmarshall = function () {
  // This is where I'll convert the encoded string back into the array object...
  return true;
};

DicePool.prototype.save = function () {
  // This is where I'll save the dice pool state to both a local variable and a cookie...
  return;
};

DicePool.prototype.load = function () {
  // This is where I'll load a dice pool object from a saved local state...
  return;
};

DicePool.prototype.clear = function () {
  for (var dieType in this.dice) {
    dieType.length = 0;
  }
};
