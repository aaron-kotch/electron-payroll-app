const fs = require('fs');
const PDFGenerator = require('pdfkit')
const homeDir = require('os').homedir()

class EPFGenerator {

    constructor(list) {
        this.list = list
    }

    generateHeader(doc) {

        doc
        .fontSize(12)
        .font('fonts/OpenSans-Bold.ttf')
        .text("SRIBIMA OFFSHORE CATERING SERVICES SDN BHD (148292-P)", 50, 50, {bold: true})
        .fontSize(10)
        .font('fonts/OpenSans-Regular.ttf')
        .text(`EPF STATEMENT FOR ${this.list[0].month}`, 50, 66)

    }

    generateTable(doc) {

        const tableHeader = 125
        const nameX = 50
        const idX = 250
        const totalX = 350
        const epfNoX = 450

        doc.moveTo(50, 110)
            .lineTo(595 - 50, 110)
            .stroke()

        doc
        .fontSize(10)
        .text('Name', nameX, tableHeader, {bold: true})
        .text('IC No.', idX, tableHeader)
        .text('Amount (RM)', totalX, tableHeader)
        .text('Epf No.', epfNoX, tableHeader)

        doc.moveTo(50, 145)
        .lineTo(594 - 50, 145)
        .stroke()

        let currentY = 170

        this.list.forEach(item => {

        doc
        .fontSize(10)
        .text(item.name, nameX, currentY)
        .text(item.ic_no, idX, currentY)
        .text(item.epf['employee'], totalX, currentY)
        .text(item.epf['no'], epfNoX, currentY)

        currentY = currentY + 25

        });
    }

    generate() {

        let output = new PDFGenerator({
            size: [595, 842]
        })
    
        output.pipe(fs.createWriteStream(`${homeDir}/Desktop/epf.pdf`))

        this.generateHeader(output)
        this.generateTable(output)
    
        output.end()
    
    }
    

}

module.exports = EPFGenerator