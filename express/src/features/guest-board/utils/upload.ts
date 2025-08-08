export function extractImageUrl(content: string): string[] {
    const imageUrls: string[] = [];
    const regex = /<img[^>]*?src="([^"]*)"[^>]*?>/g;

    let match: RegExpExecArray | null;
    while ((match = regex.exec(content)) !== null) {
        const fullUrl = match[1];
        const pathMatch = /\/uploads\/[^"]+/.exec(fullUrl);
        if (pathMatch) {
            imageUrls.push(pathMatch[0]);
        }
    }

    return imageUrls;
}
