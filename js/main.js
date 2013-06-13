// Globals
POOL = new DicePool();
RESULTS = new ResultSet();

// Utilities to reduce inline js
function addCO() { POOL.add(D.CO); document.getElementById('dConservative').innerHTML = POOL.dice[D.CO].length; }
function addCH() { POOL.add(D.CH); document.getElementById('dCharacteristic').innerHTML = POOL.dice[D.CH].length; }
function addRE() { POOL.add(D.RE); document.getElementById('dReckless').innerHTML = POOL.dice[D.RE].length; }
function addEX() { POOL.add(D.EX); document.getElementById('dExpertise').innerHTML = POOL.dice[D.EX].length; }
function addCL() { POOL.add(D.CL); document.getElementById('dChallenge').innerHTML = POOL.dice[D.CL].length; }
function addFO() { POOL.add(D.FO); document.getElementById('dFortune').innerHTML = POOL.dice[D.FO].length; }
function addMI() { POOL.add(D.MI); document.getElementById('dMisfortune').innerHTML = POOL.dice[D.MI].length; }

function subCO() { POOL.sub(D.CO); document.getElementById('dConservative').innerHTML = POOL.dice[D.CO].length; }
function subCH() { POOL.sub(D.CH); document.getElementById('dCharacteristic').innerHTML = POOL.dice[D.CH].length; }
function subRE() { POOL.sub(D.RE); document.getElementById('dReckless').innerHTML = POOL.dice[D.RE].length; }
function subEX() { POOL.sub(D.EX); document.getElementById('dExpertise').innerHTML = POOL.dice[D.EX].length; }
function subCL() { POOL.sub(D.CL); document.getElementById('dChallenge').innerHTML = POOL.dice[D.CL].length; }
function subFO() { POOL.sub(D.FO); document.getElementById('dFortune').innerHTML = POOL.dice[D.FO].length; }
function subMI() { POOL.sub(D.MI); document.getElementById('dMisfortune').innerHTML = POOL.dice[D.MI].length; }

function clear() {POOL.clear(); RESULTS.reset(); }

function doRoll() {
  RESULTS.reset();
  POOL.roll(RESULTS);

  document.getElementById('totSuccesses').innerHTML = RESULTS.successes;
  document.getElementById('totBoons').innerHTML = RESULTS.boons;
  document.getElementById('totBanes').innerHTML = RESULTS.banes;
  document.getElementById('totComets').innerHTML = RESULTS.comets;
  document.getElementById('totChaosStars').innerHTML = RESULTS.stars;
  document.getElementById('totDelays').innerHTML = RESULTS.delays;
  document.getElementById('totExertions').innerHTML = RESULTS.exertions;
  document.getElementById('totChallenges').innerHTML = RESULTS.challenges;

  var S = RESULTS.successes - RESULTS.challenges;
  if (S > 0) {
    document.getElementById('resultText').innerHTML = "SUCCESS!";
    document.getElementById('netSuccesses').innerHTML = S;
    document.getElementById('netChallenges').innerHTML = '0';
  } else {
    document.getElementById('resultText').innerHTML = "FAILED!";
    document.getElementById('netSuccesses').innerHTML = '0';
    document.getElementById('netChallenges').innerHTML = S;
  }
}

