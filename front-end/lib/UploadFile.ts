import { getStorage, ref, uploadBytes } from 'firebase/storage';
import {storage} from "@/firebase"
interface FileUploadProps {
    file: Blob;
    folderPath: string;
}

const uploadFile = async (props: FileUploadProps) => {
    const { file, folderPath  } = props;
    const allowedExtensions = ['jpg', 'jpeg', 'png'];
    // Extract the file extension from the file name
    const fileNameParts = file.name.split('.');
    const fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase();

    // Check if the file extension is allowed
    if (!allowedExtensions.includes(fileExtension)) {
        throw new Error('Only JPG, JPEG, and PNG files are allowed.');
    }

    // Determine the MIME type based on the file extension
    let fileType = '';
    switch (fileExtension) {
        case 'jpg':
            fileType = 'image/jpg';
            break;
        case 'jpeg':
            fileType = 'image/jpeg';
            break;
        case 'png':
            fileType = 'image/png';
            break;
        default:
            throw new Error('Unsupported file extension.');
    }

    console.log(fileType);
    const blob = new Blob([file], {type: fileType});
    const newfile = new Uint8Array(await blob.arrayBuffer());
    const storageRef = ref(storage, `${folderPath}/${Date.now()}.${fileExtension}`); 
    try {
    const snapshot = await uploadBytes(storageRef, newfile, {
        contentType: fileType
    });
    const downloadURL = snapshot.metadata.fullPath;
    console.log('File uploaded successfully!', downloadURL);
    return downloadURL; // Return the download URL
    } catch (error) {
    console.error('Error uploading file:', error);
    throw error; 
    }
};
export default uploadFile;

