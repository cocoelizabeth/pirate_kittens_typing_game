// OBJECT ORIENTED PROGRAMMING

// classes

// constructor function - make first letter capital to show that it is a constructor

function NBAPlayer(name,team, pos) {
    this.name = name;
    this.team = team;
    this.pos = pos;
}

// instance method: all instances of the class can access this function

NBAPlayer.prototype.dunk = function () {

};


// Create an instance and save to a variable
// sets curry's prototype to NBAPlayer: 
// curry__proto__ = NBAPlayer
const curry = new NBAPlayer("steph curry", "warriors", "point guard");

// method style invocation. 
// 'this' is bound to 'curry' because it is called directly on curry
curry.dunk();


Notes on project: 


