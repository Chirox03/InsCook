import { ref, getDownloadURL } from 'firebase/storage';
import { storage } from '@/firebase';

async function getDownloadUrlForFile(filePath: string) {
    try {
        const fileRef = ref(storage, filePath);
        const downloadUrl = await getDownloadURL(fileRef);
        return downloadUrl;
    } catch (error) {
        console.error('Error getting download URL:', error);
        return null;
    }
}

export default getDownloadUrlForFile;