import {Typography, Colors, Spacings, Shadows} from 'react-native-ui-lib';

export const StyleCustom = () => {
    Colors.loadColors({
        pink: '#FF69B4',
        gold: '#FFD700',
        redButton: '#ff0000',
        bgWhite: '#ffffff'
    });
      
    Typography.loadTypographies({
        h1: {fontSize: 58, fontWeight: 'bold', lineHeight: 80},
        h2: {fontSize: 46, fontWeight: 'bold', lineHeight: 64},
        h3: {fontSize: 20, fontWeight: 'bold', lineHeight: 50},
        h4: {fontSize: 16, fontWeight: 'bold', lineHeight: 30},
        normalSize: {fontSize: 16, fontWeight: 'medium', lineHeight: 30},
    });

    Shadows.loadShadows({
        sh30: {
            shadowColor: Colors.grey10, 
            shadowOpacity: 0.5, 
            shadowRadius: 4.5, 
            shadowOffset: {height: 4, width: 0}
        }
    })
}