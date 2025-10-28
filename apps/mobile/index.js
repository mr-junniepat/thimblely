import { registerRootComponent } from 'expo';
import * as Updates from 'expo-updates';
import App from './src/App';

// Check for OTA updates
if (!__DEV__ && Updates.isEnabled) {
  Updates.checkForUpdateAsync()
    .then((update) => {
      if (update.isAvailable) {
        return Updates.fetchUpdateAsync();
      }
    })
    .then((result) => {
      if (result && result.isNew) {
        Updates.reloadAsync();
      }
    })
    .catch((error) => {
      console.error('Error fetching update:', error);
    });
}

registerRootComponent(App);
