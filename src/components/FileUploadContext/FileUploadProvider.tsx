import { useState, type ReactNode } from 'react';

import FileUploadContext, { type UploadStatus } from './FileUploadContext';

interface FileUploadProviderProps {
    children: ReactNode;
}

export const FileUploadProvider = ({ children }: FileUploadProviderProps) => {
    const [status, setStatus] = useState<UploadStatus>('empty');
    const [fileName, setFileName] = useState<string | null>(null);

    return (
        <FileUploadContext.Provider value={{ status, setStatus, fileName, setFileName }}>
            {children}
        </FileUploadContext.Provider>
    );
};
