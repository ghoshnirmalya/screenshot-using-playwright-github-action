declare const sendDataToDB: (image: any, page: {
    id: string;
    url: string;
}, browserType: string) => Promise<{
    screenshot: any;
}>;
export default sendDataToDB;
