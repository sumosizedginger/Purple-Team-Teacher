import React, { createContext, useContext, useState, useMemo, useCallback, useRef } from 'react';
import { NODES } from '../data/nodes';
import type { NexusNode } from '../types';

interface NexusContextType {
  activeNodeId: string;
  currentNode: NexusNode;
  inRoom: boolean;
  isPublic: boolean;
  voltage: number;
  bibleSearch: string;
  nodeVisits: Record<string, number>;
  quietMode: boolean;
  resonanceUnlocked: boolean;
  logHover: (id: string) => void;
  setBibleSearch: (s: string) => void;
  activateNode: (id: string) => void;
  jumpToBible: (searchTerm: string) => void;
  exitRoom: () => void;
  togglePublicMode: () => void;
  toggleVoltage: () => void;
  toggleQuietMode: () => void;
}

const NexusContext = createContext<NexusContextType | undefined>(undefined);

export function NexusProvider({ children }: { children: React.ReactNode }) {
  const [activeNodeId, setActiveNodeId] = useState('N14');
  const [inRoom, setInRoom] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [voltage, setVoltage] = useState(16);
  const [bibleSearch, setBibleSearch] = useState('');
  const [nodeVisits, setNodeVisits] = useState<Record<string, number>>({});
  const [quietMode, setQuietMode] = useState(false);
  const hoverSequence = useRef<string[]>([]);
  const [resonanceUnlocked, setResonanceUnlocked] = useState(false);

  const currentNode: NexusNode = useMemo(
    () => NODES.find((n) => n.id === activeNodeId) || NODES[0],
    [activeNodeId]
  );

  const activateNode = useCallback((id: string) => {
    setActiveNodeId(id);
    setInRoom(true);
    setNodeVisits(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  }, []);

  const jumpToBible = useCallback((searchTerm: string) => {
    setBibleSearch(searchTerm);
    setActiveNodeId('N11');
    setInRoom(true);
    setNodeVisits(prev => ({ ...prev, ['N11']: (prev['N11'] || 0) + 1 }));
  }, []);

  const exitRoom = useCallback(() => {
    setInRoom(false);
    setBibleSearch('');
  }, []);

  const togglePublicMode = useCallback(() => {
    setIsPublic((prev) => !prev);
  }, []);

  const toggleVoltage = useCallback(() => {
    setVoltage((v) => (v === 15 ? 16 : 15));
  }, []);

  const toggleQuietMode = useCallback(() => {
    setQuietMode((prev) => !prev);
  }, []);

  const logHover = useCallback((id: string) => {
    const next = [...hoverSequence.current.slice(-2), id];
    hoverSequence.current = next;
    const target = ['N00', 'N01', 'N12']; // Genesis -> Awakening -> Fracture
    if (next.join(',') === target.join(',')) {
      setResonanceUnlocked(true);
    }
  }, []);

  const value = useMemo(() => ({
    activeNodeId,
    currentNode,
    inRoom,
    isPublic,
    voltage,
    bibleSearch,
    nodeVisits,
    quietMode,
    setBibleSearch,
    activateNode,
    jumpToBible,
    exitRoom,
    togglePublicMode,
    toggleVoltage,
    toggleQuietMode,
    resonanceUnlocked,
    logHover,
  }), [
    activeNodeId, currentNode, inRoom, isPublic, voltage, 
    bibleSearch, nodeVisits, quietMode, resonanceUnlocked, activateNode, 
    jumpToBible, exitRoom, togglePublicMode, toggleVoltage, toggleQuietMode, logHover
  ]);

  return <NexusContext.Provider value={value}>{children}</NexusContext.Provider>;
}

export function useNexusContext() {
  const context = useContext(NexusContext);
  if (context === undefined) {
    throw new Error('useNexusContext must be used within a NexusProvider');
  }
  return context;
}
