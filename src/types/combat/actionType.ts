export enum ActionType {
  Recovery = 0,
  Move,
  Attack,
  Use,
  ActiveDodge,
  ActiveDefense,
  Rest, // Rest is when you do nothing and just recover fatigue
  ActiveReset, // ActiveReset is getting back up after unbalancing -- actively resetting your stance, etc
}
