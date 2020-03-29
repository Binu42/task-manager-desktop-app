const electron = require('electron');
const path = require('path')
const { BrowserWindow } = electron;

class MainWindow extends BrowserWindow {
  constructor(url) {
    super({
      width: 300,
      height: 500,
      frame: false,
      resizable: false,
      show: false,
      icon: path.join(__dirname, '../src/assets/time.png'),
      webPreferences: {
        nodeIntegration: true,
        backgroundThrottling: false // to run at full speed without limiting resource in bg otherwise stuck.
      }
    })
    this.loadURL(url);
    this.on('blur', this.onBlur.bind(this));
  }

  onBlur() {
    this.hide();
  }
}

module.exports = MainWindow;