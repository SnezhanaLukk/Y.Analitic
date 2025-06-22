import { createContext } from 'react';

export type UploadStatus = 'empty' | 'uploading' | 'uploaded' | 'done' | 'error';

interface FileUploadContextType {
    status: UploadStatus;
    fileName: string | null;
    setStatus: (status: UploadStatus) => void;
    setFileName: (fileName: string | null) => void;
}

const FileUploadContext = createContext<FileUploadContextType | undefined>(undefined);

export default FileUploadContext;
