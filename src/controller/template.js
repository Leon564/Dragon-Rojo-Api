const JSZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const templates = require('../templates');
const fs = require("fs");
const path = require("path");
const wordToPdf = require("../lib/docxToPdf");

const mdoc = async (req, res) => {
  let data = req.query;
  if (!data.lvl || !data.name || !data.last_name || !data.day || !data.month || !data.year) {
    return res.send("error data");
  }
  if (data.name.length + data.last_name.length < 18) {
    data.last_name = "  " + data.last_name.split(" ").join("  ");
    data.name = "\t" + data.name.split(" ").join("  ");;
  };
  let file = templates[data.lvl];

  console.log(file);

  if (!file) return res.status(404).send("error template");
  // Cargo el docx como un  binary
  let content = fs.readFileSync(path.resolve(file), "binary");
  //let zip= JSZip(content);

  let zip = new JSZip(content);

  let doc = new Docxtemplater();
  doc.loadZip(zip);

  // setea los valores de data ej: { first_name: 'John' , last_name: 'Doe'}
  doc.setData(data);

  try {
    // renderiza el documento (remplaza las ocurrencias como {first_name} by John, {last_name} by Doe, ...)
    doc.render();
  } catch (error) {
    let e = {
      message: error.message,
      name: error.name,
      stack: error.stack,
      properties: error.properties,
    };
    console.log(JSON.stringify({ error: e }));
    throw error;
  }

  let buffer = doc.getZip().generate({ type: "nodebuffer" });

  

  const fileName = `${data.name} ${data.last_name}${data.pdf ? '.pdf' : '.docx'}`


  if (!data.pdf) {
    console.log("converting docx");
    const fileType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    res.writeHead(200, {
      'Content-Disposition': `attachment; filename="${fileName}"`,
      'Content-Type': fileType,
    })

    return res.end(buffer);

  }

  console.log("converting pdf");
  const filetype = 'application/pdf';

  const pdfBuffer = await wordToPdf(buffer);

  if (pdfBuffer.error) {
    return res.status(500).send("error converting pdf");
  }

  res.writeHead(200, {
    'Content-Disposition': `attachment; filename="${fileName}"`,
    'Content-Type': filetype,
  })

  return res.end(pdfBuffer); 


};
module.exports = mdoc;
