import api from "./api";

export const getConversations = async () => {
    const response = await api.get("/conversations");
    return response.data;
};

export const createConversation = async (receiverId) => {
    const response = await api.post("/conversations", {
        receiverId,
    });

    return response.data;
};
