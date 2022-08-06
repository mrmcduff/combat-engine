import { generateStockCharacter } from 'actors/stockGenerator';
import { executeResult } from 'engine/executeResult';
import { AttackResult } from 'types/combat/attackResult';

describe('Tests for applying the results of an attack', () => {
  it('Alters the input combatant data', () => {
    const ninja = generateStockCharacter('ninja');
    const atkResult: AttackResult = {
      attackerName: 'sumo',
      defenderName: 'ninja',
      balanceLoss: 10,
      damage: 8,
      delay: 10,
      weaponDamage: 0,
      armorDamage: 0,
      shieldDamage: 0,
      resultClass: 'Clean Hit',
      fatigue: 15,
    };
    const startHealth = ninja.getVarPhysical().health;
    const startFatigue = ninja.getVarPhysical().fatigue;
    const startBalance = ninja.getCorePhysical().balance;
    const startBaseBalance = ninja.coreBasePhysical.balance;

    const outputDelay = executeResult(ninja, atkResult, 1);
    const endHealth = ninja.getVarPhysical().health;
    const endFatigue = ninja.getVarPhysical().fatigue;
    const endBalance = ninja.getCorePhysical().balance;
    const endBaseBalance = ninja.coreBasePhysical.balance;

    expect(outputDelay).toEqual(5.225);
    expect(endFatigue).toBeGreaterThan(startFatigue);
    expect(endFatigue).toEqual(15);
    expect(endHealth).toBeLessThan(startHealth);
    expect(startHealth - endHealth).toEqual(8);
    expect(startBalance - endBalance).toEqual(10);
    expect(endBaseBalance).toEqual(startBaseBalance);
  });
});
