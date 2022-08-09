import { Combatant } from "actors/combatant";
import { ActionType } from "./actionType";

export interface ActionStackItem {
  instigator: Combatant | null;
  actionType: ActionType;
  actionParameters: string; //TODO: replace with an object keyed off of the action type.
  targets: Combatant[];
}