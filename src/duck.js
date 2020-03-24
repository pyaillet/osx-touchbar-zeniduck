const path = require('path');
const {app, BrowserWindow, TouchBar} = require('electron');

const {TouchBarButton} = TouchBar;

const numOfDucksToDisplay = 8;

let score = 0;

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


const addDuck = () => {
  const random = getRandomInt(2)
  let image = `/duck/zeniduck.png`
  if (random === 1) {
    image = `/duck/zeniduck-julia.png`
  }
  const duck = new TouchBarButton({
    icon: path.join(__dirname, image),
    backgroundColor: '#000',
    click: () => {
      if (random === 1) {
        score++;
      } else {
        score--;
      }
    }
  })

  return duck;
}

const initDucks = () => {
  const scoreButton = new TouchBarButton({
    label: `Score: ${score}`,
    backgroundColor: '#000',
  });

  const ducks = [scoreButton];
  for (let x = 1; x < numOfDucksToDisplay; x++) {
    ducks.push(addDuck());
  }
  return ducks;
};

const buildTouchbar = () => {
  const touchbar = new TouchBar(initDucks());
  window.setTouchBar(touchbar);
}

let window;

const interval = setInterval(() => {
  buildTouchbar();
}, 1500);

app.once('ready', () => {
  window = new BrowserWindow({
    width: 200,
    height: 200
  });
  window.loadURL(`file://${path.join(__dirname, '/index.html')}`);
});

// Quit when all windows are closed and no other one is listening to this.
app.on('window-all-closed', () => {
  app.quit();
  clearInterval(interval);
});
