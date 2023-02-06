import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faUserFriends, faBars } from '@fortawesome/free-solid-svg-icons';
import HomePageComponent from '../components/home/HomePage';
import FriendshipComponent from '../components/friends/FriendshipComponent';
import Settings from './settings_page';
import { COLOR } from '../constants/constants';

const Tab = createBottomTabNavigator();

const Homepage = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomePageComponent"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLOR.icon,
      }}>
      <Tab.Screen
        name="HomePageComponent"
        component={HomePageComponent}
        options={{
          tabBarLabel: 'Trang chủ',
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faHome} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="FriendshipComponent"
        component={FriendshipComponent}
        options={{
          tabBarLabel: 'Bạn bè',
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faUserFriends} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: 'Menu',
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faBars} color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Homepage;
