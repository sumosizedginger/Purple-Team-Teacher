import React from 'react';

export interface BibleChapter {
  name: string;
  content?: {
    value?: string;
    [key: string]: unknown;
  } | string;
}

export interface NexusNode {
  id: string;
  name: string;
  icon: React.ReactNode;
  class: string;
  detail: string;
  roomContent: {
    title: string;
    data: string;
    logs: string[];
    isJournal?: boolean;
    markdown?: string;
    externalUrl?: string;
    links?: { label: string; url: string }[];
  };
}
