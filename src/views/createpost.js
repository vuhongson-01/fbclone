import {faImage} from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {
  Avatar,
  Button,
  Icon,
  Incubator,
  PanningProvider,
  View,
} from 'react-native-ui-lib';
import {useSelector} from 'react-redux';
import ListImageComponent from '../components/ListImageComponent';
import {COLOR, FIREBASE_CONFIG} from '../constants/constants';
import PostService from '../helper/services/PostService';
import {selectAuth} from '../store/auth/authSlice';
import Notification from '../utils/Notification';
import {uploadImageToFirebase} from '../utils/upload_image';

const {TextField} = Incubator;
const CreatePost = ({navigation}) => {
  // const [user, setUser] = useState({});
  const [isVideo, setVideo] = useState(false);
  const [asset, setAsset] = useState([]);
  const [content, setContent] = useState('');
  const [dialogVisible, setVisible] = useState(false);
  // image uris after saving to firebase
  const [imageURI, setImageURI] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const modalProps = {supportedOrientations: ['portrait', 'landscape']};
  const headerProps = {title: 'Lựa chọn phương thức'};

  const [widenInput, setWiden] = useState(false);

  const {user} = useSelector(selectAuth);

  // useEffect(() => {
  //     UserService.getCurrentUser()
  //         .then(res => {
  //             console.log("res: " + res.data.data)
  //             setUser(res.data.data);
  //             console.log(res.data.data.avatar);
  //         })
  //         .catch(error => {
  //             Notification.showErrorMessage('Đã xảy ra lỗi khi lấy thông tin người dùng');
  //         })
  // }, [])

  const removeImageOrVideo = item => {
    if (item.type.includes('video')) setVideo(false);
    setAsset(current =>
      current.filter(value => {
        return value.uri !== item.uri;
      }),
    );
  };

  const runCamera = async type => {
    let options = {
      mediaType: type,
      videoQuality: 'high',
      durationLimit: 10,
      selectionLimit: 0,
      presentationStyle: 'pageSheet',
    };
    let response = await launchCamera(options);
    console.log('response', response);
    if (response && response.assets) {
      console.log('asset length b4 add', asset.length);
      let notification = false;
      let list = response.assets.filter(item => {
        if (item.type.includes('video'))
          return item.fileSize < 10240 * 1024; //10mb
        else return item.fileSize < 4096 * 1024; //4mb
      });
      console.log(list);
      if (list.length < response.assets.length) {
        Notification.showWarningMessage(
          'Kích thước ảnh phải nhỏ hơn 4mb, video phải nhỏ hơn 10mb',
        );
      }
      let hasVideo = false;
      if (isVideo) notification = true;
      else {
        if (asset.length >= 4) notification = true;
        else {
          for (value of list) {
            if (value.type.includes('video')) {
              hasVideo = true;
            }
          }
          if (hasVideo) {
            console.log('list length', list.length == 1);
            if (asset.length == 0 && list.length == 1) {
              setAsset([...asset, ...list]);
              setVideo(true);
            } else {
              notification = true;
            }
          } else {
            if (asset.length + list.length <= 4) {
              setAsset([...asset, ...list]);
            } else {
              notification = true;
            }
          }
        }
      }
      if (notification)
        Notification.showWarningMessage(
          'Chỉ được đăng 1 video hoặc tối đa 4 ảnh',
        );
    }
    setVisible(false);
  };

  const runImageLibrary = async () => {
    let options = {
      mediaType: 'mixed',
      videoQuality: 'high',
      durationLimit: 10,
      selectionLimit: 0,
      presentationStyle: 'pageSheet',
    };
    let response = await launchImageLibrary(options);
    console.log('response', response);
    if (response && response.assets) {
      console.log('asset length b4 add', asset.length);
      let notification = false;
      let list = response.assets.filter(item => {
        if (item.type.includes('video'))
          return item.fileSize < 10240 * 1024; //10mb
        else return item.fileSize < 4096 * 1024; //4mb
      });
      if (list.length < response.assets.length) {
        Notification.showWarningMessage(
          'Kích thước ảnh phải nhỏ hơn 4mb, video phải nhỏ hơn 10mb',
        );
      }
      let hasVideo = false;
      if (isVideo) notification = true;
      else {
        if (asset.length >= 4) notification = true;
        else {
          for (value of list) {
            if (value.type.includes('video')) {
              hasVideo = true;
            }
          }
          if (hasVideo) {
            console.log('list length', list.length == 1);
            if (asset.length == 0 && list.length == 1) {
              setAsset([...asset, ...list]);
              setVideo(true);
            } else {
              notification = true;
            }
          } else {
            if (asset.length + list.length <= 4) {
              setAsset([...asset, ...list]);
            } else {
              notification = true;
            }
          }
        }
      }
      if (notification)
        Notification.showWarningMessage(
          'Chỉ được đăng 1 video hoặc tối đa 4 ảnh',
        );
    }
    console.log(asset);
    setVisible(false);
  };

  const handleUploadPhoto = async () => {
    setLoading(true);
    if (content.length <= 0 && asset.length <= 0) {
      Notification.showWarningMessage('Hãy thêm nội dung bạn muốn chia sẻ!');
    } else {
      console.log('asset before upload to firebase', asset);
      const images = await uploadImageToFirebase(
        asset,
        `${FIREBASE_CONFIG.IMAGES_STORAGE}/${user.phonenumber}`,
      );
      // setImageURI([...imageURI, ...images]);
      // console.log(imageURI);
      if (!isVideo) {
        const requestBody = {
          described: content,
          images: images,
          videos: null,
        };
        await PostService.create(requestBody)
          .then(res => {
            console.log(res.data.data);
            // Notification.showSuccessMessage('Tạo bài viết thành công');
          })
          .catch(err => {
            console.log(err);
            Notification.showErrorMessage('Lỗi khi tạo bài viết');
          });
      } else {
        const requestBody = {
          described: content,
          images: null,
          videos: images,
        };
        await PostService.create(requestBody)
          .then(res => {
            console.log(res.data.data);
            // Notification.showSuccessMessage('Tạo bài viết thành công');
          })
          .catch(err => {
            console.log(err);
            Notification.showErrorMessage('Lỗi khi tạo bài viết');
          });
      }
      // console.log(images);
      // console.log(imageURI);
      navigation.navigate('HomePage');
      Notification.showSuccessMessage('Tạo bài viết thành công');
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.iconWrap}
          onPress={() => navigation.goBack()}>
          <Icon
            source={require('../assets/icons/arrow_left.png')}
            size={24}></Icon>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tạo bài viết</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View flex row style={styles.infoBar}>
          <View flex row>
            <Avatar
              source={{
                uri: user?.avatar,
              }}
              size={60}></Avatar>
            <View marginL-10>
              <Text style={styles.userName}>{user?.username}</Text>
              <Text style={{color: COLOR.text}} marginL-10>
                Chia sẻ cảm xúc của bạn
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.iconWrap}
            onPress={() => setVisible(true)}>
            <FontAwesomeIcon size={30} icon={faImage} color={COLOR.icon} />
          </TouchableOpacity>
        </View>
        <View flex style={styles.input}>
          <View>
            <TextInput
              multiline={true}
              // numberOfLines={widenInput?4:1}
              onChangeText={text => setContent(text)}
              style={styles.text}
              placeholder="Bạn đang nghĩ gì?"
              placeholderTextColor={'#767676'}
              value={content}
              // onFocus={() => setWiden(true)}
              // onBlur={() => setWiden(false)}
            />
          </View>
        </View>

        {!isVideo && (
          <ListImageComponent
            listImage={asset}
            isVideo={false}
            removeMethod={removeImageOrVideo}
          />
        )}
        {isVideo && (
          <ListImageComponent
            video={asset[0]}
            isVideo={true}
            removeMethod={removeImageOrVideo}
          />
        )}
      </ScrollView>
      <Button
        margin-10
        borderRadius={5}
        style={{height: 42}}
        color={COLOR.mainBlue}
        onPress={() => handleUploadPhoto()}>
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: 18,
            lineHeight: 18,
          }}>
          Đăng bài
        </Text>
        <ActivityIndicator
          style={{position: 'absolute', right: 10}}
          animating={isLoading}
          size="large"
          color={COLOR.icon}
        />
      </Button>
      <Incubator.Dialog
        visible={dialogVisible}
        onDismiss={() => setVisible(false)}
        panDirection={PanningProvider.Directions.UP}
        center
        modalProps={modalProps}
        headerProps={headerProps}
        containerStyle={{width: '100%'}}>
        {
          <View style={styles.dialog}>
            <Button
              size={Button.sizes.medium}
              label="Chụp ảnh"
              borderRadius={5}
              onPress={() => runCamera('photo')}
              style={{width: 110, height: 50, color: 'white'}}
            />
            <Button
              size={Button.sizes.medium}
              label="Quay video"
              borderRadius={5}
              onPress={() => runCamera('video')}
              style={{width: 110, height: 50, color: 'white'}}
            />
            <Button
              size={Button.sizes.medium}
              label="Chọn"
              borderRadius={5}
              onPress={runImageLibrary}
              style={{width: 110, height: 50, color: 'white'}}
            />
          </View>
        }
      </Incubator.Dialog>
    </SafeAreaView>
  );
};

export default CreatePost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    color: COLOR.background,
    backgroundColor: COLOR.background,
  },
  header: {
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#E5E8E8',
    display: 'flex',
    flexDirection: 'row',
  },
  headerTitle: {
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: 'bold',
    color: COLOR.text,
    marginLeft: 20,
  },
  scrollView: {},
  infoBar: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  input: {
    fontSize: 25,
    fontWeight: '500',
    lineHeight: 80,
    paddingBottom: 10,
  },
  text: {
    paddingHorizontal: 10,
    fontSize: 20,
    color: COLOR.text,
  },
  button: {
    padding: 10,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: COLOR.text,
  },
  dialog: {
    display: 'flex',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
