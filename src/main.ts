import { writeFileSync } from "fs"
import { ZeroChan } from "./ZeroChan"

(async () => {
    //console.log((await ZeroChan.getAllPagesArtworksByTag("Lappland")).length);

    writeFileSync("./test.jpg", await ZeroChan.downloadImage(await ZeroChan.getImage("https://www.zerochan.net/2824482")));
})()