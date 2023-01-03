import React, { useState, useEffect } from 'react';
import { GridList, Image, View, Text } from 'react-native-ui-lib';
import Video from 'react-native-video';


const renderItem = ({ item }) => {
  return (
    <View>
      <Image source={{ uri: item.uri }} style={{ height: 100, width: 100 }} />
      {/* <Text>abc</Text> */}
    </View>
  );
};
const ListImageComponent = (props) => {
  useEffect(() => {
  })

  return (
    <View>
      {!props.isVideo &&
        <GridList
          data={props.listImage}
          renderItem={renderItem}
          numColumns={4}
          listPadding={0}
        />}
      {props.isVideo &&
        <Video source={{ uri: props.video.uri }}   // Can be a URL or a local file.
          ref={(ref) => {
            this.player = ref
          }}                                      // Store reference
          onBuffer={this.onBuffer}                // Callback when remote video is buffering
          onEnd={this.onEnd}                      // Callback when playback finishes
          onError={this.videoError}
          style={{ height: 100, width: 100 }}           // Callback when video cannot be loaded
        />

      }
    </View>
  );
}


export default ListImageComponent;