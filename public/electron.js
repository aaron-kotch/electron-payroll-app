const path = require('path');
const { ipcMain, app, BrowserWindow, dialog } = require('electron');
const isDev = require('electron-is-dev');
const reader = require('xlsx');
const shell = require('electron').shell
const BankStatementGenerator = require("./pdf/BankStatement")
const EPFGenerator = require('./pdf/EPFGenerator');
const PaySlipGenerator = require('./pdf/PaySlip');
const EISGenerator = require('./pdf/EISGenerator');
const SOCSOGenerator = require('./pdf/SocsoGenerator');
const ZakatGenerator = require('./pdf/ZakatGenerator');

function createWindow() {

  let dataFilePath = null

  // Create the browser window.
  const win = new BrowserWindow({
    width: 900,
    height: 600,
    minWidth: 980,
    minHeight: 640,
    backgroundColor: '#FFFFFF',
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: false,
      contextIsolation: false,
    },
    
  });

  win.removeMenu();

  // handles fiel picking
  ipcMain.handle('open-file', async () => {

    let data = []

    await dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [{name: 'Microsoft Excel Worksheet', extensions: ['xls', 'xlsx']}]
    }).then(result => {
      if (result.canceled === false) {
        data = getPayroll(result.filePaths[0])
      }
    }).catch(err => {
      console.log(err)
    });

    return data
  })

  ipcMain.handle('generate-bank-statement', (event, list) => {
    
    const bSG = new BankStatementGenerator(list)
    bSG.generate()
    console.log("BANK STATEMENT PRINT")
  })

  ipcMain.handle('generate-epf-statement', (event, list) => {
    
    const epfG = new EPFGenerator(list)
    epfG.generate()
    console.log("EPF STATEMENT PRINT")
    
  })

  ipcMain.handle('generate-socso-statement', (event, list) => {
    
    const socsoG = new SOCSOGenerator(list)
    socsoG.generate()
    console.log("SOCSO STATEMENT PRINT")
    
  })

  ipcMain.handle('generate-eis-statement', (event, list) => {
    
    const eisG = new EISGenerator(list)
    eisG.generate()
    console.log("EIS STATEMENT PRINT")
    
  })

  ipcMain.handle('generate-zakat-statement', (event, list) => {
    
    const zG = new ZakatGenerator(list)
    zG.generate()
    console.log("ZAKAT STATEMENT PRINT")
    
  })

  ipcMain.handle('generate-baitulmal-statement', (event, list) => {
    
    const blG = new ZakatGenerator(list)
    blG.generate()
    console.log("BAITULMAL STATEMENT PRINT")
    
  })

  ipcMain.handle('generate-payslip', async (event, staff) => {
    const psG = new PaySlipGenerator(staff)
    psG.generate()
    console.log(`PAYSLIP PRINT FOR ${staff.name}`,)
  })

  ipcMain.handle('calculate-payroll', (event, salary) => {

    let result = []

    if (dataFilePath !== null) {
      result = readExcel(dataFilePath, salary);
    } else {
      result = "Salary data file not found."
    }

    return result;

  })
  
  // and load the index.html of the app.
  // win.loadFile("index.html");
  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );
  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
  }
}

function getPayroll(filePath) {

  const file = reader.readFile(filePath)
  
  let data = []

  const sheets = file.SheetNames

  var wb = file.Sheets['Kijal']

  wb['!ref'] = 'A6:T15'

  const temp = reader.utils.sheet_to_json(wb, {
    defval: "",
    header: [
      "no", 
      "name", 
      "basic_salary", 
      "allowance", 
      "gross_salary", 
      "baitulmal", 
      "pcb", 
      "cp38",
      "employee_epf",
      "employee_socso",
      "employee_eis",
      "other_deduction",
      "total_deduction",
      "net_salary",
      "employer_epf",
      "employer_socso",
      "employer_eis",
      "total_epf",
      "total_socso",
      "total_eis"
    ]
  })

  temp.forEach((item) => {
    data.push(item)
  })

  return data
}

function readExcel(filePath, salary) {

  const file = reader.readFile(filePath, {sheetStubs: true});

  let employeeEPF = 0.00
  let employerEPF = 0.00
  let employeeSOCSO = 0.00
  let employerSOCSO = 0.00
  let employeeEIS = 0.00
  let employerEIS = 0.00
  let pcb = 0.00
  let cp38 = 0.00
  let zakat = 0.00
  let baitulmal = 0.00
  let other = 0.00

  const sheets = file.SheetNames;

  sheets.forEach((sheet) => {

    //read epf sheet
    if (sheet.toUpperCase() === "EPF") {

      let worksheet = file.Sheets[sheet];
      let range = reader.utils.decode_range(worksheet['!ref']);

      console.log("READ EPF")

      for (let index = 5; index < range.e.r; index++) {

        if ((worksheet[`C${index}`] !== undefined)) {

          const getSalary = worksheet[`A${index}`].v;
          
          if (getSalary > salary) {
            employeeEPF = worksheet[`B${index - 1}`].v
            employerEPF = worksheet[`C${index - 1}`].v

            console.log({
              salary: salary, employee: employeeEPF, employer: employerEPF
            })

            break
          }

        } else {
          continue;
        }
      }
      console.log("END READ EPF")
    }

    if (sheet.toUpperCase() === "SOCSO") {

      let worksheet = file.Sheets[sheet];
      let range = reader.utils.decode_range(worksheet['!ref']);

      console.log("READ SOCSO")

      for (let index = 4; index < range.e.r; index++) {
          
        const getSalary = worksheet[`A${index}`].v;
          
        if (getSalary > salary) {
          employeeSOCSO = worksheet[`B${index - 1}`].v
          employerSOCSO = worksheet[`C${index - 1}`].v

          console.log({
            salary: salary, employee: employeeSOCSO, employer: employerSOCSO
          })

          break
        }
      }
      console.log("END READ SOCSO")
    }

    if (sheet.toUpperCase() === "EIS") {

      let worksheet = file.Sheets[sheet];
      let range = reader.utils.decode_range(worksheet['!ref']);

      console.log("READ EIS")

      for (let index = 4; index < range.e.r; index++) {

        const getSalary = worksheet[`A${index}`].v;
          
        if (getSalary > salary) {
          employeeEIS = worksheet[`B${index - 1}`].v
          employerEIS = worksheet[`C${index - 1}`].v

          console.log({
            salary: salary, employee: employeeEIS, employer: employerEIS
          })

          break
        }
      }

      console.log("END READ EIS")
    }
  })
  
  return {
    'employee-epf': employeeEPF.toFixed(2), 
    'employer-epf': employerEPF.toFixed(2), 
    'employee-socso': employeeSOCSO.toFixed(2),
    'employer-socso': employerSOCSO.toFixed(2),
    'employee-eis': employeeEIS.toFixed(2),
    'employer-eis': employerEIS.toFixed(2),
    'zakat': zakat.toFixed(2),
    'baitulmal': baitulmal.toFixed(2),
    'cp38': cp38.toFixed(2),
    'pcb': pcb.toFixed(2),
    'other': other.toFixed(2)
  };

  // for (let i = 0; i < sheets.length; i++) {
  //   const temp = reader.utils.sheet_to_json(
  //     file.Sheets[file.SheetNames[i]]
  //   );

  //   console.log(file.Sheets[file.SheetNames[1]]);

  //   temp.forEach((res) => {
  //     data.push(res)
  //   });
  // }

  //console.log(data);

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});