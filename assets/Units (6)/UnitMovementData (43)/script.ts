module MovementData {
  
  export let types = { infantry: null, mechanized: null, tires: null, thread: null, air: null, trans: null, ship: null };
  
  export function get(key: string, unitType: string): string {
    let parts = key.split(".");
    let obj = types[unitType];
    for (let part of parts) {
      if (obj == null) {
        Sup.log(`The key -"${key}"- is missing for type -${unitType}-`);
        break;
      }
      obj = obj[part];
    }
    return obj != null ? obj : `[Missing key "${key}"]`;
  }
  
  export function getChoices(key: string, unitType: string): { [key: string]: string } { return <any>get(key, unitType); }
}

MovementData.types.infantry = {
  "plain":    1,
  "road":     1,
  "building": 1,
  "bridge":   1,
  "river":    2,
  "mountain": 2,
  "wood":     1,
  "shoal":    1,
  "water":    999,
  "ports":    1
}

MovementData.types.mechanized = {
  "plain":    1,
  "road":     1,
  "building": 1,
  "bridge":   1,
  "river":    1,
  "mountain": 1,
  "wood":     1,
  "shoal":    1,
  "water":    999,
  "ports":    1
}

MovementData.types.tires = {
  "plain":    2,
  "road":     1,
  "building": 1,
  "bridge":   1,
  "river":    999,
  "mountain": 999,
  "wood":     3,
  "shoal":    1,
  "water":    999,
  "ports":    1
}

MovementData.types.thread = {
  "plain":    2,
  "road":     1,
  "building": 1,
  "bridge":   1,
  "river":    999,
  "mountain": 999,
  "wood":     2,
  "shoal":    1,
  "water":    999,
  "ports":    1
}

MovementData.types.air = {
  "plain":    1,
  "road":     1,
  "building": 1,
  "bridge":   1,
  "river":    1,
  "mountain": 1,
  "wood":     1,
  "shoal":    1,
  "water":    1,
  "ports":    1
}

MovementData.types.trans = {
  "plain":    999,
  "road":     999,
  "building": 999,
  "bridge":   999,
  "river":    999,
  "mountain": 999,
  "wood":     999,
  "shoal":    1,
  "water":    1,
  "ports":    1  
}

MovementData.types.ship = {
  "plain":    999,
  "road":     999,
  "building": 999,
  "bridge":   999,
  "river":    999,
  "mountain": 999,
  "wood":     999,
  "shoal":    999,
  "water":    1,
  "ports":    1 
}
//todo : more