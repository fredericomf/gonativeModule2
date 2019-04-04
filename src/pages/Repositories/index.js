import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

import styles from './styles';

import Header from '~/components/Header';

import api from '~/services/api';



const TabIcon = ({ tintColor }) => <Icon name="list-alt" size={20} color={tintColor} />;

TabIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};
export default class Repositories extends Component {
  // STUDY_NOTE: Options used by 'react-navigation'
  static navigationOptions = {
    tabBarIcon: TabIcon,
  };

  state = {
    data: [],
    loading: true,
  };

  async componentDidMount() {
    const username = await AsyncStorage.getItem('@Githuber:username');
    const response = await api.get(`/users/${username}/repos`);

    this.setState({ data: response.data, loading: false });
  }

  renderList = () => (
    <Text>List</Text>
  );

  render() {

    const { loading } = this.state;

    return (
      <View>
        <Header title="Repositories" />

        {loading ? <ActivityIndicator style={styles.loading} /> : this.renderList()}
      </View>
    );
  }
}
