type TileTypes = "plain" | "road" | "river" | "wood" | "mountain" | "bridge" | "water" | "shoal";

class TileStatusBehavior extends Sup.Behavior {
  
  awake() {
    
  }

  update() {
    let cursor = Sup.getActor("Cursor").getBehavior(MouseGridBehavior);  
    let typeNameIcon = this.actor.getChild("TypeName");
    let typeIcon = this.actor.getChild("TypeIcon");
    
    typeNameIcon.spriteRenderer.setAnimation(cursor.tileType);
    typeIcon.spriteRenderer.setAnimation(cursor.tileType);
  }
  
}
Sup.registerBehavior(TileStatusBehavior);
