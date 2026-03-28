import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Modal, Portal, Text, TextInput, Button } from 'react-native-paper';

const Agregar = ({ visible, onDismiss, onAdd, initialAlumno }) => {
  const [matricula, setMatricula] = useState('');
  const [nombre, setNombre] = useState('');

  useEffect(() => {
    if (visible) {
      setMatricula(initialAlumno?.matricula || '');
      setNombre(initialAlumno?.nombre || '');
    }
  }, [visible, initialAlumno]);

  const limpiarCampos = () => {
    setMatricula('');
    setNombre('');
  };

  const manejarCancelar = () => {
    limpiarCampos();
    onDismiss();
  };

  const manejarGuardar = () => {
    const matriculaLimpia = matricula.trim();
    const nombreLimpio = nombre.trim();

    if (!matriculaLimpia || !nombreLimpio) {
      return;
    }

    onAdd({
      ...initialAlumno,
      matricula: matriculaLimpia,
      nombre: nombreLimpio.toUpperCase(),
    });

    limpiarCampos();
  };

  const esEdicion = Boolean(initialAlumno);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={manejarCancelar}
        contentContainerStyle={styles.modal}
      >
        <Text variant="titleMedium" style={styles.titulo}>
          {esEdicion ? 'Editar alumno' : 'Agregar alumno'}
        </Text>

        <TextInput
          mode="outlined"
          label="Matricula"
          value={matricula}
          onChangeText={setMatricula}
          keyboardType="number-pad"
          style={styles.campo}
        />

        <TextInput
          mode="outlined"
          label="Nombre"
          value={nombre}
          onChangeText={setNombre}
          style={styles.campo}
        />

        <View style={styles.botones}>
          <Button mode="contained" onPress={manejarGuardar}>
            {esEdicion ? 'Guardar cambios' : 'Agregar'}
          </Button>
          <Button mode="text" onPress={manejarCancelar}>
            Cancelar
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 12,
    padding: 20,
  },
  titulo: {
    marginBottom: 12,
    fontWeight: '600',
  },
  campo: {
    marginBottom: 12,
  },
  botones: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
});

export default Agregar;
