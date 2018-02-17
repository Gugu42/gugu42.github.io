class ScrollingBackgroundBehavior extends Sup.Behavior {
  awake() {
    
  }

  update() {
    this.actor.move(-0.05, -0.05);
    if(this.actor.getPosition().x <= -15.9)
      this.actor.setPosition(0, 0, 0);
  }
}
Sup.registerBehavior(ScrollingBackgroundBehavior);
