/// <reference types="node" />
export declare class ZeroChan {
    static get BASE(): string;
    static predict(TAG: string): Promise<Array<{
        tag: string;
        type: string;
    }>>;
    static getPageArtworksByTag(TAG: string, page: number): Promise<Array<string>>;
    static getFirstPageArtworksByTag(TAG: string): Promise<Array<string>>;
    static getAllPagesArtworksByTag(TAG: string): Promise<Array<string>>;
    static getImage(URL: string): Promise<string>;
    static downloadImage(URL: string): Promise<Buffer>;
}
