enum Directions {
  DOWN = 0,
  RIGHT = 90,
  UP = 180,
  LEFT = 270
}

class MoveArrow {
  
  public static arrowParts : Sup.Actor[] = new Array<Sup.Actor>();
  public static currentPath : EasyStar.Position[] = new Array<EasyStar.Position>();
  
  public static clearArrow()
  {
    for(let part of this.arrowParts)
      part.destroy();
    
    this.arrowParts = new Array<Sup.Actor>();
  }

  /**
    Generates the movement arrow.
  
  */
  public static draw(origin : GridPosition, destination : GridPosition, range : number)
  {
    for(let part of this.arrowParts)
    {
      part.destroy();    
    }
    
    this.arrowParts = new Array<Sup.Actor>();
    let map = Sup.getActor("Level").tileMapRenderer.getTileMap();
    let es = new EasyStar.js();
    let grid = [];
    
    //Build grid
    for(let y = 0; y <= map.getHeight(); y++)
    {
      let line = [];
      for(let x = 0; x <= map.getWidth(); x++)
      {
          let found = false;
        
          for(let pos of UnitManager.movementTiles) {
            let posX = Math.floor(pos.getPosition().x);
            let posY = Math.floor(pos.getPosition().y);
            
            if(posX == x && posY == y && !Game.getUnitAtPositon(x, y)) {
              found = true;
              break;
            }
          }
        
          if(found) line.push(0);
          else line.push(1);
      }
      grid.push(line);
    }  
    
    es.setGrid(grid);
    es.setAcceptableTiles([0]);
    es.findPath(origin.x, origin.y, destination.x, destination.y, (path) => {
	    if (path !== null) {
        let previousNode : EasyStar.Position = {x: origin.x, y: origin.y};
        this.currentPath = path;
		    for(let node of path)
        {
          if(node.x == origin.x && node.y == origin.y)
            continue;
          
          let dir = Directions.RIGHT;
          let flipH = false;
          let flipV = false;
          let icon = "line";
          
          if(previousNode.x < node.x) {
            dir = Directions.LEFT;
            flipV = true;
          }
          if(previousNode.x > node.x) {
            dir = Directions.RIGHT;
            flipV = true;
            flipH = true;
          }
          if(previousNode.y < node.y) {
            dir = Directions.UP;
            flipH = true;
          }
          if(previousNode.y > node.y)
            dir = Directions.DOWN;
          
          
          if(node.x == destination.x && node.y == destination.y)
            icon = "arrow";
          
          let act = Sup.appendScene("Icons/MoveArrow/Prefab")[0];
          act.spriteRenderer.setAnimation(icon);
          act.spriteRenderer.setHorizontalFlip(flipH);
          act.spriteRenderer.setVerticalFlip(flipV);
          act.setEulerZ(Sup.Math.toRadians(dir));
          act.setPosition(node.x + 0.5, node.y + 0.5, 0.3);
          this.arrowParts.push(act);
          previousNode = node;
        }
        
        this.doCorners();
	    } 
    });
    
    es.calculate();
  }

  static doCorners()
  {
    for(let part of this.arrowParts)
    {
      let posX = Math.floor(part.getPosition().x);
      let posY = Math.floor(part.getPosition().y);
      let icon = null;
      
      let cornerType = this.checkForCorner(posX, posY);
      if(cornerType != null) {
        icon = "corner_" + cornerType;
        part.spriteRenderer.setAnimation(icon);
        part.setEulerZ(Sup.Math.toRadians(0));
        part.spriteRenderer.setHorizontalFlip(false);
        part.spriteRenderer.setVerticalFlip(false);
      }
    }
  }

  public static checkForCorner(x: number, y: number) : string {
    if(this.getArrowPartAt(x, y + 1) && this.getArrowPartAt(x + 1, y))
      return "NE";
    if(this.getArrowPartAt(x, y + 1) && this.getArrowPartAt(x - 1, y))
      return "NW";
    if(this.getArrowPartAt(x, y - 1) && this.getArrowPartAt(x + 1, y))
      return "SE";
    if(this.getArrowPartAt(x, y - 1) && this.getArrowPartAt(x - 1, y))
      return "SW";
    return null;
  }

  public static getArrowPartAt(x: number, y: number) : Sup.Actor {
    for(let part of this.arrowParts)
    {
      let posX = Math.floor(part.getPosition().x);
      let posY = Math.floor(part.getPosition().y);
      if(x == posX && y == posY) {
        return part;
      }
    }
    
    return undefined;
  }
}