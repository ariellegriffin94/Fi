const { app, BrowserWindow } = require("electron");
const wd_homedir = require("os").homedir();
const fs = require("fs");
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile("index.html");
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

let appDir = (wd_home = wd_homedir + "/Documents/FI/");
if (!fs.existsSync(appDir)) {
  fs.mkdirSync(appDir);
}
if (!fs.existsSync(appDir + "settings.json")) {
  fs.writeFileSync(
    `${appDir}settings.json`,
    JSON.stringify({ companyNames: [] })
  );
}
