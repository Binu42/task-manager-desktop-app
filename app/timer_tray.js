const electron = require('electron');
const { Tray, screen, Menu } = electron;


class TimerTray extends Tray {
  constructor(iconPath, mainWindow) {
    super(iconPath);

    this.mainWindow = mainWindow;
    this.setToolTip('Timer App')
    this.on('click', this.onClick.bind(this));
    this.on('right-click', this.onRightClick.bind(this));
    this.setIgnoreDoubleClickEvents(true)
  }

  onClick(event) {
    const { x, y } = screen.getCursorScreenPoint();
    const { height, width } = this.mainWindow.getBounds();

    if (this.mainWindow.isVisible()) {
      this.mainWindow.hide()
    } else {
      const yPosition = process.platform === 'darwin' ? y : y - height;
      this.mainWindow.setBounds({
        x: x - Math.ceil(width / 2),
        y: yPosition,
        height,
        width
      })
      this.mainWindow.show();
    }
  }

  onRightClick() {
    const menuConfig = Menu.buildFromTemplate([
      {
        label: "Quit",
        click: () => {
          app.quit();
        }
      }
    ])

    this.popUpContextMenu(menuConfig)
  }
}

module.exports = TimerTray;