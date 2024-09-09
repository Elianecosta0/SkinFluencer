import React, { useState } from 'react';
import { Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, View, Switch } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function SecurityScreen() {
  const navigation = useNavigation(); 
  const [isTwoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [isAppLockEnabled, setAppLockEnabled] = useState(false);

  const toggleTwoFactor = () => setTwoFactorEnabled((previousState) => !previousState);
  const toggleAppLock = () => setAppLockEnabled((previousState) => !previousState);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={20} color="#869F9C" />
        </TouchableOpacity>
        <Text style={styles.header}>Security</Text>

        {/* Security Options */}
        <View style={styles.optionContainer}>
          <Text style={styles.optionTitle}>Two-Factor Authentication</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isTwoFactorEnabled ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={toggleTwoFactor}
            value={isTwoFactorEnabled}
          />
        </View>
        <View style={styles.separator} />

        <View style={styles.optionContainer}>
          <Text style={styles.optionTitle}>App Lock</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isAppLockEnabled ? "#f5dd4b" : "#f4f3f4"}
            onValueChange={toggleAppLock}
            value={isAppLockEnabled}
          />
        </View>
        <View style={styles.separator} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
    width: 40,
    height: 40,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  header: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 26,
    marginTop: 40,
    color: '#869F9C',
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  optionTitle: {
    fontSize: 18,
    color: '#333',
  },
  separator: {
    height: 1,
    backgroundColor: '#E4E4E2',
    marginHorizontal: 10,
  },
});
