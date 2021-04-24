import * as ax from "axios";
import { parse } from "node-html-parser";

const axios = ax.default;

export class ZeroChan {
    public static get BASE() {return "https://www.zerochan.net"};

    public static async predict(TAG: string): Promise<Array<{tag: string, type: string}>> {
        let res = (await axios.get(this.BASE + "/suggest?q=" + TAG + "&limit=10&timestamp=" + new Date().getTime())).data;
        const arr = [];

        for (let part of res.split("\n")) {
            arr.push({
                tag: part.split("|")[0],
                type: part.split("|")[1]
            });
        }

        arr.pop();

        return arr;
    }

    public static async getPageArtworksByTag(TAG: string, page: number): Promise<Array<string>> {
        const html = parse((await axios.get(this.BASE + "/" + TAG + "?p=" + page)).data);
        const arr = [];

        for (let e of html.querySelectorAll("ul#thumbs2 > li > a")) {
            arr.push(this.BASE + e.getAttribute("href"));
        }

        return arr;
    }

    public static async getFirstPageArtworksByTag(TAG: string): Promise<Array<string>> {
        return this.getPageArtworksByTag(TAG, 1);
    }

    public static async getAllPagesArtworksByTag(TAG: string): Promise<Array<string>> {
        let arr = [];
        let page = await this.getFirstPageArtworksByTag(TAG);
        let i = 1;
        while (page.length > 0) {
            arr = arr.concat(page);
            i++;
            page = await this.getPageArtworksByTag(TAG, i);
        }

        return arr;
    }

    public static async getImage(URL: string): Promise<string> {
        const html = parse((await axios.get(URL)).data);
        return html.querySelector("a.preview").getAttribute("href");
    }

    public static async downloadImage(URL: string): Promise<Buffer> {
        return (await axios.get(URL, {responseType: "arraybuffer"})).data;
    }
}