import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { colors } from "../utils/color";
import { setItem } from '../utils/asyncStorage';

const { width, height } = Dimensions.get("window");

const Onboarding1 = () => {
    const navigation = useNavigation();

    const handleDone = () => {
        navigation.navigate('Onboarding3');
        setItem('onboarded', '1');
    };

    const doneButton = ({ ...props }) => {
        return (
            <TouchableOpacity style={styles.doneButton} {...props}>
                <Text>Done</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <Onboarding
                onDone={handleDone}
                onSkip={handleDone}
                DoneButtonComponent={doneButton}
                bottomBarHighlight={false}
                containerStyles={{ paddingHorizontal: 15 }}
                pages={[
                    {
                        backgroundColor: '#fff',
                        image: <LottieView source={require('../assets/animations/onboard1.json')} autoPlay loop style={styles.lottie} />,
                        title: '',
                        subtitle: (
                            <Text style={styles.subtitle}>
                                Discover the perfect skincare routine and colors that complement your unique beauty. Let your skin glow with personalized care.
                            </Text>
                        ),
                    },
                    {
                        backgroundColor: '#fff',
                        image: <LottieView source={require('../assets/animations/onboard2.json')} autoPlay loop style={styles.lottie} />,
                        title: '', 
                        subtitle: (
                            <Text style={styles.subtitle}>
                                Shop your personalized skincare essentials and bring out your best self. Curated just for you, from analysis to your doorstep.
                            </Text>
                        ),
                    },
                ]}
            />

            {/* Top Left Corner Oval */}
            <View style={[styles.oval, styles.topLeft]} />

            
        </View>
    );
};

export default Onboarding1;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    lottie: {
        width: width * 2,
        height: width
    },
    doneButton: {
        padding: 20,
        backgroundColor: colors.primary,
        borderRadius: 20,
    },
    oval: {
        width: 227, // Adjust width for the oval
        height: 284, // Adjust height for the oval
        backgroundColor: '#A3BBC0',
        borderRadius: 75, // Half of the height for a perfect oval
        position: 'absolute',
        marginLeft: -110,
        
    },
    topLeft: {
        top: 0,
        left: 0,
    },
    subtitle: {
        fontSize: 18,
        color: '#A3BBC0',
        fontFamily: 'Cochin', // Replace with your custom font name
        textAlign: 'center',
        marginTop: 20,
        // You can add more styles here for padding, margins, etc.
    },
  
});

