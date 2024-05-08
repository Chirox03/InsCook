import { getStorage, ref, uploadBytes } from 'firebase/storage';
import {storage} from "@/firebase"
interface FileUploadProps {
    file: Blob;
    folderPath: string;
}

const uploadFile = async (props: FileUploadProps) => {
    const { file, folderPath  } = props;
    const blob = new Blob([file], {type: 'image/png'})
    const newfile = new Uint8Array(await blob.arrayBuffer());
    const storageRef = ref(storage, `${folderPath}/${Date.now()}.jpg`);
    try {
    const snapshot = await uploadBytes(storageRef, newfile);
    const downloadURL = snapshot.metadata.fullPath;
    console.log('File uploaded successfully!', downloadURL);
    return downloadURL; // Return the download URL
    } catch (error) {
    console.error('Error uploading file:', error);
    throw error; 
    }
};
export default uploadFile;

