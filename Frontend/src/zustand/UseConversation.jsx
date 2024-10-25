import { create } from 'zustand'

const UseConversation = create((set, get) => ({
  selectConversation : null,
  messages: [],

  setSelectConversation : (newConversation) => {
    const {selectConversation} = get();

    if(selectConversation !== newConversation){
      set({selectConversation: newConversation, messages: []})
    }else{
      set({selectConversation: newConversation})
    }
  },
  setMessages: (messages) => set({messages})
}))

export default UseConversation