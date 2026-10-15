import test from 'node:test';
import assert from 'node:assert/strict';
import { pauseReason, activeDelta } from '../src/timer-policy.mjs';
test('focus, visibility, idle boundary and manual pause control counting',()=>{
  const active={paused:false,hidden:false,focused:true,now:299999,lastActivity:0};
  assert.equal(pauseReason(active),'');assert.equal(pauseReason({...active,now:300000}),'空闲超过 5 分钟');
  assert.equal(pauseReason({...active,focused:false}),'窗口失焦，已暂停');assert.equal(pauseReason({...active,hidden:true}),'页面隐藏，已暂停');assert.equal(pauseReason({...active,paused:true}),'已手动暂停');
  assert.equal(pauseReason({...active,now:300001,lastActivity:300000}),'');
});
test('first frame, focus transitions and sleep gaps do not fabricate time',()=>{
  assert.equal(activeDelta(1000,true,true,true),1000);assert.equal(activeDelta(1000,true,false,true),0);assert.equal(activeDelta(1000,false,true,true),0);assert.equal(activeDelta(1000,true,true,false),0);assert.equal(activeDelta(3600000,true,true,true),0);assert.equal(activeDelta(-100,true,true,true),0);
});
