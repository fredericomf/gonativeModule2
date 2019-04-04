import React, { Component } from 'react';
import {
  ActivityIndicator, AsyncStorage, FlatList, Text, View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

import RepositoryItem from './RepositoryItem';
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
    refreshing: false,
  };

  componentDidMount() {
    this.loadRepositories();
  }

  loadRepositories = async () => {

    this.setState({refreshing: true});

    const username = await AsyncStorage.getItem('@Githuber:username');
    const response = await api.get(`/users/${username}/repos`);

    this.setState({ data: response.data, loading: false, refreshing: false });
  }

  renderListItem = ({ item }) => <RepositoryItem repository={item} />;

  renderList = () => {
    const { data, refreshing } = this.state;


    /**
     * STUDY_NOTES:
     * FlatList is most indicated to introduce lists with React Native.
     * keyExtractor: As known, RN map need a unique key value to optimize updates. This key is recomended to be a string.
     * renderItem: A component to render the data.
     * onRefresh: Action triggered when user drag list start above it.
     * 
     */
    return (
      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderListItem}
        onRefresh={this.loadRepositories}
        refreshing={refreshing}
      />
    );
  };

  render() {
    const { loading } = this.state;

    return (
      <View style={styles.container}>
        <Header title="Repositories" />

        {loading ? <ActivityIndicator style={styles.loading} /> : this.renderList()}
      </View>
    );
  }
}
