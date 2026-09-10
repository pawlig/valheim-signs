import test from 'node:test';
import assert from 'node:assert/strict';
import { fitSignFontSize, SIGN_GEOMETRY } from '../lib/sign-layout.ts';
import { compileSign, defaults } from '../lib/rich-text.ts';
const sample = {
  sceneWidth: 600,
  longestLineWidthAt100: 250,
  capHeightAt100: 70,
  lineCount: 1,
};
void test('short default label has calibrated cap height proportional to the board', () => {
  const size = fitSignFontSize(sample);
  assert.ok(
    Math.abs(size * 0.7 - 600 * SIGN_GEOMETRY.boardHeightRatio * 0.48) < 0.001,
  );
  assert.equal(fitSignFontSize({ ...sample, sceneWidth: 300 }), size / 2);
});
void test('longer labels shrink continuously to the available width', () => {
  const first = fitSignFontSize({ ...sample, longestLineWidthAt100: 800 });
  const next = fitSignFontSize({ ...sample, longestLineWidthAt100: 810 });
  assert.ok(next < first && next > first * 0.98);
  assert.ok(first * 8 <= 600 * 0.63 * 0.88 + 0.001);
});
void test('multiple explicit lines also fit vertically', () => {
  const size = fitSignFontSize({ ...sample, lineCount: 4 });
  assert.ok(size < fitSignFontSize(sample));
  assert.ok(
    size * (0.7 + 3 * 1.05) <=
      600 * SIGN_GEOMETRY.boardHeightRatio * 0.76 + 0.001,
  );
});
void test('default black sign needs no color or size markup', () => {
  assert.equal(defaults.color, '');
  assert.equal(compileSign('DŘEVO', defaults), 'DŘEVO');
});
