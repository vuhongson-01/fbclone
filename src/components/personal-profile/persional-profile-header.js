import {COLOR} from '../../constants/constants';
import {faCamera} from '@fortawesome/free-solid-svg-icons/faCamera';
import {faXmark} from '@fortawesome/free-solid-svg-icons/faXmark';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {memo, useState} from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import {ActionSheet, Dialog, Image, LoaderScreen} from 'react-native-ui-lib';
import defaultAvatar from '../../../assets/images/default-avatar-profile.jpg';
import defaultCoverBackground from '../../../assets/images/default-cover-background.png';
import UploadImageProfile from './upload-image-component';
const PersonalProfileHeader = ({userInfo, isGuest, callback}) => {
  const [avatarOption, setOpenAvatarOption] = useState(false);
  const [backgroundOption, setOpenBackgroundOption] = useState(false);
  const [avatarOpen, setOpenAvatarView] = useState(false);
  const [coverImageOpen, setOpenCoverImageView] = useState(false);
  const [openUpload, setOpenUpload] = useState(false);
  const [typeUpload, setTypeUpload] = useState(1);
  const openAvatarOption = () => {
    setOpenAvatarOption(true);
  };

  const openBackgroundOption = () => {
    setOpenBackgroundOption(true);
  };
  const uploadImage = type => {
    setOpenUpload(true);
    setTypeUpload(type);
  };
  return (
    <View style={{position: 'relative'}}>
      <View>
        <View style={styles.coverBackground}>
          <TouchableHighlight
            style={{position: 'relative'}}
            onPress={() => {
              if (isGuest) {
                setOpenCoverImageView(true);
              } else {
                openBackgroundOption();
              }
            }}>
            <Image
              style={[
                styles.coverBackgroundImage,
                {backgroundColor: COLOR.mainGraySmoke},
              ]}
              source={{
                uri: userInfo.cover_image,
              }}
            />
          </TouchableHighlight>

          <View style={styles.avatarContainer}>
            <TouchableHighlight
              style={styles.avatar}
              onPress={() => {
                if (isGuest) {
                  setOpenAvatarView(true);
                } else {
                  openAvatarOption();
                }
              }}>
              <Image
                source={{
                  uri: userInfo.avatar,
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: COLOR.mainGraySmoke,
                }}
              />
            </TouchableHighlight>
            {isGuest ? (
              <></>
            ) : (
              <TouchableHighlight
                style={styles.cameraIcon}
                onPress={() => {
                  openAvatarOption();
                }}>
                <FontAwesomeIcon icon={faCamera} />
              </TouchableHighlight>
            )}
          </View>
          {isGuest ? (
            <></>
          ) : (
            <TouchableHighlight
              style={[styles.cameraIcon, {bottom: 10, right: 16}]}
              onPress={() => {
                openBackgroundOption();
              }}>
              <FontAwesomeIcon icon={faCamera} />
            </TouchableHighlight>
          )}
        </View>
        <View style={styles.profileName}>
          <Text style={styles.name}>{userInfo.username}</Text>
        </View>

        <View style={{paddingHorizontal: 16}}>
          <Text style={styles.description}>
            {userInfo.description ? userInfo.description : ''}
          </Text>
        </View>
      </View>

      <ActionSheet
        message={'Message of action sheet'}
        cancelButtonIndex={3}
        destructiveButtonIndex={0}
        useNativeIOS={false}
        migrateDialog
        options={[
          {
            label: 'Xem ảnh đại diện',
            onPress: () => {
              setOpenAvatarView(true);
            },
          },
          {
            label: 'Chọn ảnh đại diện',
            onPress: () => {
              uploadImage(1);
            },
          },
        ]}
        visible={avatarOption}
        onDismiss={() => setOpenAvatarOption(false)}
      />
      <ActionSheet
        message={'Message of action sheet'}
        cancelButtonIndex={3}
        destructiveButtonIndex={0}
        useNativeIOS={false}
        migrateDialog
        options={[
          {
            label: 'Xem ảnh nền',
            onPress: () => {
              setOpenCoverImageView(true);
            },
          },
          {
            label: 'Chọn ảnh nền',
            onPress: () => {
              uploadImage(2);
            },
          },
        ]}
        visible={backgroundOption}
        onDismiss={() => setOpenBackgroundOption(false)}
      />
      <ImageView
        imageSrc={userInfo.avatar}
        open={avatarOpen}
        setOpen={setOpenAvatarView}
        defaultImage={defaultAvatar}
      />
      <ImageView
        imageSrc={userInfo.cover_image}
        open={coverImageOpen}
        setOpen={setOpenCoverImageView}
        defaultImage={defaultCoverBackground}
      />

      {openUpload && (
        <UploadImageProfile
          type={typeUpload}
          open={openUpload}
          setOpen={setOpenUpload}
          userInfo={userInfo}
          callback={() => callback()}
        />
      )}
    </View>
  );
};

const ImageView = memo(({imageSrc, open, setOpen, defaultImage}) => {
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
          backgroundColor: 'black',
          display: 'flex',
          justifyContent: 'center',
        }}>
        <TouchableHighlight
          onPress={() => {
            setOpen(false);
          }}
          style={{
            padding: 12,
            borderRadius: 32,
            top: 0,
            zIndex: 2,
            right: 0,
            position: 'absolute',
          }}>
          <FontAwesomeIcon icon={faXmark} style={{color: COLOR.mainWhite}} />
        </TouchableHighlight>
        {!!imageSrc ? (
          <Image
            source={{uri: imageSrc}}
            style={{
              width: '100%',
              height: '100%',
            }}
            resizeMode={'contain'}
          />
        ) : (
          <LoaderScreen color={COLOR.mainWhite} />
        )}
      </View>
    </Dialog>
  );
});
const styles = StyleSheet.create({
  coverBackground: {
    width: '100%',
    height: 200,
    position: 'relative',
  },

  coverBackgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  avatarContainer: {
    position: 'absolute',
    bottom: -40,
    left: 16,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 100,
    borderWidth: 10,
    borderColor: COLOR.mainWhite,
    overflow: 'hidden',
    resizeMode: 'cover',
  },
  cameraIcon: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: COLOR.mainGraySmoke,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  profileName: {
    position: 'relative',
    marginTop: 72,
    bottom: 0,
    left: 16,
  },
  name: {
    color: COLOR.mainBlack,
    fontSize: 28,
    fontWeight: '700',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: COLOR.mainBlack,
    paddingVertical: 10,
  },
  description: {
    fontSize: 20,
  },
});

export default memo(PersonalProfileHeader);
