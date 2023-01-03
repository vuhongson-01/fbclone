import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import BirthDayCakeIcon from '../../../assets/icon/birthdayCakeIcon';
import MapIcon from '../../../assets/icon/mapIcon';
import HomeIcon from '../../../assets/icon/homeIcon';
import LocationIcon from '../../../assets/icon/locationIcon';

const InfoView = ({userInfo}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Infomations</Text>
      <View style={styles.item}>
        <BirthDayCakeIcon />
        <Text style={styles.info}>
          {userInfo?.birthday ? userInfo.birthday.slice(0, 10) : 'Unknow'}
        </Text>
      </View>
      <View style={styles.item}>
        <MapIcon />
        <Text style={styles.info}>Vietnam</Text>
      </View>
      <View style={styles.item}>
        <HomeIcon />
        <Text style={styles.info}>Lived in Hanoi</Text>
      </View>
      <View style={styles.item}>
        <LocationIcon />
        <Text style={styles.info}>Truong Dinh</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.label}>Descriptions</Text>
        <Text style={styles.description}>
          {userInfo.description ? userInfo.description : '-'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderTopColor: '#b9b9b9',
    paddingBottom: 16,
    marginHorizontal: 16,
  },
  descriptionContainer: {
    borderTopWidth: 1,
    borderTopColor: '#b9b9b9',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
    paddingVertical: 10,
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 8,
  },
  info: {
    marginLeft: 8,
    fontSize: 14,
  },
});

export default InfoView;
