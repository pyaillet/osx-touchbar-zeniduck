const path = require('path');
const {app, BrowserWindow, TouchBar} = require('electron');

const {TouchBarButton} = TouchBar;

const numOfDucksToDisplay = 4;
const ducks = [];

const initDuck = () => {
  for (let x = 0; x < numOfDucksToDisplay; x++) {
    ducks.push(new TouchBarButton({
      icon: path.join(__dirname, `/duck/zeniduck.png`),
      backgroundColor: '#000'
    }));
  }
  return ducks;
};

const touchbar = new TouchBar(initDuck());

let window;

app.once('ready', () => {
  window = new BrowserWindow({
    width: 200,
    height: 200
  });
  window.loadURL(`file://${path.join(__dirname, '/index.html')}`);
  window.setTouchBar(touchbar);
});

// Quit when all windows are closed and no other one is listening to this.
app.on('window-all-closed', () => {
  app.quit();
});
