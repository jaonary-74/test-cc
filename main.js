import promptSync from 'prompt-sync';
import {displayMenu} from "./menu.js";
const prompt = promptSync();

const riceCooker = {
  ricePresent: false,
  riceCooked: false,
  steamingInProgress: false,
  heatingInProgress: false,

  addRice() {
    if (!this.ricePresent) {
      this.ricePresent = true;
      console.log('Rice has been added.');
      return;
    } 
      return ('There\'s already rice in the rice cooker.');
    
  },

  cookRice() {
    if (this.ricePresent && !this.riceCooked) {
      console.log('Cooking rice...');
      this.delaySync(1500);
      this.riceCooked = true;
      console.log('The rice has been cooked!');
    } if (!this.ricePresent) {
      console.log('Cannot cook. The rice cooker is empty.');
      return;
    } 
     return('The rice is already cooked.');
    
  },

  steam() {
    if (this.ricePresent && !this.steamingInProgress) {
      console.log('Steaming in progress...');
      this.steamingInProgress = true;
      this.delaySync(1500);
      this.steamingInProgress = false;
      console.log('Steaming completed!');
    } 
    
    if (!this.ricePresent) {
      console.log('Cannot steam. The rice cooker is empty.');
      return;
    } 
    
    return('Steaming is already in progress.');
  },

   keepWarm() {
  if (!this.ricePresent) {
    console.log('Cannot keep warm. The rice cooker is empty.');
    return;
  }

  if (!this.riceCooked) {
    console.log('Cannot keep warm. The rice is not cooked.');
    return;
  }

  if (this.heatingInProgress) {
    console.log('Keeping warm is already in progress.');
    return;
  }

  console.log('The rice is now being kept warm.');
  this.heatingInProgress = true;
},

  removeRice() {
    if (this.ricePresent && (this.riceCooked || this.heatingInProgress)) {
      this.ricePresent = false;
      this.riceCooked = false;
      this.steamingInProgress = false;
      this.heatingInProgress = false;
      return ('The rice has been removed from the rice cooker.');
    } 
    return ('There\'s no rice to remove or it is not cooked yet.');
  },

  delaySync(ms) {
    const start = Date.now();
    while (Date.now() - start < ms) {}
  },
};

export function simulateRiceCooker() {
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
  } 
      return('Invalid choice. Please select a valid option.');
  }
} 
}

simulateRiceCooker();