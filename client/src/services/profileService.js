import api from "./api";

export const uploadAvatar = async (formData) => {

    const response = await api.post(
        "/profile/avatar",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;

};
