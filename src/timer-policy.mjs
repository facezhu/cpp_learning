export function pauseReason({ paused, hidden, focused, now, lastActivity }) {
  return paused ? '已手动暂停' : hidden ? '页面隐藏，已暂停' : !focused ? '窗口失焦，已暂停' : now-lastActivity>=300000 ? '空闲超过 5 分钟' : '';
}
export function activeDelta(elapsed, eligible, previouslyEligible, hasLease) {
  return eligible && previouslyEligible && hasLease && elapsed>=0 && elapsed<2500 ? elapsed : 0;
}
