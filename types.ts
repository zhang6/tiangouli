export enum Sender {
  LiZong = 'LiZong',
  Goddess = 'Goddess',
  System = 'System'
}

export interface ChatMessage {
  id: string;
  sender: Sender;
  text: string;
  timestamp: Date;
}

export interface SimpAction {
  id: string;
  label: string;
  emoji: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  promptContext: string;
  cost: number;
}

export enum GameStatus {
  Idle = 'Idle',
  Charging = 'Charging', // Li Zong trying to move up
  Attacking = 'Attacking', // Goddess dropping text
  Hit = 'Hit', // Li Zong getting smashed
  Bankrupt = 'Bankrupt',
  Blocked = 'Blocked'
}

export interface AttackResult {
  text: string; // The text reply
  damage: number; // How far he falls (0-100)
  criticalWord: string; // The 1-2 char word that appears as a rock (e.g. "滚")
}
