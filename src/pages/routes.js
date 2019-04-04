import {
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import { colors } from '~/styles';

// STUDY_NOTE: createSwitchNavigator isn't visual and it's used when is necessary to manage the routes without the user intervention.

import Welcome from '~/pages/Welcome';
import Repositories from '~/pages/Repositories';
import Organizations from '~/pages/Organizations';

// STUDY_NOTE: createAppContainer isn't a visual container but is necessary to manage routes.
const Routes = (userLogged = false) => createAppContainer(
  createSwitchNavigator(
    {
      Welcome,
      // Repositories, // Direct route created on first steps
      User: createBottomTabNavigator(
        {
          // Used to manage Tabs
          Repositories,
          Organizations,
        },
        {
          tabBarOptions: {
            showIcon: true,
            showLabel: false,
            activeTintColor: colors.white,
            inactiveTintColor: colors.whiteTransparent,
            style: {
              backgroundColor: colors.secondary,
            },
          },
        },
      ),
    },
    {
      // initialRouteName: userLogged ? 'Repositories' : 'Welcome',
      initialRouteName: userLogged ? 'User' : 'Welcome',
    },
  ),
);

export default Routes;
