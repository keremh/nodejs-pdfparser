const PDFExtract = require('pdf.js-extract').PDFExtract;
const pdfExtract = new PDFExtract();
const options = {};

let contentPages = [];
let pagesPDF = [];
let titlePage = '';
let textPage = '';
let heightTitle;
let pagesArray = [];

pdfExtract.extract('sample.pdf', options, (err, data) => {
  if (err) return console.log(err);
  pagesPDF = data.pages;
    for (let i=0; i < pagesPDF.length; i++){
        contentPages = pagesPDF[i].content;
        heightTitle = getMax(contentPages, "height");
        for (let j=0; j < contentPages.length; j++){
            var temp = contentPages[j].height;
            if (temp >= heightTitle.height){
                heightTitle.height = temp;
                titlePage = titlePage + contentPages[j].str;
            }else{
                textPage = textPage + contentPages[j].str;
            }
        }
        pagesArray.push({
            "pageNumber" : i + 1,
            "title" : titlePage,
            "content"  : textPage
        });
        heightTitle = 0;
        textPage = '';
        titlePage = '';
    }
    console.log(pagesArray);
});

function getMax(arr, prop){
    var max;
    for (var i=0 ; i<arr.length ; i++) {
        if (max == null || parseInt(arr[i][prop]) > parseInt(max[prop]))
            max = arr[i];
    }
    return max;
}
