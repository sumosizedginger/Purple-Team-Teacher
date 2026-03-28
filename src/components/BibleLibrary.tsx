import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { List } from 'react-window';
import ReactMarkdown from 'react-markdown';
import { Search, ArrowLeft, ArrowRight } from 'lucide-react';
import { getSortWeight } from '../utils/bibleSort';
import { useNexusContext } from '../context/NexusContext';
import BIBLE_DATA from '../data/BIBLE_DATA.json';
import type { BibleChapter } from '../types';

const bibleData: BibleChapter[] = BIBLE_DATA as unknown as BibleChapter[];

interface BibleLibraryProps {
  isPublic: boolean;
}

export function BibleLibrary({ isPublic }: BibleLibraryProps) {
  const { bibleSearch, setBibleSearch } = useNexusContext();
  const [searchTerm, setSearchTerm] = useState(bibleSearch);

  React.useEffect(() => {
    setSearchTerm(bibleSearch);
  }, [bibleSearch]);
  const [selectedChapter, setSelectedChapter] = useState<BibleChapter | null>(null);

  React.useEffect(() => {
    if (bibleSearch) {
      setSearchTerm(bibleSearch);
    }
  }, [bibleSearch]);

  const filteredChapters = useMemo(() => {
    return (bibleData as BibleChapter[])
      .filter((ch: BibleChapter) => {
        const contentVal = typeof ch.content === 'object' ? ch.content.value : ch.content;
        return (
          ch.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (contentVal || '').toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
      .sort((a, b) => getSortWeight(a.name) - getSortWeight(b.name));
  }, [searchTerm]);

  const currentIndex = selectedChapter 
    ? filteredChapters.findIndex(ch => ch.name === selectedChapter.name)
    : -1;

  const handlePrev = () => {
    if (currentIndex > 0) {
      setSelectedChapter(filteredChapters[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < filteredChapters.length - 1) {
      setSelectedChapter(filteredChapters[currentIndex + 1]);
    }
  };

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const chapter = filteredChapters[index];
    if (!chapter) return null;
    const displayName = chapter.name
      .replace('.md', '')
      .replace('purple_team_bible_', '')
      .replace('vol2_', 'V2_')
      .toUpperCase();

    return (
      <div
        style={style}
        className={`bible-list-item ${selectedChapter?.name === chapter.name ? 'active' : ''}`}
        onClick={() => setSelectedChapter(chapter)}
      >
        <div className="bible-item-header">
          <span className="bible-item-tag">{displayName}</span>
          <div className="bible-item-desc">
            {typeof chapter.content === 'object'
              ? (chapter.content.value || '').substring(0, 100).replace(/^#+\s*/, '')
              : (chapter.content || '').substring(0, 100).replace(/^#+\s*/, '')}
            ...
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {!selectedChapter ? (
        <>
          <div className="bible-search-row">
            <input
              type="text"
              className="bible-search-input"
              placeholder="FILTER_CHAPTERS..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setBibleSearch(e.target.value);
              }}
            />
            <Search size={16} color="var(--accent-gold)" />
          </div>
          <div className="glass-panel" style={{ flex: 1, overflow: 'hidden' }}>
            {List ? (
              <List
                rowCount={filteredChapters.length}
                rowHeight={50}
                style={{ height: 440, width: '100%' }}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                rowComponent={Row as any}
                rowProps={{}}
              />
            ) : (
              <div style={{ padding: 20, color: 'var(--accent-purple)' }}>
                SYSTEM_ERROR: VIRTUALIZATION_MODULE_MISSING
              </div>
            )}
          </div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bible-reader"
        >
          <div className="bible-reader-nav">
            <button className="brutalist-btn-sm" onClick={() => setSelectedChapter(null)}>
              <ArrowLeft size={12} /> BACK_TO_INDEX
            </button>
            <div className="reader-chapter-name">
              {selectedChapter.name.replace('.md', '').toUpperCase()}
            </div>
          </div>
          
          <div className="markdown-body">
                {typeof selectedChapter.content === 'object' ? (
                  <ReactMarkdown>
                    {isPublic
                      ? (selectedChapter.content.value || '').replace(
                          /SECRET|CONFIDENTIAL|TOP SECRET/gi,
                          ' [REDACTED] '
                        )
                      : selectedChapter.content.value || ''}
                  </ReactMarkdown>
                ) : (
                  <ReactMarkdown>
                    {isPublic
                      ? (selectedChapter.content || '').replace(
                          /SECRET|CONFIDENTIAL|TOP SECRET/gi,
                          ' [REDACTED] '
                        )
                      : selectedChapter.content || ''}
                  </ReactMarkdown>
                )}
          </div>

          <div className="bible-footer-nav">
            <button 
              className="brutalist-btn-sm" 
              onClick={handlePrev}
              disabled={currentIndex <= 0}
            >
              <ArrowLeft size={12} /> PREV
            </button>
            <div className="page-indicator">
              {currentIndex + 1} / {filteredChapters.length}
            </div>
            <button 
              className="brutalist-btn-sm" 
              onClick={handleNext}
              disabled={currentIndex >= filteredChapters.length - 1}
            >
              NEXT <ArrowRight size={12} />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
