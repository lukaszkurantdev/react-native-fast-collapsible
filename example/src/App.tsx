import React from 'react';

import { SafeAreaView, StyleSheet, View } from 'react-native';

import SimpleCollapsible from './SimpleCollapsible/SimpleCollapsible';
import HeadlessCollapsible from './HeadlessCollapsible/HeadlessCollapsible';

export default function App() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <SimpleCollapsible />
        <HeadlessCollapsible />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    padding: 20,
    rowGap: 50,
  },
});
