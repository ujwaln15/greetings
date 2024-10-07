export const createChatSlice = (set, get) => ({
  selectedChatType: undefined,
  selectedChatData: undefined,
  selectedChatMessages: [],
  duoContacts: [],
  isUploading: false,
  isDownloading: false,
  fileUploadProgress: 0,
  fileDownloadProgress: 0,
  gatherings: [],
  setGatherings: (gatherings) => set({ gatherings }),
  setIsUploading: (isUploading) => set({ isUploading }),
  setIsDownloading: (isDownloading) => set({ isDownloading }),
  setFileUploadProgress: (fileUploadProgress) => set({ fileUploadProgress }),
  setFileDownloadProgress: (fileDownloadProgress) =>
    set({ fileDownloadProgress }),
  setSelectedChatType: (selectedChatType) => set({ selectedChatType }),
  setSelectedChatData: (selectedChatData) => set({ selectedChatData }),
  setSelectedChatMessages: (selectedChatMessages) =>
    set({ selectedChatMessages }),
  setDuoContacts: (duoContacts) => set({ duoContacts }),
  addGathering: (gathering) => {
    const gatherings = get().gatherings;
    set({ gatherings: [gathering, ...gatherings] });
  },
  closeChat: () =>
    set({
      selectedChatData: undefined,
      selectedChatType: undefined,
      selectedChatMessages: [],
    }),
  addMessage: (message) => {
    const selectedChatMessages = get().selectedChatMessages;
    const selectedChatType = get().selectedChatType;
    set({
      selectedChatMessages: [
        ...selectedChatMessages,
        {
          ...message,
          recipient:
            selectedChatType === "gathering"
              ? message.recipient
              : message.recipient._id,
          sender:
            selectedChatType === "gathering"
              ? message.sender
              : message.sender._id,
        },
      ],
    });
  },
  addGatheringInGatheringsList: (message) => {
    const gatherings = get().gatherings;
    const data = gatherings.find(
      (gathering) => gathering._id === message.gatheringId
    );
    const index = gatherings.findIndex(
      (gathering) => gathering._id === message.gatheringId
    );
    if (index !== -1 && index !== undefined) {
      gatherings.splice(index, 1);
      gatherings.unshift(data);
    }
  },
  addContactsInDuoContacts: (message) => {
    const userId = get().userInfo.id;
    const fromId =
      message.sender._id === userId
        ? message.recipient._id
        : message.sender._id;
    const fromData =
      message.sender._id === userId ? message.recipient : message.sender;
    const duoContacts = get().duoContacts;
    const data = duoContacts.find((contact) => contact._id === fromId);
    const index = duoContacts.findIndex((contact) => contact._id === fromId);
    if (index != -1 && index !== undefined) {
      duoContacts.splice(index, 1);
      duoContacts.unshift(data);
    } else {
      duoContacts.unshift(fromData);
    }
    set({ duoContacts });
  },
});
