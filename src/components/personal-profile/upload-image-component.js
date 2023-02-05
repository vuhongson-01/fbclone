import {faImages} from '@fortawesome/free-regular-svg-icons/faImages';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {Dialog} from 'react-native-ui-lib';
import {COLOR, FIREBASE_CONFIG} from '../../constants/constants';
import UserService from '../../helper/services/UserService';
import Notification from '../../utils/Notification';
import {uploadImageToFirebase} from '../../utils/upload_image';

const UploadImageProfile = ({type, open, setOpen, userInfo, callback}) => {
  const [asset, setAsset] = useState('');
  const [run, setRun] = useState(true);
  const [loading, setLoading] = useState(false);
  const runImageLibrary = async () => {
    let options = {
      mediaType: 'photo',
      selectionLimit: 1,
      presentationStyle: 'pageSheet',
    };
    let response = await launchImageLibrary(options);
    // console.log('response', response);
    if (response && response.assets) {
      let image = response.assets.filter(item => {
        return item.fileSize < 4096 * 1024; //4mb
      });
      if (image.length < response.assets.length) {
        Notification.showWarningMessage('Kích thước ảnh phải nhỏ hơn 4mb');
      } else {
        // console.log(image);
        setAsset(image);
      }
    } else {
      if (!!!asset) setOpen(false);
    }
    setRun(false);
  };

  const handleUploadPhoto = async () => {
    setLoading(true);
    // console.log(
    //   'asset before upload to firebase',
    //   asset,
    //   `${FIREBASE_CONFIG.IMAGES_STORAGE}/${userInfo.phonenumber}`,
    // );
    const images = await uploadImageToFirebase(
      asset,
      `${
        type == 1
          ? FIREBASE_CONFIG.AVATAR_STORAGE
          : FIREBASE_CONFIG.COVER_IMAGE_STORAGE
      }/${userInfo.phonenumber}`,
    );
    const requestBody =
      type == 1 ? {avatar: images[0]} : {cover_image: images[0]};
    // console.log(requestBody);
    await UserService.edit(requestBody)
      .then(res => {
        // console.log('dcm------', res);
        callback();
        setLoading(false);
        setOpen(false);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (open && run) runImageLibrary();
  }, [open, run]);

  return (
    <Dialog
      useSafeArea
      width={'100%'}
      top={false}
      bottom={false}
      height={'100%'}
      panDirection={null}
      visible={open}
      onDismiss={() => {
        setOpen(false);
      }}>
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: COLOR.background,
          display: 'flex',
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderBottomColor: COLOR.mainGraySmoke,
            borderBottomWidth: 0.5,
            padding: 16,
            paddingBottom: 24,
          }}>
          <TouchableHighlight
            underlayColor={'transparent'}
            onPress={() => {
              setOpen(false);
            }}>
            <Text style={styles.buttonText}>Hủy</Text>
          </TouchableHighlight>
          <TouchableHighlight
            underlayColor={'transparent'}
            onPress={() => {
              handleUploadPhoto();
            }}>
            <>
              {loading && (
                <ActivityIndicator
                  style={{position: 'absolute', right: 32, top: 2}}
                  animating={loading}
                  size="small"
                  color={COLOR.mainBlack}
                />
              )}
              <Text style={styles.buttonText}>Lưu</Text>
            </>
          </TouchableHighlight>
        </View>
        <View
          style={{
            width: '100%',
            paddingHorizontal: 16,
            paddingTop: 16,
            height: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            style={{
              backgroundColor: COLOR.mainGraySmoke,
              borderRadius: type == 1 ? 200 : 12,
              width: type == 1 ? 200 : '100%',
              height: type == 1 ? 200 : '100%',
              resizeMode: 'cover',
              borderWidth: type == 1 ? 6 : 0,
              borderColor: COLOR.mainGraySmoke,
            }}
            source={asset}
          />
        </View>
        <TouchableHighlight
          style={styles.infoField}
          underlayColor="transparent"
          onPress={() => {
            setRun(true);
          }}>
          <>
            <Text style={{fontSize: 16, color: COLOR.mainBlack}}>
              {'Chọn ảnh khác '}
            </Text>
            <FontAwesomeIcon icon={faImages} />
          </>
        </TouchableHighlight>
      </View>
    </Dialog>
  );
};
const styles = StyleSheet.create({
  buttonText: {
    fontSize: 18,
    color: COLOR.mainBlack,
    fontWeight: '400',
  },
  labelText: {
    fontSize: 16,
    color: COLOR.mainBlack,
    fontWeight: '600',
    marginLeft: 6,
  },
  infoField: {
    paddingHorizontal: 16,
    paddingTop: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
export default UploadImageProfile;
