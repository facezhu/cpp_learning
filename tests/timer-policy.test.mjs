import test from 'node:test';
import assert from 'node:assert/strict';
import { elapsedSince, elapsedDays } from '../src/timer-policy.mjs';
test('wall elapsed time includes background, idle and sleep without a 30 minute cap',()=>{
  const start=Date.parse('2026-10-15T10:00:00+08:00');
  for(const duration of [1000,300000,1800000,7200000,3*86400000])assert.equal(elapsedSince(start,start+duration),duration);
  assert.equal(elapsedSince(start,start-1000),0);
});
test('Hong Kong dates split arbitrary sleep intervals across multiple midnights',()=>{
  const start=Date.parse('2026-10-15T23:59:50+08:00');
  assert.deepEqual(elapsedDays(start,15000),{'2026-10-15':10000,'2026-10-16':5000});
  const days=elapsedDays(start,3*86400000);assert.equal(Object.keys(days).length,4);assert.equal(Object.values(days).reduce((a,b)=>a+b,0),3*86400000);
});
