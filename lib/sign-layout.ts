/**
 * Visual calibration from moCronik's in-game REGULAR/BOLD reference.
 * This models vanilla auto-sizing, not Unity's exact font-atlas renderer.
 */
export const SIGN_GEOMETRY = {
  boardWidthRatio: 0.63,
  boardHeightRatio: (0.31 * 1024) / 1536,
  textWidthRatio: 0.88,
  singleLineCapHeightRatio: 0.48,
  multilineHeightRatio: 0.76,
  lineHeight: 1.05,
} as const;

export function fitSignFontSize({
  sceneWidth,
  longestLineWidthAt100,
  capHeightAt100,
  lineCount,
}: {
  sceneWidth: number;
  longestLineWidthAt100: number;
  capHeightAt100: number;
  lineCount: number;
}): number {
  if (sceneWidth <= 0 || capHeightAt100 <= 0 || lineCount < 1) return 0;
  const boardWidth = sceneWidth * SIGN_GEOMETRY.boardWidthRatio;
  const boardHeight = sceneWidth * SIGN_GEOMETRY.boardHeightRatio;
  const capRatio = capHeightAt100 / 100;
  const maximumSize =
    (boardHeight * SIGN_GEOMETRY.singleLineCapHeightRatio) / capRatio;
  const widthSize =
    longestLineWidthAt100 > 0
      ? (boardWidth * SIGN_GEOMETRY.textWidthRatio * 100) /
        longestLineWidthAt100
      : maximumSize;
  const heightSize =
    (boardHeight * SIGN_GEOMETRY.multilineHeightRatio) /
    (capRatio + (lineCount - 1) * SIGN_GEOMETRY.lineHeight);
  return Math.min(maximumSize, widthSize, heightSize);
}
