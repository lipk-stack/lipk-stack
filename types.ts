
export type Role = 'user' | 'model';

export interface Message {
  role: Role;
  text: string;
  isAnalysis?: boolean;
}

export interface Analysis {
  planner: string;
  critic: string;
  mediator: string;
}

export interface AppState {
  messages: Message[];
  isThinking: boolean;
  contextCollected: boolean;
  hasStarted: boolean;
}
