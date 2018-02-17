enum Teams
{
  RED,
  BLUE,
  YELLOW,
  GREEN
}

class UnitBehavior extends Sup.Behavior {
  
  gridPosition : GridPosition = new GridPosition(0, 0);
  beforeMovePosition : GridPosition = new GridPosition(0, 0);
  //Have to use this since SuperPowers doesn't support enum in editor
  unitString : string;
  team : number = Teams.RED;
  facing : boolean = true; //True = right, false = left;
  
  canBeControlled : boolean = false;
  isExhausted : boolean = false;
  
  //These are specifics, per unit. 
  movementPower : number; //Move range of the unit.
  movementType : string = "infantry"; //Flag for movement.
  
  
  awake() {
    this.actor.spriteRenderer.setAnimation("idle");
  }

  update() {
    this.updateGridPosition(this.actor.getPosition());
  }
  
  updateGridPosition(vec : Sup.Math.Vector3)
  {
    this.gridPosition.x = Math.floor(vec.x);
    this.gridPosition.y = Math.floor(vec.y);
    this.beforeMovePosition = this.gridPosition;
  }
  
  displayMoveRange()
  {
    let range = this.movementPower;
    UnitManager.clearMovementTiles();

    let todoTiles : GridPosition[] = new Array<GridPosition>();
    let addedTiles : GridPosition[] = new Array<GridPosition>();
    
    todoTiles.push(new GridPosition(this.gridPosition.x, this.gridPosition.y, 0));
    for(let i = 0; i < range; i ++)
    {
        let tilesToRemove : GridPosition[] = new Array<GridPosition>();
        let tilesToAdd : GridPosition[] = new Array<GridPosition>();
        //Get neighbour tiles
        for(let baseTile of todoTiles)
        {
          tilesToRemove.push(baseTile);
          let totalCost : number = baseTile.miscValue;
          let neighbours : GridPosition[] = new Array<GridPosition>();
          neighbours[1] = new GridPosition(baseTile.x - 1, baseTile.y, (totalCost + this.getMovementCostForType(Game.getTilePropertyString(baseTile.x - 1, baseTile.y, "type")))); // 0 and 1 inverted here for a test that was nice
          neighbours[0] = new GridPosition(baseTile.x, baseTile.y + 1, (totalCost + this.getMovementCostForType(Game.getTilePropertyString(baseTile.x, baseTile.y + 1, "type"))));
          neighbours[2] = new GridPosition(baseTile.x + 1, baseTile.y, (totalCost + this.getMovementCostForType(Game.getTilePropertyString(baseTile.x + 1, baseTile.y, "type"))));
          neighbours[3] = new GridPosition(baseTile.x, baseTile.y - 1, (totalCost + this.getMovementCostForType(Game.getTilePropertyString(baseTile.x, baseTile.y - 1, "type"))));
          
          //Verify they're good
          for(let tile of neighbours)
          {
            if(!GridPosition.arrayHasPosition(addedTiles, tile) && !GridPosition.arrayHasPosition(tilesToAdd, tile))
            {
              if(Sup.getActor("Level").tileMapRenderer.getTileMap().getTileAt(0, tile.x, tile.y) < 0)
                continue;
              if(tile.x < 0 || tile.y < 0)
                continue;
              if(Game.getUnitAtPositon(tile.x, tile.y))
                continue;
              if(tile.miscValue > range)
                continue;
              
              //All tests OK
              tilesToAdd.push(tile);
              UnitManager.spawnMovementTile(tile.x, tile.y);
            }
          }
        }
        
        for(let added of tilesToAdd)
        {
          todoTiles.push(added);
        }
  
        for(let remove of tilesToRemove)
        {
            if(todoTiles.indexOf(remove) > -1)
            {
              todoTiles.splice(todoTiles.indexOf(remove), 1);
              addedTiles.push(remove);
            }
        }
    }
  }
  
  moveAlongPath(path: EasyStar.Position[])
  {
    let pos = path.shift();
    if(pos == null) {
      this.exhaust();
      this.actor.spriteRenderer.setAnimation("idle");
      this.actor.spriteRenderer.setHorizontalFlip(this.facing);
      
      //Do action dialog
      
      return;
    }
    
    let direction = Game.getCardinalDirectionFromTo(this.gridPosition, new GridPosition(pos.x, pos.y));
    let movement = {x: 0, y : 0};
    let delay = 250;
    
    if(direction == Directions.RIGHT) {
      movement.x = 1;
      this.actor.spriteRenderer.setHorizontalFlip(true);
      this.actor.spriteRenderer.setAnimation("side");
    }
    else if (direction == Directions.LEFT) {
      movement.x = -1;
      this.actor.spriteRenderer.setHorizontalFlip(false);
      this.actor.spriteRenderer.setAnimation("side");
    }
    else if (direction == Directions.UP) {
      movement.y = 1;
      this.actor.spriteRenderer.setAnimation("up");
    }
    else if (direction == Directions.DOWN) {
      movement.y = -1;
      this.actor.spriteRenderer.setAnimation("down");
    }
    
    
    
    let movingInterval = Sup.setInterval(delay / 20, () => {
      this.actor.move(movement.x / 20, movement.y / 20);
    });
    
    if(pos != path[path.length - 1]) {
      Sup.setTimeout(delay, () => {
        Sup.clearInterval(movingInterval);
        this.moveAlongPath(path)
      });
    }
  }
  
  /**
    Returns : 
      0 : Unit can't move on that tile
      >= 1 : Unit can move on that tie
  */
  getMovementCostForType(tileType : string) : number
  {
    if(tileType)
      return +MovementData.get(tileType, this.movementType);
    else
      return 999;
  }
  
  exhaust()
  {
    this.actor.spriteRenderer.setColor(new Sup.Color(0x858585));
    this.isExhausted = true;
  }
  
  stopExhaust()
  {
    this.actor.spriteRenderer.setColor(new Sup.Color(0xFFFFFF));
    this.isExhausted = false;
  }
  
  canAct() : boolean
  {
    if(!this.isExhausted && this.canBeControlled)
      return true;
    else
      return false;
  }
  
  setTeam(team : number) 
  {
    this.team = team;
    if(this.team == Teams.BLUE)
    {
      this.facing = false;
      this.actor.spriteRenderer.setSprite("Units/" + this.unitString + "/Sprite_B"); 
      this.actor.spriteRenderer.setHorizontalFlip(this.facing);
    }
    
    this.actor.spriteRenderer.setAnimation("idle");
  }
}
Sup.registerBehavior(UnitBehavior);
