export interface Message {
    id: string;
    role: 'USER' | 'ASSISTANT' | 'SYSTEM';
    content: string;
    createdAt: string;
}

export interface Conversation {
    id: string;
    title: string | null;
    summary: string | null;
    updatedAt: string;
}

export interface ChatState {
    conversations: Conversation[];
    activeConversationId: string | null;
    messages: Message[];
    isLoading: boolean;
    isSending: boolean;
}
