import React, { Component } from 'react';

import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';

import PropTypes from 'prop-types';

import api from '~/services/api';

import styles from './styles';
import { colors } from '~/styles';

export default class Welcome extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    username: '',
    loading: false,
    error: false,
  };

  checkUserExists = async (username) => {
    const user = await api.get(`/users/${username}`);
    return user;
  };

  saveUser = async (username) => {
    // STUDY_NOTE: '@Githuber' is a convention to name keys. First the name of app followed the field name.
    await AsyncStorage.setItem('@Githuber:username', username);
  };

  signIn = async () => {
    const { username } = this.state;

    // STUDY_NOTE: The navigation is passed to props from 'createSwitchNavigator' in 'routes.js'
    // to see options: console.tron.log(this.props.navigation)
    const { navigation } = this.props;

    if (!this.state.loading) {
      this.setState({ loading: true });

      try {
        await this.checkUserExists(username);
        await this.saveUser(username);

        // navigation.navigate('Repositories'); // Used before Tabs manage
        navigation.navigate('User');
      } catch (error) {
        this.setState({ loading: false, error: true });
        console.tron.log(error);
      }
    }
  };

  render() {
    const { username, loading, error } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={colors.secondary} />

        <Text style={styles.title}>Welcome</Text>
        <Text style={styles.text}>To continue we need your Github username.</Text>

        {error && <Text style={styles.error}>User cannot be found</Text>}

        <View style={styles.form}>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Input your username"
            underlineColorAndroid="transparent"
            value={username}
            onChangeText={text => this.setState({ username: text })}
          />

          <TouchableOpacity style={styles.button} onPress={this.signIn}>
            {loading ? (
              <ActivityIndicator size="small" color="#FFF" />
            ) : (
              <Text style={styles.buttonText}>Next</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
