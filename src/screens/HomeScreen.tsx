import React, { useEffect, useState } from 'react';
import {
    BackHandler,
    Modal,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
} from 'react-native';
import Homeheader from '../components/Homeheader';
import HomeCard from '../components/HomeCard';
import Card from '../components/Card';
import { COLOR } from '../utils/constant';
import { useIsFocused } from '@react-navigation/native';

const HomeScreen = () => {
    const [exitModalVisible, setExitModalVisible] = useState(false);
    const isFocused = useIsFocused();
    useEffect(() => {
        if (!isFocused) return;
        const backAction = () => {
            setExitModalVisible(true);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
    }, [isFocused]);

    const handleExit = () => {
        setExitModalVisible(false);
        BackHandler.exitApp();
    };

    return (
        <SafeAreaView style={{ backgroundColor: COLOR.WHITE, flex: 1 }}>
            <Homeheader title={'Home'} />
            <HomeCard />
            <View style={{ margin: 10 }}>
                <Card />
            </View>

            {/* Custom Exit Modal */}
            <Modal
                visible={exitModalVisible}
                transparent
                animationType="none"
                onRequestClose={() => setExitModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalTitle}>Exit App</Text>
                        <Text style={styles.modalText}>Do you want to exit the app?</Text>

                        <View style={styles.buttonRow}>
                            <TouchableOpacity
                                style={[styles.button, styles.cancelButton]}
                                onPress={() => setExitModalVisible(false)}
                            >
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.exitButton]}
                                onPress={handleExit}
                            >
                                <Text style={styles.buttonText}>Exit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBox: {
        backgroundColor: 'white',
        padding: 25,
        borderRadius: 15,
        width: '80%',
        alignItems: 'center',
        elevation: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 14,
        color: '#444',
        textAlign: 'center',
        marginBottom: 20,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        flex: 1,
        padding: 12,
        borderRadius: 8,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#ccc',
    },
    exitButton: {
        backgroundColor: COLOR.HEADER,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
