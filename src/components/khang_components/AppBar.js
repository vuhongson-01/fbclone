import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch'
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons/faFacebookMessenger'


const AppBar = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>facebook</Text>
			<View style={styles.Row}>
				<TouchableOpacity style={styles.action}>
					<FontAwesomeIcon icon={faSearch} size={18} style={styles.icon} />
				</TouchableOpacity>
				<TouchableOpacity style={styles.action}>
					<FontAwesomeIcon icon={faFacebookMessenger} size={18} style={styles.icon} />
				</TouchableOpacity>
			</View>
		</View >
	);
};

const styles = StyleSheet.create({
	container: {
		marginLeft: 12,
		width: '100%',
		height: 58,
		paddingHorizontal: 0,
		paddingVertical: 11,
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	action: {
		width: 36,
		height: 36,
		alignItems: "center",
		backgroundColor: "#DDDDDD",
		padding: 10,
		borderRadius: 18,
		marginRight: 12,
	},
	icon: {
		fontSize: 48,
		height: 24,
		width: 24,
	},
	text: {
		color: '#3a86e9',
		fontSize: 25,
		fontWeight: 'bold',
		letterSpacing: -0.3,
	},
	Row: {
		flexDirection: 'row',
	},
	Button: {
		width: '42px',
		height: '42px',
		borderRadius: '21px',
		background: '#eeeeee',
		alignItems: 'center',
		justifyContent: 'center',
		marginLeft: '16px',

	},
});


export default AppBar;