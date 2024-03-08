
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const dirPath = path.resolve(__dirname, './dist');
const targetDirPath = path.resolve(__dirname, './npmDist');
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';


if (!fs.existsSync(dirPath)) {
    const childProcess = spawn(npm, ['run','build'], { cwd: __dirname });
    childProcess.stdout.pipe(process.stdout);
    childProcess.stderr.pipe(process.stderr);

    childProcess.on('close', (err) => {
        if (err) return console.error(err);
        copyFile(dirPath, targetDirPath)
    })

} else {
    copyFile(dirPath, targetDirPath)
}

function copyFile(path, targetPath) {
    fs.cp(path, targetPath, {
        recursive: true
    }, (err) => {
        if (err) {
            return console.error(err);
        }
        const childProcess = spawn(npm, ['init','-y'], { cwd: targetDirPath });
        childProcess.stdout.pipe(process.stdout);
        childProcess.stderr.pipe(process.stderr);
    
    })
}

