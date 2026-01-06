import { SimpAction, AttackResult } from './types';

export const GODDESS_NAME = "高冷女神";
export const LI_ZONG_NAME = "卑微李总";

export const SYSTEM_INSTRUCTION = ""; // No longer needed for local logic

// 1. LOW TIER (No money / Annoying) - High Damage
export const POOR_RESPONSES: AttackResult[] = [
  { text: "滚。", damage: 100, criticalWord: "滚" },
  { text: "看到你就恶心。", damage: 90, criticalWord: "呕" },
  { text: "哪里来的自信？", damage: 85, criticalWord: "？" },
  { text: "不照照镜子？", damage: 95, criticalWord: "丑" },
  { text: "已读。", damage: 60, criticalWord: "阅" },
  { text: "没空，勿扰。", damage: 80, criticalWord: "忙" },
  { text: "你也配？", damage: 100, criticalWord: "配？" },
  { text: "...", damage: 50, criticalWord: "..." }
];

// 2. MID TIER (Some money) - Medium Damage
export const RICH_RESPONSES: AttackResult[] = [
  { text: "呵呵。", damage: 50, criticalWord: "呵" },
  { text: "就这？", damage: 60, criticalWord: "少" },
  { text: "心意领了，人不必到。", damage: 40, criticalWord: "拒" },
  { text: "哦。", damage: 30, criticalWord: "哦" },
  { text: "当我是乞丐？", damage: 70, criticalWord: "穷" }
];

// 3. HIGH TIER (Whale) - Low/No Damage (Success)
export const WHALE_RESPONSES: AttackResult[] = [
  { text: "收到。", damage: 10, criticalWord: "阅" },
  { text: "嗯，放那吧。", damage: 5, criticalWord: "嗯" },
  { text: "下次别破费了。", damage: 0, criticalWord: "乖" },
  { text: "（发了一个表情包）", damage: 0, criticalWord: "❤" },
  { text: "这颜色还行。", damage: 5, criticalWord: "行" }
];

export const SIMP_ACTIONS: SimpAction[] = [
  {
    id: '1',
    label: '嘘寒问暖',
    emoji: '🥺',
    riskLevel: 'High',
    promptContext: 'warmth', // Simplified context key
    cost: 0
  },
  {
    id: '2',
    label: '发520红包',
    emoji: '🧧',
    riskLevel: 'Medium',
    promptContext: '520',
    cost: 520
  },
  {
    id: '3',
    label: '送爱马仕',
    emoji: '👜',
    riskLevel: 'Low',
    promptContext: 'hermes',
    cost: 50000
  },
  {
    id: '4',
    label: '自我感动',
    emoji: '📝',
    riskLevel: 'High',
    promptContext: 'cringe',
    cost: 0
  },
  {
    id: '5',
    label: '死缠烂打',
    emoji: '📢',
    riskLevel: 'High',
    promptContext: 'spam',
    cost: 0
  },
  {
    id: '6',
    label: '豪车接送',
    emoji: '🏎️',
    riskLevel: 'Medium',
    promptContext: 'car',
    cost: 2000
  }
];