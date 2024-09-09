import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function OTPScreen() {
    const route = useRoute();
    const { email, generatedOTP } = route.params; // Get the generated OTP passed from the previous screen
    const [otp, setOtp] = useState('');
    const navigation = useNavigation();

    const verifyOTP = () => {
        if (otp === generatedOTP) { // Compare with the generated OTP
            navigation.navigate('ResetPassword', { email });
        } else {
            alert('Invalid OTP');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter OTP"
                value={otp}
                onChangeText={setOtp}
                keyboardType="numeric"
            />
            <TouchableOpacity style={styles.button} onPress={verifyOTP}>
                <Text style={styles.buttonText}>Verify OTP</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    input: { borderWidth: 1, padding: 10, marginBottom: 20, borderRadius: 5 },
    button: { backgroundColor: '#2196F3', padding: 15, borderRadius: 5 },
    buttonText: { color: '#fff', textAlign: 'center' },
});
