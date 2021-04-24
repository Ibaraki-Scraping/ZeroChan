"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZeroChan = void 0;
const ax = require("axios");
const node_html_parser_1 = require("node-html-parser");
const axios = ax.default;
class ZeroChan {
    static get BASE() { return "https://www.zerochan.net"; }
    ;
    static async predict(TAG) {
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
    static async getPageArtworksByTag(TAG, page) {
        const html = node_html_parser_1.parse((await axios.get(this.BASE + "/" + TAG + "?p=" + page)).data);
        const arr = [];
        for (let e of html.querySelectorAll("ul#thumbs2 > li > a")) {
            arr.push(this.BASE + e.getAttribute("href"));
        }
        return arr;
    }
    static async getFirstPageArtworksByTag(TAG) {
        return this.getPageArtworksByTag(TAG, 1);
    }
    static async getAllPagesArtworksByTag(TAG) {
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
    static async getImage(URL) {
        const html = node_html_parser_1.parse((await axios.get(URL)).data);
        return html.querySelector("a.preview").getAttribute("href");
    }
    static async downloadImage(URL) {
        return (await axios.get(URL, { responseType: "arraybuffer" })).data;
    }
}
exports.ZeroChan = ZeroChan;
