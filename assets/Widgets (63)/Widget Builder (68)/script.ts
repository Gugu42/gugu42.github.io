/**
  Helper to build widgets.
*/
class WidgetBuilder {
  
  public static buildActionWidget(x: number, y: number, ...actions : string[])
  {
    let widget = Sup.appendScene("Widgets/Action Menu/Prefab")[0];
    widget.setPosition(x, y, 0.2);
    
    //Set actions & size
    widget.getChild("Background").spriteRenderer.setAnimation("" + actions.length);
    
    let i = 0;
    for(let action of actions)
    {
      let newAction = Sup.appendScene("Widgets/Action Menu/Action")[0];
      newAction.spriteRenderer.setAnimation(action);
      newAction.setParent(widget.getChild("Actions"));
      newAction.setLocalPosition(0, i, 0.1);
      i--;
    }
  }
  
  public static buildLobbyWidget(x: number, y: number, rooms: Array<Room>) {
    let i = 0;
    for(let room of rooms) {
      let widget = Sup.appendScene("Widgets/Lobby Widget/Prefab")[0];
      Sup.log(room);
      widget.getChild("PlayerCount").textRenderer.setText(room.players + "/");
      widget.getChild("Slots").textRenderer.setText(room.slots);
      widget.textRenderer.setText(room.name);
      widget.setName(room.id);
      
      widget.setPosition(x, y+i, 0.2);
      i--;
    }
  }
  
}