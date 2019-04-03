import React from 'react';

import {
  Text, TextInput, TouchableOpacity, View, StatusBar,
} from 'react-native';

import styles from './styles';
import { colors } from '~/styles';

const Welcome = () => (
  <View style={styles.container}>
    <StatusBar barStyle="light-content" backgroundColor={colors.secondary} />

    <Text style={styles.title}>Welcome</Text>
    <Text style={styles.text}>To continue we need your Github username.</Text>
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Input your username"
        underlineColorAndroid="transparent"
      />

      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default Welcome;
