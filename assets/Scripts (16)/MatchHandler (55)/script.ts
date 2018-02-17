/**
Handles the progression of the match :
Turns, money spending


*/
class MatchHandlerBehavior extends Sup.Behavior {
  
  currentTurn : number = Teams.RED;
  day : number = 1;
  //Enabled to stop player from doing certain actions. Mostly menu-related
  isPaused : boolean = false;
  
  awake() {
    this.setUnitState();
  }

  update() {
    if(Sup.Input.wasKeyJustPressed("N"))
      this.nextTurn();
  }
  
  nextTurn() {
    this.currentTurn++;
    if(this.currentTurn > Teams.BLUE)
      this.currentTurn = Teams.RED;
    
    this.setUnitState();
  }
  
  setUnitState() {
    for(let unit of UnitManager.unitList)
    {
      unit.getBehavior(UnitBehavior).stopExhaust();
      
      if(this.currentTurn == unit.getBehavior(UnitBehavior).team)
        unit.getBehavior(UnitBehavior).canBeControlled = true;
      else
        unit.getBehavior(UnitBehavior).canBeControlled = false;
    } 
  }
}
Sup.registerBehavior(MatchHandlerBehavior);
