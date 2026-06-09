export const LAYOUT_SYNC_EVENT = 'synect:layout-sync'

export function dispatchLayoutSync() {
  window.dispatchEvent(new Event(LAYOUT_SYNC_EVENT))
}
