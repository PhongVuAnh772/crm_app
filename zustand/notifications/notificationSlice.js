// booleanStore.js
import { create } from 'zustand'

const useNotificationStore = create(set => ({
  isTrue: true, 
  toggle: () => set(state => ({ isTrue: !state.isTrue })), 
  setTrue: () => set({ isTrue: true }),
  setFalse: () => set({ isTrue: false }), 
}));

export default useNotificationStore;
