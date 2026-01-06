import React from 'react';
import { SIMP_ACTIONS } from '../constants';
import { SimpAction } from '../types';

interface ActionPanelProps {
  onAction: (action: SimpAction) => void;
  disabled: boolean;
  wallet: number;
}

export const ActionPanel: React.FC<ActionPanelProps> = ({ onAction, disabled, wallet }) => {
  return (
    <div className="grid grid-cols-3 gap-1 mt-1">
      {SIMP_ACTIONS.map((action) => {
        const canAfford = wallet >= action.cost;
        const isInteractable = !disabled && canAfford;

        return (
          <button
            key={action.id}
            onClick={() => onAction(action)}
            disabled={!isInteractable}
            className={`
              relative flex flex-col items-center justify-center p-1 rounded-lg border transition-all h-14
              ${
                !canAfford 
                  ? 'bg-gray-100 border-gray-200 opacity-50 cursor-not-allowed grayscale' 
                  : disabled 
                    ? 'bg-gray-50 border-gray-200 cursor-wait'
                    : 'bg-white border-blue-100 hover:border-blue-400 hover:bg-blue-50 active:scale-95'
              }
            `}
          >
            <span className="text-xl mb-0.5 leading-none">{action.emoji}</span>
            <span className="font-bold text-[10px] text-gray-700 leading-none transform scale-90">{action.label}</span>
            <span className={`text-[9px] font-mono leading-none mt-0.5 ${action.cost > 0 ? 'text-red-500' : 'text-green-600'}`}>
              {action.cost > 0 ? `¥${action.cost}` : '免费'}
            </span>
          </button>
        );
      })}
    </div>
  );
};