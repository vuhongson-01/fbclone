import React, { useState, useEffect } from 'react';
import { GridList, Image, View, Text } from 'react-native-ui-lib';
import Video from 'react-native-video';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { COLOR } from '../constants/constants';


const ListImageComponent = ({ isVideo, listImage, video, removeMethod }) => {
  // useEffect(() => {
  //   console.log(listImage[0]);
  // }, [listImage])

  const RenderItem = ({ item }) => {
    return (
      <View style={{ width: '100%' }}>
        <Image source={{ uri: item.uri }} style={{ height: 200, width: '100%' }} />
        <TouchableOpacity style={styles.xIcon} onPress={() => removeMethod(item)}>
          <FontAwesomeIcon size={25} icon={faCircleXmark} color={COLOR.background} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      {!isVideo &&
        <View flex marginH-2>
          <View paddingB-3>
            {listImage[0] && <RenderItem item={listImage[0]} />}
          </View>
          <ScrollView scrollEnabled={false} horizontal={true} >
            <GridList
              data={listImage.slice(1)}
              renderItem={RenderItem}
              numColumns={listImage.slice(1).length}
              listPadding={0}
              itemSpacing={3}
              scrollEnabled={false}
            />
          </ScrollView>
        </View>
      }
      {isVideo && video &&
        <View marginH-2>
          <Video source={{ uri: video.uri }}   // Can be a URL or a local file.
            ref={(ref) => {
              this.player = ref
            }}                                      // Store reference
            onBuffer={this.onBuffer}                // Callback when remote video is buffering
            onEnd={this.onEnd}                      // Callback when playback finishes
            onError={this.videoError} 
            style={styles.backgroundVideo}        // Callback when video cannot be loaded
            resizeMode={'cover'}
            controls={true} // Hien thi pause next, ...
            // paused={true}
          />
          <TouchableOpacity style={styles.xIcon} onPress={() => removeMethod(video)}>
            <FontAwesomeIcon size={25} icon={faCircleXmark} color={COLOR.background} />
          </TouchableOpacity>
        </View>
      }
    </View>
  );
}


export default ListImageComponent;

const styles = StyleSheet.create({
  xIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  backgroundVideo: {
    width: '100%',
    height: 450
  }
})