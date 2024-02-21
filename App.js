import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import TenderSwipe from './screens/TenderSwip';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TenderSwipe />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
