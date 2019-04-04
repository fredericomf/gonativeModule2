import { StyleSheet } from 'react-native';
import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius,
    flex: 1,
    marginTop: metrics.baseMargin,
    maxWidth: (metrics.screenWidth - 60) / 2,
    padding: metrics.basePadding,
  },

  avatar: {
    height: 50,
    width: 50,
  },

  title: {
    color: colors.darker,
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: metrics.baseMargin,
  },
});

export default styles;
