// 3rd Party
import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';

// Styles
import SharedStyles from '../styles/SharedStyles';

function BackButton({navigation: {goBack}, override}) {
  return (
    <View style={SharedStyles.Styles.BackButtonOuter}>
      <TouchableOpacity
        style={SharedStyles.Styles.BackButtonImageOuter}
        onPress={() => {
          if (override !== undefined) {
            override();
          }

          goBack();
        }}>
        <Image
          style={SharedStyles.Styles.BackButtonImage}
          source={require('../resources/Back.png')}
        />
      </TouchableOpacity>
    </View>
  );
}

export default BackButton;
