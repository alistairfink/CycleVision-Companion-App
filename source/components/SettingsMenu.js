// 3rd Party
import React from 'react';
import {View, Image} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

// Styles
import SharedStyles from '../styles/SharedStyles';

function SettingsMenu({navigation: {navigate}, override, goBackOverride}) {
  return (
    <View style={SharedStyles.Styles.SettingsButtonOuter}>
      <Menu>
        <MenuTrigger>
          <Image
            style={SharedStyles.Styles.SettingsButtonImage}
            source={require('../resources/SettingsMenuButton.png')}
          />
        </MenuTrigger>
        <MenuOptions customStyles={SharedStyles.SettingsMenu}>
          <MenuOption
            onSelect={() => {
              if (override !== undefined) {
                override();
              }

              navigate('Settings', {
                override: goBackOverride,
              });
            }}
            text="Settings"
          />
        </MenuOptions>
      </Menu>
    </View>
  );
}

export default SettingsMenu;
