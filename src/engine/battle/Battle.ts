import { Combatant } from 'actors/combatant';
import { TurnStep } from 'types/turns/turnStep';
import { ActionStackItem } from 'types/combat/actionStackItem';
import { ListenableStack } from 'types/structures/ListenableStack';
import { StackListener } from 'types/structures/StackListener';
import { generateTurnArray } from '../generateTurnArray';
import { executeActionStackItem } from '../executeActionStackItem';
import { executeResult } from '../executeResult';
import { adjustPhysicalStatsFromFatigue } from '../adjustPhysicalStatsFromFatigue';
import { executeRecovery } from '../executeRecovery';

export class Battle implements StackListener {
  combatants: Combatant[];

  upcomingTurns: [Combatant, number][];

  currentCombatantTurn: Combatant | null;

  currentTurn: number;

  currentTurnStep: TurnStep;

  inProgressActionStack: ActionStackItem[];

  queuedActionStack: ListenableStack<ActionStackItem>;

  listenerId: number;

  combatantMap: Map<string, Combatant>;

  constructor(combatants: Combatant[]) {
    // Things to add: An initial delay array, a "locations" array, a BattleBoard or setting for the battle
    // and any special circumstances.
    this.combatants = combatants;
    this.upcomingTurns = generateTurnArray(
      combatants,
      new Array(combatants.length).fill(0)
    );
    this.currentCombatantTurn =
      this.upcomingTurns.length > 0 ? this.upcomingTurns[0]![0] : null;
    this.currentTurn = 0;
    this.currentTurnStep = TurnStep.SelectAction;
    this.inProgressActionStack = [];
    this.queuedActionStack = new ListenableStack<ActionStackItem>();
    this.listenerId = this.queuedActionStack.setListener(this);
    this.combatantMap = new Map();
    this.combatants.forEach(cmb => this.combatantMap.set(cmb.name, cmb));
  }

  onStackChange(): void {
    if (this.queuedActionStack.size() > 0) {
      const item = this.queuedActionStack.pop()!;
      if (item) {
        const result = executeActionStackItem(item, this.combatantMap);
        this.currentTurnStep = TurnStep.ApplyResults;
        // Perhaps apply a log message here?
        // Later, this is when I would add interrupts and follows to the queued stack.
        const delays: Map<Combatant, number> = new Map();
        result.resultMap.forEach((res, target) => {
          const delay = executeResult(target, res);
          delays.set(target, delay);
        });
        const allDelays = this.combatants.map(cmb => delays.get(cmb) ?? 0);

        this.currentTurnStep = TurnStep.FinalStatusAdjustment;
        this.combatants.forEach(adjustPhysicalStatsFromFatigue);
        // Add a log after stat adjustments
        this.upcomingTurns = generateTurnArray(this.combatants, allDelays);
        this.currentTurnStep = TurnStep.Recovery;
      }
    }
  }

  takeTurn(action: ActionStackItem): void { // TODO: return a log string
    const instigator = action.instigator ? this.combatantMap.get(action.instigator) : null;
    if (instigator?.getLastAction() && this.currentTurnStep === TurnStep.Recovery) {
      executeRecovery(instigator, instigator.getLastAction()!.actionType);
      this.currentTurnStep = TurnStep.InitialStatusAdjustment;
      adjustPhysicalStatsFromFatigue(instigator);
      this.currentTurnStep = TurnStep.SelectAction;
    }


    this.currentTurnStep = TurnStep.ExecuteAction;
    this.queuedActionStack.push(action);
  }

  complete(): void { // TODO: return the total log?
    this.queuedActionStack.removeListener(this.listenerId);
  }
}
