import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Profile from '../views/ProfileScreen';
import SignIn from '../views/SignInScreen';

const ProfileDrawerItem = StackNavigator({
Playground: { screen: Profile },
SignIn: { screen: SignIn }
  },
  {
    headerMode: 'none'
  }
);

ProfileDrawerItem.navigationOptions = {
  drawerLabel: 'ข้อมูลส่วนตัว',
  drawerIcon: ({ tintColor }) => (
    <Icon
      name="person"
      size={30}
      iconStyle={{
        width: 30,
        height: 30
      }}
      type="material"
      color={tintColor}
    />
  ),
};

export default ProfileDrawerItem;
