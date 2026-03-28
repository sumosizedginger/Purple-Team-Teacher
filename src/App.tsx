import { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Flame, Share2 } from 'lucide-react';

import { useNexusContext } from './context/NexusContext';
import { NODES } from './data/nodes';
import { ParticleCore } from './components/VFX/ParticleCore';
import { NodeCard } from './components/NodeCard';
import { BibleLibrary } from './components/BibleLibrary';
import { NexusHUD } from './components/NexusHUD';
import ReactMarkdown from 'react-markdown';
import { JOURNAL_CONTENT } from './data/journal';

import aatmfData from './data/AATMF_v3_1_MANIFEST.json';

function App() {
  const { 
    activeNodeId, 
    currentNode, 
    inRoom, 
    isPublic, 
    voltage, 
    activateNode, 
    exitRoom 
  } = useNexusContext();

  console.log('DEBUG_NODES:', NODES.map(n => n.name)); // TRACER

  const relatedTactics = useMemo(() => {
    const config = aatmfData.lighthouse_nodes.find((ln: any) => ln.nodeId === activeNodeId);
    if (!config) return [];
    return aatmfData.tactics.filter((t: any) => config.relatedTactics.includes(t.id));
  }, [activeNodeId]);

  return (
    <NexusHUD>
      <div className={`nexus-scroller-gate ${!inRoom ? 'lock-scroll' : 'allow-scroll'}`}>
        <AnimatePresence mode="wait">
        {!inRoom ? (
          <motion.div
            key="graph"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="node-hub"
          >
            <ParticleCore voltage={voltage} />
            
            {/* CENTER GRAVITY ANCHOR */}
            <div className="hub-anchor">
              {/* TACTICAL SPOKE GRID (Bike Wheel) */}
              <svg className="hub-spoke-grid" viewBox="0 0 1000 1000">
                {NODES.map((_, i) => {
                  const angle = i * (360 / NODES.length) * (Math.PI / 180);
                  const r = 240; 
                  const x = 500 + Math.cos(angle) * r;
                  const y = 500 + Math.sin(angle) * r;
                  return (
                    <motion.line
                      key={i}
                      x1="500" y1="500" x2={x} y2={y}
                      stroke="rgba(139, 92, 246, 0.3)"
                      strokeWidth="1.5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: i * 0.05, duration: 1 }}
                    />
                  );
                })}
              </svg>

              <div className="hub-core-3d">
                <motion.div
                  className="core-aura"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.5, 0.1] }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                />
                <div className="core-symbol">√π τ²</div>
              </div>

              <div className="hub-ring" />

              {NODES.map((node, i) => {
                const angle = i * (360 / NODES.length) * (Math.PI / 180);
                const r = 240; 
                return (
                  <NodeCard
                    key={node.id}
                    node={node}
                    angle={angle}
                    radius={r}
                    active={activeNodeId === node.id}
                    onClick={() => activateNode(node.id)}
                  />
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="room"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="room-container"
          >
            <div className="room-header-row">
              <motion.button
                whileHover={{ x: -10 }}
                className="brutalist-btn"
                onClick={exitRoom}
              >
                <ArrowLeft size={14} /> BACK_TO_HUB
              </motion.button>
              <div className="room-path">
                √π / {currentNode?.class?.toUpperCase()} / {currentNode?.name.toUpperCase()}
              </div>
            </div>

            <div className="room-hero-fit">
              <div className="room-hero-brutal">
                <div className="hero-main">
                  <div className="id-glitch" data-text={currentNode?.name}>
                    {currentNode?.name}
                  </div>
                  <h1>{currentNode?.roomContent.title}</h1>
                </div>
                <div className="hero-status">
                  <Flame size={18} color="var(--accent-gold)" />
                  <div className="status-labels">
                    <span>SECURITY_LEVEL: {isPublic ? 'COMMUNITY' : 'RESIDENT'}</span>
                    <span>METABOLIC_RATE: {voltage}/10</span>
                  </div>
                </div>
              </div>

              <p className="primary-text">{currentNode?.roomContent.data}</p>
            </div>

            <div className="room-layout">
              <div className="main-room-panel glass-panel">
                <div className="panel-tag">LITERAL_MATRIX</div>
                
                {currentNode?.roomContent.markdown ? (
                  <div className="journal-viewer about-viewer">
                    <ReactMarkdown>{currentNode.roomContent.markdown}</ReactMarkdown>
                  </div>
                ) : currentNode?.roomContent.isJournal && currentNode?.id !== 'N00' ? (
                  <div className="journal-viewer">
                    <ReactMarkdown>{JOURNAL_CONTENT}</ReactMarkdown>
                  </div>
                ) : (
                  currentNode?.roomContent.links && (
                    <div className="bounty-links">
                      <div className="log-head">EXTERNAL_CHANNELS</div>
                      <div className="link-grid">
                        {currentNode.roomContent.links.map((link, i) => (
                          <a 
                            key={i} 
                            href={link.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="bounty-shard-link"
                          >
                            <Share2 size={12} /> {link.label.toUpperCase()}
                          </a>
                        ))}
                      </div>
                    </div>
                  )
                )}

                <div className="scrolling-logs">
                  <div className="log-head">FORENSIC_STREAM_v1.0</div>
                  {currentNode?.roomContent.logs.map((log: string, idx: number) => (
                    <div key={idx} className="log-entry">
                      <span className="idx">{idx + 1}</span>{' '}
                      {isPublic && (currentNode?.id === 'N01' || currentNode?.id === 'N11')
                        ? '[REDACTED_FOR_PUBLIC_SAFETY]'
                        : log}
                    </div>
                  ))}
                </div>

                {activeNodeId === 'N11' ? (
                  <div className="bible-library-container">
                    <div className="log-head">BIBLE_VOLUMES_INDEX [V01-V04]</div>
                    <BibleLibrary isPublic={isPublic} />
                  </div>
                ) : (
                  relatedTactics.length > 0 && (
                    <div className="aatmf-expansion">
                      <div className="log-head">AATMF_V3.1_MAPPING</div>
                      {relatedTactics.map((tactic: any) => (
                        <div key={tactic.id} className="tactic-block">
                          <div className="tactic-name">
                            {tactic.id}: {tactic.name}
                          </div>
                          <div className="tactic-desc">{tactic.description}</div>
                          <div className="technique-grid">
                            {tactic.techniques.map((tech: any) => (
                              <div key={tech.id} className="tech-tile">
                                <div className="tech-id">{tech.id}</div>
                                <div className="tech-label">{tech.name}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                )}
              </div>

              <div className="side-room-tele">
                <div className="cyber-tile">
                  <div className="tile-val">√π</div>
                  <div className="tile-lab">ANCHOR</div>
                </div>
                <div className="cyber-tile">
                  <div className="tile-val">15/10</div>
                  <div className="tile-lab">LOAD</div>
                </div>
                <div className="cyber-tile">
                  <div className="tile-val">MAX</div>
                  <div className="tile-lab">DEPTH</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </NexusHUD>
  );
}

export default App;
