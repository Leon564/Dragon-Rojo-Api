import fs from 'fs';
import os from 'os';
import 'dotenv/config';
import ILovePDFApi from '@ilovepdf/ilovepdf-nodejs';
import ILovePDFFile from '@ilovepdf/ilovepdf-nodejs/ILovePDFFile.js';

const ilovepdf = new ILovePDFApi(
  process.env.ILOVEPF_PUBLIC_KEY,
  process.env.ILOVEPF_SECRET_KEY,
);

export const wordToPdf = async (filePath) => {
  const task = ilovepdf.newTask('officepdf'); //as OfficePdfTask;
  let file = filePath;
  const tempDir = os.tmpdir() + '/' + Date.now() + '.docx';
  if (Buffer.isBuffer(filePath)) {
    file = tempDir;
    fs.writeFileSync(file, filePath);
  }

  return task
    .start()
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
};
