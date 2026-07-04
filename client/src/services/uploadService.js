import api from "./api";

export const uploadFile = async (formData) => {

    const response = await api.post(
        "/upload",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;

};
