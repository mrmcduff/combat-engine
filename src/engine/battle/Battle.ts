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
import { humanLogAction } from './humanLogAction';

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

  usingStackListener: boolean;

  constructor(combatants: Combatant[]) {
    // Things to add: An initial delay array, a "locations" array, a BattleBoard or setting for the battle
    // and any special circumstances.
    this.combatants = combatants;
    this.usingStackListener = false;
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
    // Not registering as a listener until we start using stack/listener mechanism
    this.listenerId = this.usingStackListener
      ? this.queuedActionStack.setListener(this)
      : 0;
    this.combatantMap = new Map();
    this.combatants.forEach((cmb) => this.combatantMap.set(cmb.name, cmb));
  }

  onStackChange(): void {
    // TODO: later, update this if needed.
    if (this.queuedActionStack.size() > 0) {
      const item = this.queuedActionStack.pop()!;
      if (item) {
        executeActionStackItem(item, this.combatantMap);
        this.currentTurnStep = TurnStep.ApplyResults;
        // Perhaps apply a log message here?
        // Later, this is when I would add interrupts and follows to the queued stack.
        const delays: Map<Combatant, number> = new Map();
        // result.resultMap.forEach((res, target) => {
        //   const targetCombatant =
        //   const delay = executeResult(target, res);
        //   delays.set(target, delay);
        // });
        const allDelays = this.combatants.map((cmb) => delays.get(cmb) ?? 0);

        this.currentTurnStep = TurnStep.FinalStatusAdjustment;
        this.combatants.forEach(adjustPhysicalStatsFromFatigue);
        // Add a log after stat adjustments
        this.upcomingTurns = generateTurnArray(this.combatants, allDelays);
        this.currentTurnStep = TurnStep.Recovery;
      }
    }
  }

  afterTurn(): void {
    this.currentCombatantTurn =
      this.upcomingTurns.length > 0 ? this.upcomingTurns[0]![0] : null;
    this.currentTurn += 1;
  }

  beforeTurn(skipRecovery = false): [string, string][] {
    const instigator = this.currentCombatantTurn;
    const outputLog: [string, string][] = [];
    if (
      !skipRecovery &&
      instigator?.getLastAction() &&
      this.currentTurnStep === TurnStep.Recovery
    ) {
      const recoveryLogs = executeRecovery(
        instigator,
        instigator.getLastAction()!.actionType
      );
      this.currentTurnStep = TurnStep.InitialStatusAdjustment;
      const adjustments = adjustPhysicalStatsFromFatigue(instigator);

      // Now log the actions
      recoveryLogs.forEach((rl) => outputLog.push([instigator!.name, rl]));
      adjustments.forEach((ad) => outputLog.push([instigator.name, ad]));
    }
    this.currentTurnStep = TurnStep.SelectAction;
    return outputLog;
  }

  takeTurn(action: ActionStackItem): [string, string][] {
    // TODO: return a log string
    this.currentTurnStep = TurnStep.ExecuteAction;
    const outputLog: [string, string][] = [];

    // if using the stack method, just add it to the stack.
    // this.queuedActionStack.push(action);

    const result = executeActionStackItem(action, this.combatantMap);
    // Log our results
    outputLog.push(...humanLogAction(action, result));
    this.currentTurnStep = TurnStep.ApplyResults;
    // Perhaps apply a log message here?
    // Later, this is when I would add interrupts and follows to the queued stack.
    const delays: Map<Combatant, number> = new Map();
    result.resultMap.forEach((res, target) => {
      const targetCombatant = this.combatantMap.get(target);
      if (targetCombatant) {
        const delay = executeResult(targetCombatant, res);
        delays.set(targetCombatant, delay);
      }
    });
    const allDelays = this.combatants.map((cmb) => delays.get(cmb) ?? 0);

    this.currentTurnStep = TurnStep.FinalStatusAdjustment;

    const adjustmentLogs: [string, string][] = this.combatants.flatMap(
      (cmb) => {
        const batch: [string, string][] = [];
        const allSingleLogs = adjustPhysicalStatsFromFatigue(cmb);
        allSingleLogs.forEach((sl) => batch.push([cmb.name, sl]));
        return batch;
      }
    );
    // Add a log after stat adjustments
    outputLog.push(...adjustmentLogs);

    this.upcomingTurns = generateTurnArray(this.combatants, allDelays);
    this.currentTurnStep = TurnStep.Recovery;

    return outputLog;
  }

  complete(): void {
    // TODO: return the total log?
    if (this.usingStackListener) {
      this.queuedActionStack.removeListener(this.listenerId);
    }
  }
}
