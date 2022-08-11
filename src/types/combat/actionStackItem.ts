import { ActionType } from './actionType';

export interface ActionStackItem {
  instigator: string | null;
  actionType: ActionType;
  actionParameters: string; // TODO: replace with an object keyed off of the action type.
  targets: string[];
}
