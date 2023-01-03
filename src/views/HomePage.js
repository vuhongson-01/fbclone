import React from 'react';

import { StatusBar, ScrollView, View } from 'react-native';

// import styled from 'styled-components/native';

import AppBar from '../components/khang_components/AppBar';
import ToolBar from '../components/khang_components/ToolBar';
import Users from '../components/khang_components/Users';
import Story from '../components/khang_components/Story';
import Feed from '../components/khang_components/Feed';

// const Container = styled.SafeAreaView` 
// 	flex: 1;
// `;

const Homepage = () => {
    return (
        <>
            <StatusBar
                backgroundColor="#FFFFFF"
                barStyle="dark-content"
            />
            <View style={styles.Container}>
                <ScrollView>
                    <AppBar />
                    <ToolBar />
                    {/* <Users /> */}
                    <Story />
                    <Feed />
                </ScrollView>
            </View>
        </>
    );
};

const styles = {
    Container: {
        flex: 1,
    }
}

export default Homepage;
