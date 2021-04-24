"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const ZeroChan_1 = require("./ZeroChan");
(async () => {
    //console.log((await ZeroChan.getAllPagesArtworksByTag("Lappland")).length);
    fs_1.writeFileSync("./test.jpg", await ZeroChan_1.ZeroChan.downloadImage(await ZeroChan_1.ZeroChan.getImage("https://www.zerochan.net/2824482")));
})();
