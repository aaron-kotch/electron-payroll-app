const fs = require('fs');
const PDFGenerator = require('pdfkit')
const homeDir = require('os').homedir()

class PaySlipGenerator {

    constructor(staff) {
        this.staff = staff
    }

    generateHeader(doc) {

        doc
        .font('fonts/DejaVuSans-CondensedBold.ttf')
        .fontSize(10)
        .text("Company Name", 29, 19.2)
        .text(":  SRIBIMA OFFSHORE CATERING SERVICES SDN BHD", 130.6, 19.2)
        .text("Name", 29, 32.9)
        .text(`:  ${(this.staff.name).toUpperCase()}`, 130.6, 32.9)
        .text("NRIC No.", 29, 47)
        .text(`:  ${this.staff.ic_no}`, 130.6, 47)
        .text("Month", 421.4, 47.8)
        .text(`: ${this.staff.month}`, 473, 47.8)
    }

    generateTable(doc) {

        doc
        .moveTo(26.9, 73.2)
        .lineWidth(1.3)
        .lineTo(595 - 26.9, 73.2)
        .stroke()

        doc
        .text('POSITION', 29.5, 83)
        .text(`:  ${(this.staff.position).toUpperCase()}`, 163.2, 83)

        doc
        .text('EPF No', 343.4, 83)
        .text(`:  ${(this.staff.epf['no']).toUpperCase()}`, 421.9, 83)

        doc
        .text('SOCSO No', 343.4, 106)
        .text(`:  ${(this.staff.socso['no']).toUpperCase()}`, 421.9, 106)

        doc
        .moveTo(26.9, 120)
        .lineWidth(1.3)
        .lineTo(595 - 26.9, 120)
        .stroke()

        doc
        .text('EARNING', 55.4, 129)
        .text('TOTAL', 218.6, 129)
        .text('DEDUCTION EMPLOYEE', 348.2, 129)
        .text('RM', 510.5, 129)

        doc
        .moveTo(128.2, 120)
        .lineWidth(1.3)
        .lineTo(128.2, 151)
        .stroke()

        doc
        .moveTo(26.9, 151)
        .lineWidth(1.3)
        .lineTo(595 - 26.9, 151)
        .stroke()

        //col 3

        doc
        .text('TOTAL DAYS WORK', 29, 153)
        .text('EPF', 343.4, 153)
        .text(`RM${this.staff.epf['employee']}`, 471.1, 153, {
            align: 'right',
            width: 92.4
        })

        doc
        .moveTo(26.9, 167)
        .lineWidth(0.5)
        .lineTo(595 - 26.9, 167)
        .stroke()

        //col 4

        doc
        .text('BASIC PAY', 29, 168.6)
        .text(`RM${this.staff.salary['basic']}`, 128.2, 168.6, {
            align: 'center',
            width: 212
        })
        .text('SOCSO', 343.4, 168.6)
        .text(`RM${this.staff.socso['employee']}`, 471.1, 168.6, {
            align: 'right',
            width: 92.4
        })

        doc
        .moveTo(26.9, 182.6)
        .lineWidth(0.5)
        .lineTo(595 - 26.9, 182.6)
        .stroke()

        //col 4

        doc
        .text('OVERTIME', 29, 184.2)
        .text(`RM${this.staff.salary['overtime']}`, 128.2, 184.2, {
            align: 'center',
            width: 212
        })
        .text('EIS', 343.4, 184.2)
        .text(`RM${this.staff.eis['employee']}`, 471.1, 184.2, {
            align: 'right',
            width: 92.4
        })

        doc
        .moveTo(26.9, 198.5)
        .lineWidth(0.5)
        .lineTo(595 - 26.9, 198.5)
        .stroke()


        //col 5

        doc
        .text('CLAIMS', 29, 199.6)
        .text(`RM${this.staff.salary['claims']}`, 128.2, 199.6, {
            align: 'center',
            width: 212
        })
        .text('INCOME TAX', 343.4, 199.6)
        .text(`RM${this.staff.tax['pcb']}`, 471.1, 199.6, {
            align: 'right',
            width: 92.4
        })

        doc
        .moveTo(26.9, 213.8)
        .lineWidth(0.5)
        .lineTo(595 - 26.9, 213.8)
        .stroke()

        //col 6

        doc
        .text('ALLOWANCE', 29, 215.4)
        .text(`RM${this.staff.salary['allowance']}`, 128.2, 215.4, {
            align: 'center',
            width: 212
        })
        .text('SUMBANGAN BAITULMAL', 343.4, 215.4)
        .text(`RM${this.staff.baitulmal}`, 471.1, 215.4, {
            align: 'right',
            width: 92.4
        })

        doc
        .moveTo(26.9, 229.4)
        .lineWidth(0.5)
        .lineTo(595 - 26.9, 229.4)
        .stroke()

        //col 7

        doc
        .text('ZAKAT', 343.4, 231)
        .text(`RM${this.staff.zakat}`, 471.1, 231, {
            align: 'right',
            width: 92.4
        })

        doc
        .moveTo(340.8, 245.3)
        .lineWidth(0.5)
        .lineTo(595 - 26.9, 245.3)
        .stroke()

        //col 8

        doc
        .text('OTHERS (CP38)', 343.4, 246.4)
        .text(`RM${this.staff.tax['cp38']}`, 471.1, 246.4, {
            align: 'right',
            width: 92.4
        })

        doc
        .moveTo(340.8, 260.6)
        .lineWidth(0.5)
        .lineTo(595 - 26.9, 260.6)
        .stroke()

        //col 9

        doc
        .text('TOTAL GROSS', 29, 277.8)
        .text(`RM${this.staff.salary['gross']}`, 225.4, 277.8)
        .text('TOTAL DEDUCTION', 343.4, 277.8)
        .text(`RM${this.staff.total_deduction}`, 471.1, 277.8, {
            align: 'right',
            width: 92.4
        })

        doc
        .moveTo(26.9, 307.2)
        .lineWidth(1.3)
        .lineTo(595 - 26.9, 307.2)
        .stroke()

        //col 10

        doc
        .text("EMPLOYER'S CONTRIBUTION", 29, 309, { underline: true})
        .text('EPF', 29, 324.6)
        .text(`RM${this.staff.epf['employer']}`, 168.5, 324.6, {
            align: 'right',
            width: 72
        })
        .text('SOCSO', 29, 340)
        .text(`RM${this.staff.socso['employer']}`, 168.5, 340, {
            align: 'right',
            width: 72
        })
        .text('EIS', 29, 355.8)
        .text(`RM${this.staff.eis['employer']}`, 168.5, 355.8, {
            align: 'right',
            width: 72
        })

        doc
        .moveTo(26.9, 369.8)
        .lineWidth(1.3)
        .lineTo(340.8, 369.8)
        .stroke()

        // col 11

        doc
        .text('TOTAL', 29, 371.4)
        .text(`RM${this.staff.total_employer}`, 168.5, 371.4, {
            align: 'right',
            width: 72
        })

        doc
        .moveTo(168.2, 369.8)
        .lineWidth(1.3)
        .lineTo(168.2, 385.2)
        .stroke()

        doc
        .text("NETT INCOME", 343.4, 324.6)
        .fontSize(12)
        .text(`RM${this.staff.salary['net']}`, 482.2, 331.1)

        doc
        .moveTo(26.9, 385.2)
        .lineWidth(1.3)
        .lineTo(595 - 26.9, 385.2)
        .stroke()

        //line

        doc
        .moveTo(128.2, 150.5)
        .lineWidth(0.5)
        .lineTo(128.2, 229.2)
        .stroke()

        doc
        .moveTo(471, 150.5)
        .lineWidth(0.5)
        .lineTo(471, 260.4)
        .stroke()

        doc
        .moveTo(340.6, 73.2)
        .lineWidth(1.3)
        .lineTo(340.6, 385.4)
        .stroke()

        doc
        .moveTo(26.9, 73.2)
        .lineWidth(1.3)
        .lineTo(26.9, 385.4)
        .stroke()

        doc
        .moveTo(595 - 26.9, 73.2)
        .lineWidth(1.3)
        .lineTo(595 - 26.9, 385.4)
        .stroke()

    }

    generate() {

        let output = new PDFGenerator({
            size: 'A4',
            margin: 0
        })
    
        output.pipe(fs.createWriteStream(`${homeDir}/Desktop/${this.staff.ic_no}-payslip.pdf`))

        this.generateHeader(output)
        this.generateTable(output)
    
        output.end()
    
    }
    

}

module.exports = PaySlipGenerator