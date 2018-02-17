class MouseGridBehavior extends Sup.Behavior {
  
  gridPos : GridPosition = new GridPosition(0, 0);
  tileType : string;
  selectedUnit : UnitBehavior;
  
  awake() {
    UnitManager.spawnUnit(7, 5, "Recon", Teams.RED);
    UnitManager.spawnUnit(8, 5, "Recon", Teams.BLUE);
    UnitManager.spawnUnit(7, 3, "Mechanized", Teams.RED);
    UnitManager.spawnUnit(8, 3, "Mechanized", Teams.BLUE);
    UnitManager.spawnUnit(13, 7, "Infantry", Teams.BLUE);
    UnitManager.spawnUnit(12, 7, "Infantry", Teams.RED);
    Sup.Input.setMouseVisible(false);
  }

  update() {
    if(Sup.getActor("GameHandler").getBehavior(MatchHandlerBehavior).isPaused)
      return;
    let oldX = this.gridPos.x;
    let oldY = this.gridPos.y;
    
    let mouseCoords = Sup.Input.getMousePosition();
    let ray = new Sup.Math.Ray();
    ray.setFromCamera(Sup.getActor("Camera").camera, mouseCoords);
    for(let hit of ray.intersectActors(Sup.getAllActors()))
    {
      let xPos = Math.floor(hit.point.x) + 0.5;
      let yPos = Math.floor(hit.point.y) + 0.5;
      this.actor.setPosition(xPos, yPos);
      this.handleUnitUnderCursor(hit);
      break;
    }
    
    this.updateGridPosition(this.actor.getPosition());
    if(this.gridPos.x != oldX || this.gridPos.y != oldY)
      this.cursorChangedTile();
  }
  
  updateGridPosition(vec : Sup.Math.Vector3)
  {
    this.gridPos.x = Math.floor(vec.x);
    this.gridPos.y = Math.floor(vec.y);
  }
  
  handleUnitUnderCursor(hit : Sup.Math.ActorRaycastHit)
  {
    let vec = hit.point;
    let unit = Game.getUnitAtPositon(this.gridPos.x, this.gridPos.y);
    if(Sup.Input.wasMouseButtonJustPressed(0) && !Game.isPaused())
    {
      if(unit) {
        this.selectedUnit = unit;
        if(this.selectedUnit.team == Game.getLocalTeam() && this.selectedUnit.canBeControlled)
        {
            this.selectedUnit.displayMoveRange();
        }
      } else {
        //If we are clicking on an empty tile
        if(!Game.isMovementTileAtPos(this.gridPos)) {
          UnitManager.clearMovementTiles(); 
          this.selectedUnit = null;
        } else {
          if(this.selectedUnit != null)
          {
            if(this.selectedUnit.canAct() && this.selectedUnit.team == Game.getLocalTeam()) {
              this.selectedUnit.beforeMovePosition = this.selectedUnit.gridPosition;
              this.selectedUnit.moveAlongPath(MoveArrow.currentPath);
            }
            UnitManager.clearMovementTiles(); 
          }
        }
      }
    } 
  }
  
  cursorChangedTile() {
    this.tileType = Game.getTilePropertyString(this.gridPos.x, this.gridPos.y, "type");
    if(this.selectedUnit)
    {
      MoveArrow.draw(this.selectedUnit.gridPosition, this.gridPos, this.selectedUnit.movementPower);
    } 
  }
}
Sup.registerBehavior(MouseGridBehavior);
