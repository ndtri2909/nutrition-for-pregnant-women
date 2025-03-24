const fs = require("fs");

//backup current build
var sourceDir = './build';
var destDir = './build_bk';
//empty build_bk folder to save space
if (fs.existsSync(destDir)) {
    fs.rmSync(destDir, { recursive: true, force: true });
}
// if folder doesn't exists create it
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}
//copy directory content including subfolders
fs.cp(sourceDir, destDir, { recursive: true }, function (err) {
    if (err) {
        console.error(err);
    } else {
        console.log("build folder backed up successfully!");
    }
}); 
