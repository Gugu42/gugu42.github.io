namespace Game
{
  export function getUnitAtPositon(x : number, y : number) : UnitBehavior
  {
    for(let unit of UnitManager.unitList)
    {
      if(!unit.getBehavior(UnitBehavior))
        continue;
      
      let unitBehavior = unit.getBehavior(UnitBehavior);
      if(unitBehavior.gridPosition.x == x && unitBehavior.gridPosition.y == y)
      {
          return unitBehavior;
      }
    }
    
    return null;
  }
  
  export function isMovementTileAtPos(pos : GridPosition) : boolean
  {
    for(let tile of UnitManager.movementTiles)
    {
      let posX = Math.floor(tile.getPosition().x);
      let posY = Math.floor(tile.getPosition().y);
      
      if(pos.x == posX && pos.y == posY)
        return true;
    } 
    return false;
  }
  
  export function hasTileProperty(x: number, y: number, property: string) : boolean
  {
    let map = Sup.getActor("Level").tileMapRenderer.getTileMap();
    let tileset = Sup.getActor("Level").tileMapRenderer.getTileSet();
    
    let properties = tileset.getTileProperties(map.getTileAt(0, x, y));
    if (properties[property] != undefined)
      return true;
    return false;
  }
  
  export function getTilePropertyInt(x: number, y: number, property: string) : number
  {
    let value = undefined;
    let map = Sup.getActor("Level").tileMapRenderer.getTileMap();
    let tileset = Sup.getActor("Level").tileMapRenderer.getTileSet();
    
    let properties = tileset.getTileProperties(map.getTileAt(0, x, y));
    if (properties[property] != undefined)
      value = (+properties[property]);
    else
      value = 1;
    return value;
  }
  
  export function getTilePropertyString(x: number, y: number, property: string) : string
  {
    let value = undefined;
    let map = Sup.getActor("Level").tileMapRenderer.getTileMap();
    let tileset = Sup.getActor("Level").tileMapRenderer.getTileSet();
    
    let properties = tileset.getTileProperties(map.getTileAt(0, x, y));
    if (properties[property] != undefined)
      value = properties[property];
    return value;
  }
  
  export function getCardinalDirectionFromTo(from: GridPosition, to: GridPosition) : Directions
  {
    if(to.x > from.x)
      return Directions.RIGHT;
    else if (to.x < from.x)
      return Directions.LEFT;
    else if (to.y > from.y)
      return Directions.UP;
    else if (to.y < from.y)
      return Directions.DOWN;
    
    return null;
  }
  
  export function getLocalTeam()
  {
    return Teams.RED;
  }
  
  export function isPaused() : boolean
  {
    return Sup.getActor("GameHandler").getBehavior(MatchHandlerBehavior).isPaused;
  }
}

class UnitManager
{
  
  static unitList : Array<Sup.Actor> = new Array<Sup.Actor>();
  static movementTiles : Array<Sup.Actor> = new Array<Sup.Actor>();
  
  public static spawnUnit(x : number, y : number, unitType: string, team : number)
  {
    let unit = Sup.appendScene("Units/"+ unitType + "/Prefab")[0];
    unit.setPosition(x + 0.5, y + 0.5);
    unit.setParent(Sup.getActor("Units"));
    unit.getBehavior(UnitBehavior).setTeam(team);
    this.unitList.push(unit);
  } 
  
  public static spawnMovementTile(x : number, y : number)
  {
    let tile = Sup.appendScene("Icons/MoveTile/Prefab")[0];
    tile.setPosition(x + 0.5, y + 0.5);
    this.movementTiles.push(tile);
  }
  
  public static clearMovementTiles()
  {
    for(let act of this.movementTiles)
    {
      act.destroy();
    }
    this.movementTiles = new Array<Sup.Actor>();
    MoveArrow.clearArrow();
  }
}
  
class GridPosition
{
  x: number;
  y: number;
  miscValue : number;
  
  constructor(x: number, y: number, miscValue = 0)
  {
    this.x = x;
    this.y = y;
    this.miscValue = miscValue;
  }
  
  public static arrayHasPosition(array: GridPosition[], position: GridPosition) : boolean
  {
    for(let tile of array)
    {
      if(tile.x == position.x && tile.y == position.y)
        return true;
    }
    return false;
  }
  
  equals(other: GridPosition) : boolean
  {
    if(other.x == this.x && other.y == this.y)
      return true;
    return false; 
  }
  
  toString() : string
  {
    return "X: " + this.x + "; Y : " + this.y + ";";
  }
}