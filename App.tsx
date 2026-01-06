import React, { useState, useEffect } from 'react';
import { GameCanvas } from './components/GameCanvas';
import { ChatWindow } from './components/ChatWindow';
import { ActionPanel } from './components/ActionPanel';
import { ChatMessage, Sender, SimpAction, GameStatus } from './types';
import { generateGoddessAttack } from './services/geminiService';
import { v4 as uuidv4 } from 'uuid';

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [wallet, setWallet] = useState(50000); 
  const [progress, setProgress] = useState(0); // 0 to 100
  const [status, setStatus] = useState<GameStatus>(GameStatus.Idle);
  const [criticalWord, setCriticalWord] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    addLog(Sender.System, '连接到女神的精神网络... 准备受虐。');
  }, []);

  const addLog = (sender: Sender, text: string) => {
    setMessages(prev => [...prev, {
      id: uuidv4(),
      sender,
      text,
      timestamp: new Date()
    }]);
  };

  const handleAction = async (action: SimpAction) => {
    if (loading || status !== GameStatus.Idle) return;

    // Cost Check
    if (wallet < action.cost) {
      addLog(Sender.System, '余额不足！你连做舔狗的资格都没有了。');
      setStatus(GameStatus.Bankrupt);
      return;
    }

    setWallet(prev => prev - action.cost);
    addLog(Sender.LiZong, action.label);
    
    // 1. Charge Phase
    setStatus(GameStatus.Charging);
    setLoading(true);

    // Wait for animation and API
    const result = await generateGoddessAttack(action.promptContext);
    
    // 2. Attack Phase
    setCriticalWord(result.criticalWord || "滚");
    setStatus(GameStatus.Attacking);
    
    // Short delay for the "Rock" to appear before impact
    setTimeout(() => {
        // 3. Impact Phase
        if (result.damage > 20) {
           setStatus(GameStatus.Hit);
           // Calculate Knockback
           setProgress(prev => Math.max(0, prev - result.damage * 0.5));
           addLog(Sender.Goddess, `${result.text} (暴击: -${result.damage})`);
        } else {
           // Success / Low Damage
           setStatus(GameStatus.Idle);
           setProgress(prev => Math.min(100, prev + 15));
           addLog(Sender.Goddess, `${result.text} (女神稍微看了一眼)`);
        }

        // 4. Reset
        setTimeout(() => {
            if (status !== GameStatus.Bankrupt && status !== GameStatus.Blocked) {
                setStatus(GameStatus.Idle);
            }
            setLoading(false);
        }, 1000);

    }, 800); // Duration of the "Attack" hover
  };

  const handleRestart = () => {
    setWallet(50000);
    setProgress(0);
    setMessages([]);
    setStatus(GameStatus.Idle);
    addLog(Sender.System, '再次尝试挑战女神的心...');
  };

  return (
    <div className="h-[100dvh] bg-gray-900 text-white flex flex-col max-w-lg mx-auto shadow-2xl overflow-hidden font-sans">
      
      {/* Header (Fixed height) */}
      <div className="flex-none p-3 bg-red-900 flex justify-between items-center shadow-lg z-10 h-14">
        <h1 className="font-black italic text-lg tracking-wider">舔狗受难记</h1>
        <div className="bg-black/50 px-2 py-0.5 rounded text-yellow-400 font-mono text-sm">
           💰 ¥{wallet.toLocaleString()}
        </div>
      </div>

      {/* Content Container (Flex fill) */}
      <div className="flex-1 flex flex-col p-2 min-h-0 relative">
        
        {/* Game Canvas (Takes available space) */}
        <div className="flex-1 min-h-0 mb-2">
            <GameCanvas 
                progress={progress} 
                status={status} 
                criticalWord={criticalWord} 
            />
        </div>
        
        {/* Controls (Fixed height content) */}
        <div className="flex-none flex flex-col">
            <ChatWindow messages={messages} />
            <ActionPanel 
                onAction={handleAction} 
                disabled={loading || status !== GameStatus.Idle} 
                wallet={wallet} 
            />
        </div>

      </div>

      {/* Overlays */}
      {status === GameStatus.Bankrupt && (
        <div className="absolute inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-8 text-center animate-fadeIn">
           <div className="text-8xl mb-4">☠️</div>
           <h2 className="text-4xl font-black text-red-600 mb-4">GAME OVER</h2>
           <p className="text-gray-400 mb-8">你没钱了。在女神眼里，没钱的舔狗连呼吸都是错的。</p>
           <button onClick={handleRestart} className="bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105">
             投胎重来
           </button>
        </div>
      )}

    </div>
  );
};

export default App;