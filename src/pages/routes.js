import { createAppContainer, createSwitchNavigator } from 'react-navigation';

// STUDY_NOTE: createSwitchNavigator isn't visual and it's used when is necessary to manage the routes without the user intervention.

import Welcome from '~/pages/Welcome';
import Repositories from '~/pages/Repositories';

// STUDY_NOTE: createAppContainer isn't a visual container but is necessary to manage routes.
const Routes = createAppContainer(
  createSwitchNavigator({
    Welcome,
    Repositories,
  }),
);

export default Routes;
