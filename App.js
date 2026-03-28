import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import Alumnos from './Alumnos';

export default function App() {
  return (
    <PaperProvider>
      <View style={styles.contenedorPrincipal}>
        <Text style={styles.titulo}>Lista de Estudiantes - Proyecto React Native</Text>
        <StatusBar style="auto" />
        <Alumnos />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  contenedorPrincipal: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  titulo: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 12,
    marginBottom: 8,
  },
});
