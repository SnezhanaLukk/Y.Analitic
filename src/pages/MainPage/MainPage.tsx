import Upload from '../../components/Upload/Upload';
import Highlight from '../../components/Highlight/Highlight';
import { FileUploadProvider } from '../../components/FileUploadContext/FileUploadProvider';

function MainPage() {
    return (
        <FileUploadProvider>
            <div>
                <Upload />
                <Highlight />
            </div>
        </FileUploadProvider>
    );
}

export default MainPage;
