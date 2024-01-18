import { randomStr } from "./commonFunctions";
import { Platform } from "react-native";
import dayjs from "dayjs";
import { PDFDocument } from "pdf-lib";
import {Buffer} from 'buffer'

var RNFS = require('react-native-fs'); 

const folderName = "Cart";

const folderExist =
  Platform.OS === "ios"
    ? "file://" + RNFS.DocumentDirectoryPath   // DocumentDirectoryPath for iOS
    : "file://" + RNFS.DownloadDirectoryPath; // DownloadDirectoryPath for Android
// Function for merging PDF in react native
export const mergePdf = async (selectedPartner, pdfArray) => {
  console.log("Merge process Started");

  const fileName = `${selectedPartner?.name
    .toLowerCase()
    .split(" ")
    .join("_")}_${dayjs(new Date()).format("YYYY-MM-DD")}_${randomStr()}`;

  const filePath = `${folderExist}/${folderName}/${fileName}.pdf`;

  try {
    // Create a new PDF document
    const mergedPdf = await PDFDocument.create();

    // Iterate through the pdfArray and append pages
    for (const pdfLocation of pdfArray) {
      const pdfBytes = await RNFS.readFile(pdfLocation, "base64");
      const pdfDoc = await PDFDocument.load(pdfBytes);

      // Append each page to the merged PDF
      const copiedPages = await mergedPdf.copyPages(
        pdfDoc,
        pdfDoc.getPageIndices()
      );
      copiedPages.forEach((copiedPage) => {
        mergedPdf.addPage(copiedPage);
      });
    }

    // Save the pdf in Uint8Array format

    const mergedPdfBytes = await mergedPdf.save();

    // Convert mergedPdfBytes to base64 data
    const base64Data = Buffer.from(mergedPdfBytes).toString('base64');

    // Write the base64-encoded PDF file directly
    await RNFS.writeFile(filePath, base64Data, 'base64');
    console.log("PDFs merged successfully and saved to:", filePath);

    for (const pdfLocation of pdfArray) {
      await RNFS.unlink(pdfLocation);
      console.log(`Deleted PDF: ${pdfLocation}`);
    }

  } catch (error) {
    console.error("Error during PDF merging:", error);
  } finally {
    return filePath;
  }
};
