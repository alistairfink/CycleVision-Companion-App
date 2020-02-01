// 3rd Party
import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';

// Styles
import SharedStyles from '../styles/SharedStyles';

function BackButton({navigation: {goBack}}) {
  return (
    <View style={SharedStyles.Styles.BackButtonOuter}>
      <TouchableOpacity onPress={() => goBack()}>
        <Image
          style={SharedStyles.Styles.BackButtonImage}
          source={require('../resources/Back.png')}
        />
      </TouchableOpacity>
    </View>
  );
}

export default BackButton;
