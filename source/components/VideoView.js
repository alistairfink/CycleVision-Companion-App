// 3rd Party
import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {WebView} from 'react-native-webview';

// Styles
import SharedStyles from '../styles/SharedStyles';

function VideoView({videoURL}) {
  return (
    <WebView
      style={SharedStyles.Styles.VideoOuter}
      originWhitelist={['*']}
      source={{
        html: `
          <div style="display: flex; height: 100%; align-items: center;">
            <img style="width: 100%;" src="${videoURL}" />
          </div>`,
      }}
    />
  );
}

export default VideoView;
