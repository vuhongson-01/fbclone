import {COLOR} from '../../constants/constants';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import {Drawer} from 'react-native-ui-lib';
const FriendList = ({navigation, data, hide}) => {
  const windowWidth = Dimensions.get('window').width;
  return (
    <>
      <View style={styles.container}>
        <View style={styles.top}>
          <View style={styles.topLeft}>
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              Bạn bè
            </Text>
            {!hide && (
              <Text
                style={{
                  color: '#6e6e6e',
                  fontSize: 18,
                }}>
                {data?.length ? data.length : 0} bạn bè
              </Text>
            )}
          </View>
          {!hide && (
            <View style={styles.topRight}>
              <TouchableOpacity
                style={styles.seeAllFriends}
                onPress={() => {
                  navigation.navigate('FriendListScreen');
                }}>
                <Text
                  style={{
                    textAlign: 'right',
                    color: COLOR.mainBlue,
                    fontSize: 18,
                  }}>
                  Xem tất cả bạn bè
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        {!hide ? (
          <View style={styles.gridList}>
            {data?.map((friend, index) => {
              let d = (windowWidth - 32 - 16) / 3;
              if (index < 6)
                return (
                  <TouchableHighlight
                    underlayColor={'transparent'}
                    style={[
                      styles.friend,
                      {
                        width: d,
                        marginHorizontal: (index + 1) % 3 == 2 ? 8 : 0,
                      },
                    ]}
                    key={index}
                    onPress={() => {
                      navigation.navigate('AnotherProfileScreen', {
                        userId: friend._id,
                      });
                    }}>
                    <View>
                      <Image
                        style={[
                          styles.avaterImage,
                          {
                            width: d,
                            height: d,
                            backgroundColor: COLOR.mainGraySmoke,
                          },
                        ]}
                        source={{uri: friend.avatar}}
                      />
                      <Text style={styles.friendName}>{friend.username}</Text>
                    </View>
                  </TouchableHighlight>
                );
            })}
          </View>
        ) : (
          <Text>Không công khai</Text>
        )}
        <Drawer />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    borderTopColor: '#b9b9b9',
    marginHorizontal: 16,
    borderTopWidth: 1,
  },
  top: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  topLeft: {},
  topRight: {},
  gridList: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'space-between',
  },
  avaterImage: {
    resizeMode: 'center',
    borderRadius: 12,
  },
  friend: {
    marginBottom: 16,
  },
  friendName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    padding: 8,
  },
  seeAllFriends: {
    borderRadius: 6,
    paddingVertical: 10,
  },
  textBtn: {
    textAlign: 'center',
    fontSize: 16,
    color: COLOR.mainBlack,
  },
});
export default FriendList;
