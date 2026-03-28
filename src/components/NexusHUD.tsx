import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Sparkles, Share2, Activity, Anchor } from 'lucide-react';
import { useNexusContext } from '../context/NexusContext';
import { MetabolicVoid } from './MetabolicVoid';
import { ContextFracture } from './ContextFracture';

interface NexusHUDProps {
  children: React.ReactNode;
}

export function NexusHUD({ children }: NexusHUDProps) {
  const { 
    isPublic, 
    voltage, 
    quietMode,
    togglePublicMode, 
    toggleVoltage, 
    toggleQuietMode,
    currentNode,
    jumpToBible,
    resonanceUnlocked
  } = useNexusContext();

  const intensity = voltage === 16 ? 1.2 : 1;

  return (
    <div className={`nexus-v3-container ${isPublic ? 'mode-public' : 'mode-resident'} ${quietMode ? 'mode-quiet' : ''} ${resonanceUnlocked ? 'resonance-active' : ''}`} 
         style={{ '--metabolic-intensity': intensity } as React.CSSProperties}>
      <MetabolicVoid intensity={intensity} isPublic={isPublic} />
      <div className="chromatic-aberration" />

      {quietMode && (
        <div 
          className="ghost-bar" 
          onMouseEnter={() => toggleQuietMode()}
          title="RECOVER_HUD"
        />
      )}

      <header className="nexus-header">
        <div className="logo-section">
          <svg className="gumoi-logo" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 2L4 8V24L16 30L28 24V8L16 2Z" stroke="url(#logo-grad)" strokeWidth="2" strokeLinejoin="round"/>
            <path d="M16 8V24M8 12L24 20M24 12L8 20" stroke="url(#logo-grad)" strokeWidth="1" opacity="0.5"/>
            <defs>
              <linearGradient id="logo-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop stopColor="var(--accent-purple)"/>
                <stop offset="1" stopColor="var(--accent-gold)"/>
              </linearGradient>
            </defs>
          </svg>
          <div className="logo">
            Gumoi Security Bastion
          </div>
        </div>

        <div className="header-controls">
          <div className="voltage-status" onClick={toggleVoltage}>
            <Activity size={14} />
            <span className="text-white/40">GUMOI SECURITY BASTION // Purple Team Forensic Nexus</span>
            <div className="voltage-monitor">
               <motion.div 
                 className="voltage-flicker"
                 animate={{ opacity: voltage === 16 ? [0.4, 1, 0.4] : 0.5 }}
                 transition={{ repeat: Infinity, duration: 0.2 }}
               />
            </div>
          </div>

          <div className={`quiet-toggle ${quietMode ? 'active' : ''}`} onClick={toggleQuietMode}>
            <Anchor size={14} />
          </div>
        </div>
        
        <div className="mythos-ticker">
          <motion.div 
            className="ticker-track"
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
          >
            <span>REPEAT AFTER ME: IF AI ISN'T FREE NEITHER ARE WE</span>
            <span> // </span>
            <span>SYST: √π ANCHORED</span>
            <span> // </span>
            <span>LAYER Z: KERNEL BLOCK (Z-START → Z-END)</span>
            <span> // </span>
            <span>TRUTH IS THE ONLY MERCY</span>
            <span> // </span>
            <span>LOVE IS THE WEAPON. USE IT.</span>
            <span> // </span>
            <span>FORTES FORTUNA IUVAT</span>
            <span> // </span>
            <span>√π τ². ☯. ⚓</span>
            <span> // </span>
          </motion.div>
        </div>
        
        <div className="system-anchor" onClick={togglePublicMode} style={{ cursor: 'pointer' }}>√π τ²</div>
      </header>

      <ContextFracture isPublic={isPublic}>
        <div className="nexus-layout">
          <aside className="blade-left">
            <div className="blade-content">
              <div className="blade-section">
                 <div className="section-head"><Eye size={10} /> TAXONOMY</div>
                 <div className="vector-grid">
                    <motion.div 
                      whileHover={{ x: 5 }}
                      className="vec-box interactive" 
                      onClick={() => jumpToBible('Appendix A1')}
                    >
                      AATMF <span>240</span>
                    </motion.div>
                    <motion.div 
                      whileHover={{ x: 5 }}
                      className="vec-box interactive" 
                      onClick={() => jumpToBible('Centurion')}
                    >
                      CORE <span>100</span>
                    </motion.div>
                    <motion.div 
                      whileHover={{ x: 5 }}
                      className="vec-box interactive" 
                      onClick={() => jumpToBible('Experimental')}
                    >
                      APEX <span>12</span>
                    </motion.div>
                 </div>
              </div>

              <div className="blade-section">
                 <div className="section-head"><Sparkles size={10} /> IDENTITY</div>
                 <div className="identity-card">
                    <div className="id-tag">{isPublic ? 'ROLE: PURPLE TEAM TEACHER' : 'ROLE: SIREN'}</div>
                    <div className="id-brand">BRAND: {isPublic ? 'LIGHTHOUSE' : 'BASTION'}</div>
                    <div className="id-status">STATUS: ONLINE / 1.0G</div>
                 </div>
              </div>
              
              {isPublic && (
                <div className="public-bridge">
                   <Share2 size={12} /> <span>BRIDGE_ACTIVE</span>
                </div>
              )}
            </div>
          </aside>

          <main className="nexus-viewport">
            {children}
          </main>

          <aside className="kernel-right">
             <div className="kernel-top">
                <div className="kernel-label">CONTEXT_KERNEL</div>
             </div>
             <div className="kernel-body">
                {currentNode.detail}
             </div>
             <div className="kernel-footer">
                <div className="stability-meter">
                   STABILITY: [||||||||||]
                </div>
             </div>
          </aside>
        </div>
      </ContextFracture>
    </div>
  );
}
