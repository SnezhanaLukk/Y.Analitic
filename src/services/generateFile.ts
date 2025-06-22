async function generateFile() {
    const url = 'http://localhost:3000/report?';
    const params = new URLSearchParams({
        size: '0.1',
        withErrors: 'on',
        maxSpend: '1000'
    });
    try {
        const response = await fetch(`${url}${params.toString()}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.blob();
        const urlForDownload = URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = urlForDownload;
        link.download = 'file_uploaded_1.csv';
        link.click();

        URL.revokeObjectURL(urlForDownload);
        link.remove();

        return 'done'
    } catch {
        return 'error';
    }
}

export default generateFile;