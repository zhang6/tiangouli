import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameStatus } from '../types';

interface GameCanvasProps {
  progress: number; // 0 (bottom) to 100 (top)
  status: GameStatus;
  criticalWord: string;
}

export const GameCanvas: React.FC<GameCanvasProps> = ({ progress, status, criticalWord }) => {
  const [shake, setShake] = useState(0);

  // Trigger screen shake on hit
  useEffect(() => {
    if (status === GameStatus.Hit) {
      setShake(20);
      const timer = setTimeout(() => setShake(0), 500);
      return () => clearTimeout(timer);
    }
  }, [status]);

  // Derived positions
  // Adjust visual range slightly for responsive height
  const liZongVisualY = 10 + (progress * 0.7); 

  return (
    <div 
      className="relative w-full h-full bg-gradient-to-b from-purple-900 via-gray-800 to-black overflow-hidden rounded-xl border-4 border-gray-700 shadow-2xl"
      style={{ transform: `translate(${shake > 0 ? Math.random() * shake - shake/2 : 0}px, ${shake > 0 ? Math.random() * shake - shake/2 : 0}px)` }}
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500 via-transparent to-transparent animate-pulse"></div>

      {/* Height Markers */}
      <div className="absolute right-2 top-10 text-white/20 text-xs font-mono">女神防线 100m</div>
      <div className="absolute right-2 bottom-10 text-white/20 text-xs font-mono">舔狗深渊 0m</div>

      {/* GODDESS (THE BOSS) */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center">
        <div className="relative">
          <motion.div 
            className="text-6xl md:text-7xl drop-shadow-[0_0_15px_rgba(255,0,0,0.8)]"
            animate={{ scale: status === GameStatus.Attacking ? 1.5 : 1 }}
          >
            👸🏻
          </motion.div>
          {/* Evil Aura */}
          <div className="absolute -inset-4 bg-red-500 rounded-full opacity-20 blur-xl animate-pulse"></div>
          
          {/* Status Indicator bubble */}
          {status === GameStatus.Charging && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -right-24 top-0 bg-white text-black text-xs px-2 py-1 rounded-full shadow-lg"
            >
              对方正在输入...
            </motion.div>
          )}
        </div>
        <div className="bg-red-900/80 text-red-100 text-[10px] px-2 py-0.5 rounded-full mt-1 border border-red-500">
          极度鄙视中
        </div>
      </div>

      {/* ATTACK TEXT (The Heavy Rock) */}
      <AnimatePresence>
        {status === GameStatus.Attacking || status === GameStatus.Hit ? (
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 z-30 flex items-center justify-center"
            initial={{ top: '15%', opacity: 1, scale: 0.5 }}
            animate={{ 
              top: status === GameStatus.Hit ? `${100 - liZongVisualY}%` : '80%', // Drop to Li Zong's head
              scale: [1, 2, 3], // Grow huge
              opacity: status === GameStatus.Hit ? 0 : 1
            }} 
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeIn" }}
          >
            <div className="font-black text-8xl md:text-9xl text-white tracking-widest stroke-black stroke-2" style={{ textShadow: '4px 4px 0 #000, -2px -2px 0 #f00' }}>
              {criticalWord}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* IMPACT EXPLOSION */}
      {status === GameStatus.Hit && (
         <motion.div 
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-9xl z-40"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.3 }}
         >
           💥
         </motion.div>
      )}

      {/* LI ZONG (The Climber) */}
      <motion.div
        className="absolute left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center"
        style={{ bottom: `${liZongVisualY}%` }}
        animate={
            status === GameStatus.Charging ? { y: -20, scale: 1.1 } :
            status === GameStatus.Hit ? { y: 200, rotate: 720, scale: 0.8 } : // Fall down when hit
            { y: 0, rotate: 0 }
        }
        transition={status === GameStatus.Hit ? { duration: 0.5, type: "tween" } : { type: "spring" }}
      >
        {/* Thought Bubble */}
        <div className="bg-white text-black px-2 py-0.5 rounded-lg text-[10px] mb-1 opacity-80 whitespace-nowrap">
          {status === GameStatus.Hit ? "啊啊啊啊!" : (status === GameStatus.Charging ? "紧张..." : "女神看看我!")}
        </div>

        {/* Li Zong Nameplate */}
        <div className="bg-green-900/80 text-green-100 text-[10px] px-2 py-0.5 rounded-full mb-1 border border-green-500 font-bold whitespace-nowrap shadow-sm">
           李总
        </div>

        <div className="relative">
          {/* Character */}
          <div className="text-4xl md:text-5xl filter grayscale contrast-125">
             {status === GameStatus.Hit ? '😵' : '🐶'}
          </div>
          <div className="text-3xl md:text-4xl -mt-2">
             {status === GameStatus.Hit ? '🌪️' : '🧎'}
          </div>
          
          {/* Blood/Sweat */}
          {status !== GameStatus.Hit && (
             <motion.div 
               className="absolute -right-2 top-0 text-blue-400 text-xl"
               animate={{ opacity: [0, 1, 0], y: [0, 5] }}
               transition={{ repeat: Infinity, duration: 0.2 }} // Faster sweat when waiting
             >
               💦
             </motion.div>
          )}
        </div>
      </motion.div>

      {/* The Ladder/Ground */}
      <div className="absolute bottom-0 w-full h-8 bg-black border-t-2 border-gray-600"></div>
    </div>
  );
};