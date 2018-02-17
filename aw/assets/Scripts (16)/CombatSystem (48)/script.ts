namespace CombatSystem {
  export function getDamageFromTo(attacker : UnitBehavior, defender : UnitBehavior)
  {
    //Formula : ( ( ( ( ( ( IA * BD ) * AN ) * ID ) * DN ) * AH) * (( 100 – TC * DH ) / 100) )
    //Source:  http://www.warsworldnews.com/wp/aw/game-aw/battle-mechanics/
    //IA : CO attack modifier.
    //BD : Base damage
    //AN : Attacking Norm, see source
    //ID : CO defense modifier.
    //DN : Same as AN but for def
    //AH : Attacker's HP
    //TC : Terrain Cover aka defense. Represented as 10s of % (1 star = 10%)
    //DH : Defender's HP
    
    //While we don't have COs, these values will be 1 :
    //IA, AN, ID, DN
  }
}