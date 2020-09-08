declare const launchPlaywright: (browserType: string, args: string[], page: {
    id: string;
    url: string;
}) => Promise<void>;
export default launchPlaywright;
