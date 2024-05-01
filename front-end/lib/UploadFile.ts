import { getStorage, ref, uploadBytes } from 'firebase/storage';
import {storage} from "@/firebase"
interface FileUploadProps {
    file: Blob;
    folderPath: string; // Optional folder path for organization
}

const uploadFile = async (props: FileUploadProps) => {
    const { file, folderPath  } = props;
    console.log(`${folderPath}/${Date.now()}.jpg`)
    const storageRef = ref(storage, `${folderPath}/${Date.now()}.jpg`);

    try {
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = snapshot.metadata.fullPath;
    console.log('File uploaded successfully!', downloadURL);
    return downloadURL; // Return the download URL
    } catch (error) {
    console.error('Error uploading file:', error);
    throw error; // Re-throw the error for handling
    }
};
export default uploadFile;

