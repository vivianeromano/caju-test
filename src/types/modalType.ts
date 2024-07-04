export enum ActionType {
  APPROVE,
  REVIEW,
  REPROVE,
  REMOVE
}

export interface ManageModal {
  open: boolean;
  actionType?: ActionType;
  id?: string;
}
