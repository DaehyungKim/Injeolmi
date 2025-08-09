import logger from 'jet-logger';

export function extractImageUrl(content: string): string[] {
    console.log('extractImageUrl called with content:', content);
    const mediaUrls: string[] = [];
    const urlRegex = /src="(https?:\/\/[^"]+)"/g;

    let match: RegExpExecArray | null;
    while ((match = urlRegex.exec(content)) !== null) {
        const url = match[1];
        logger.info(`추출된 S3 URL: ${url}`);
        mediaUrls.push(url);
    }
    logger.info(mediaUrls);
    logger.info(content);

    

    return mediaUrls;
}
