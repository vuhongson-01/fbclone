import {COLOR} from '../../constants/constants';
import {faCakeCandles} from '@fortawesome/free-solid-svg-icons/faCakeCandles';
import {faHouse} from '@fortawesome/free-solid-svg-icons/faHouse';
import {faLocationDot} from '@fortawesome/free-solid-svg-icons/faLocationDot';
import {faUser} from '@fortawesome/free-solid-svg-icons/faUser';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
const InfoView = ({userInfo}) => {
  return (
    <View style={styles.container}>
      <View style={{marginTop: 12}}>
        <View style={styles.item}>
          <FontAwesomeIcon icon={faUser} style={{}} />
          <Text style={styles.info}>
            {userInfo?.gender
              ? userInfo?.gender == 'male'
                ? 'Nam'
                : 'Nữ'
              : 'Không có thông tin'}
          </Text>
        </View>
        <View style={styles.item}>
          <FontAwesomeIcon icon={faCakeCandles} style={{}} />
          <Text style={styles.info}>
            {userInfo?.birthday
              ? userInfo.birthday.slice(0, 10)
              : 'Không có thông tin'}
          </Text>
        </View>
        <View style={styles.item}>
          <FontAwesomeIcon icon={faLocationDot} style={{}} />
          <Text style={styles.info}>
            {userInfo?.city ?? 'Không có thông tin'}
          </Text>
        </View>
        <View style={styles.item}>
          <FontAwesomeIcon icon={faHouse} style={{}} />
          <Text style={styles.info}>
            {userInfo?.address ?? 'Không có thông tin'}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 16,
    marginHorizontal: 16,
  },
  descriptionContainer: {
    borderTopWidth: 1,
    borderTopColor: COLOR.mainGraySmoke,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: COLOR.mainBlack,
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
