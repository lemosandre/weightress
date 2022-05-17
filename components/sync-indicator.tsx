import React, {useEffect, useState} from 'react';
import {View, Text, Alert, TouchableOpacity} from 'react-native';
import {syncStyles} from './styles';
import {sync, syncOut} from '../data/sync';

const SyncIndicator = () => {
  const [syncState, setSyncState] = useState<string>('');

  useEffect(() => {
    // sync()
    //   .then(() => setSyncState(''))
    //   .catch(() => setSyncState('Sync failed!'));
  });

  const onPressSync= () => {
      sync()
      .then(() => setSyncState('Sync Done'))
      .catch(() => setSyncState('Sync failed!'));
  }

  const onPressSyncOut= () => {
    syncOut()
    .then(() => setSyncState('Sync Out Done'))
    .catch(() => setSyncState('Sync Out failed!'));
}

  return (
    <View style={syncStyles.container}>
       <TouchableOpacity onPress={onPressSync} style={syncStyles.appButtonContainer}>
        <Text style={syncStyles.appButtonText}>Sync out - Get</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressSyncOut} style={syncStyles.appButtonContainer}>
        <Text style={syncStyles.appButtonText}>Sync out - Post</Text>
      </TouchableOpacity>
      <Text style={syncStyles.text}>{syncState}</Text>
    </View>
  );
};

export default SyncIndicator;