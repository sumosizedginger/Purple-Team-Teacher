import { describe, it, expect } from 'vitest';
import { getSortWeight } from './bibleSort';

describe('getSortWeight', () => {
  it('should rank foreword first', () => {
    expect(getSortWeight('purple_team_bible_foreword.md')).toBe(0);
    expect(getSortWeight('purple_team_bible_vol2_foreword.md')).toBe(300);
  });

  it('should rank chapters after foreword and in numerical order', () => {
    expect(getSortWeight('purple_team_bible_ch01.md')).toBe(101);
    expect(getSortWeight('purple_team_bible_ch10.md')).toBe(110);
    expect(getSortWeight('purple_team_bible_vol2_ch01.md')).toBe(401);
  });

  it('should rank appendices after chapters', () => {
    expect(getSortWeight('purple_team_bible_appendix_a1.md')).toBe(201);
    expect(getSortWeight('purple_team_bible_appendix_a3.md')).toBe(203);
  });

  it('should rank master_outline correctly', () => {
    expect(getSortWeight('purple_team_bible_master_outline.md')).toBe(1);
    expect(getSortWeight('purple_team_bible_vol2_master_outline.md')).toBe(301);
  });

  it('should handle volume 2 correctly', () => {
    expect(getSortWeight('purple_team_bible_vol2_ch05.md')).toBe(405);
    expect(getSortWeight('purple_team_bible_vol2_appendix_a1.md')).toBe(501);
  });
});
