import promptSync from 'prompt-sync';
import { displayMenu } from './menu.js';

const prompt = promptSync();

class RiceCooker {
  constructor() {
    this.ricePresent = false;
    this.riceCooked = false;
    this.steamingInProgress = false;
    this.heatingInProgress = false;
  }

  addRice() {
    if (!this.ricePresent) {
      this.ricePresent = true;
      console.log('Rice has been added.');
    } else {
      console.log("There's already rice in the rice cooker.");
    }
  }

  cookRice() {
    if (!this.ricePresent) {
      console.log('Cannot cook. The rice cooker is empty.');
    } else if (!this.riceCooked) {
      console.log('Cooking rice...');
      this.delaySync(1500);
      this.riceCooked = true;
      console.log('The rice has been cooked!');
    } else {
      console.log('The rice is already cooked.');
    }
  }

  steam() {
    if (!this.ricePresent) {
      console.log('Cannot steam. The rice cooker is empty.');
    } else if (!this.steamingInProgress) {
      console.log('Steaming in progress...');
      this.steamingInProgress = true;
      this.delaySync(1500);
      this.steamingInProgress = false;
      console.log('Steaming completed!');
    } else {
      console.log('Steaming is already in progress.');
    }
  }

  keepWarm() {
    if (!this.ricePresent) {
      console.log('Cannot keep warm. The rice cooker is empty.');
    } else if (!this.riceCooked) {
      console.log('Cannot keep warm. The rice is not cooked.');
    } else if (this.heatingInProgress) {
      console.log('Keeping warm is already in progress.');
    } else {
      console.log('The rice is now being kept warm.');
      this.heatingInProgress = true;
    }
  }

  removeRice() {
    if (this.ricePresent && (this.riceCooked || this.heatingInProgress)) {
      this.ricePresent = false;
      this.riceCooked = false;
      this.steamingInProgress = false;
      this.heatingInProgress = false;
      console.log('The rice has been removed from the rice cooker.');
    } else {
      console.log('There\'s no rice to remove or it is not cooked yet.');
    }
  }

  delaySync(ms) {
    const start = Date.now();
    while (Date.now() - start < ms) {}
  }
}

function simulateRiceCooker() {
  const riceCooker = new RiceCooker();

  while (true) {
    displayMenu();
    const input = prompt('Enter your choice: ');

    if (input) {
      const choice = parseInt(input);

      if (!isNaN(choice) && choice >= 1 && choice <= 6) {
        switch (choice) {
          case 6:
            console.log('Thank you for using the Rice Cooker Simulator. Goodbye!');
            return; // Using return to exit the loop

          default:
            const methodName = Object.keys(riceCooker)[choice - 1];
            riceCooker[methodName]();
            break;
        }
      } else {
        console.log('Invalid choice. Please select a valid option.');
      }
    }
  }
}

simulateRiceCooker();