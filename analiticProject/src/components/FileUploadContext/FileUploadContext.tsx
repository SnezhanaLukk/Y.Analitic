import { createContext, useContext, useState, type ReactNode } from "react";

type UploadStatus = "empty" | "uploading" | "uploaded" | "done" | "error";

interface FileUploadContextType {
    status: UploadStatus;
    fileName: string | null;
    setStatus: (status: UploadStatus) => void;
    setFileName: (fileName: string | null) => void;
}

const FileUploadContext = createContext<FileUploadContextType | undefined>(undefined);
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

export const useFileUpload = () => {
    const context = useContext(FileUploadContext);
    if (!context) {
        throw new Error("useFileUpload must be used within a FileUploadProvider");
    }
    return context;
};