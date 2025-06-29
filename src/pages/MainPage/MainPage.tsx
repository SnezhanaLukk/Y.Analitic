import Upload from '../../components/Upload/Upload';
import Highlight from '../../components/Highlight/Highlight';

function MainPage() {
    return (
        <div data-testid='main-page'>
            <Upload />
            <Highlight />
        </div>
    );
}

export default MainPage;
