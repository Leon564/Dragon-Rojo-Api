const ILovePDFApi = require('@ilovepdf/ilovepdf-nodejs');
const ILovePDFFile = require('@ilovepdf/ilovepdf-nodejs/ILovePDFFile');
const fs = require('fs');
const os = require('os');
const dotenv = require('dotenv');
dotenv.config();

const ilovepdf = new ILovePDFApi(process.env.ILOVEPF_PUBLIC_KEY, process.env.ILOVEPF_SECRET_KEY);

/**
 * It takes a file path or a buffer and returns a buffer of the converted file.
 * @param filePath - The path to the file you want to convert.
 * @returns A promise.
 */
const wordToPdf = async (filePath) => {
    const task = ilovepdf.newTask('officepdf') //as OfficePdfTask;
    let file = filePath;
    const tempDir = os.tmpdir() + Date.now() + '.docx';
    if (Buffer.isBuffer(filePath)) {
        file = tempDir;
        fs.writeFileSync(file, filePath);
    }


    return task.start()
        .then(() => {
            const _file = new ILovePDFFile(file);
            return task.addFile(_file);
        })
        .then(() => {
            return task.process();
        })
        .then(() => {
            return task.download();
        })
        .then((data) => {
            if (file === tempDir) fs.unlinkSync(file);
            return data;
        })
        .catch((err) => {
            if (file === tempDir) fs.unlinkSync(file);
            return { error: err };
        });
}
module.exports = wordToPdf;