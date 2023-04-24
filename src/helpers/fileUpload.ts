export const fileUpload = async (file: File) => {

    if (!file) throw new Error('No file to upload');

    const cloudUrl = 'https://api.cloudinary.com/v1_1/aprendiendo/upload';

    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file);

    try {

        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        });

        if (!resp.ok) throw new Error('No possible upload');

        const cloudResp = await resp.json();

        return cloudResp.secure_url;

    } catch (error: any) {
        console.log(error);
        throw new Error(error.message);
    }

} 