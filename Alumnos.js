import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { Searchbar, Button, Menu } from 'react-native-paper';
import Agregar from './Agregar';

const Alumnos = () => {
  const [estudiantes, setEstudiantes] = useState(null);
  const [buscaAlumno, setBuscaAlumno] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [alumnoEditando, setAlumnoEditando] = useState(null);
  const [menuOrdenVisible, setMenuOrdenVisible] = useState(false);
  const [orden, setOrden] = useState('nombre-asc');

  useEffect(() => {
    console.log("Componente inicializado");


    const temporizador = setTimeout(() => {
      const datosEstudiantes = 
[

    {

      nombre: 'CANDELARIA MORA SAMANTHA',

      matricula: '2114354'

    },

    {

      nombre: 'CANTU SILVA JAVIER',

      matricula: '2111889'

    },

    {

      nombre: 'CARMONA LOZANO ANGEL EMILIANO',

      matricula: '2069119'

    },

    {

      nombre: 'CASTILLO ACOSTA JORGE',

      matricula: '2132842'

    },

    {

      nombre: 'DAVILA GONZALEZ ALDO ADRIAN',

      matricula: '1994122'

    },

    {

      nombre: 'DURAN BARRIENTOS FABRIZIO',

      matricula: '2018230'

    },

    {

      nombre: 'FLORES GONZALEZ SEBASTIAN',

      matricula: '21045641'

    },

    {

      nombre: 'DURAN BARRIENTOS FABRIZIO',

      matricula: '20182301'

    },

    {

      nombre: 'FLORES GONZALEZ SEBASTIAN',

      matricula: '2104564'

    },

    {

      nombre: 'FLORES LÓPEZ DIEGO',

      matricula: '2066033'

    },

    {

      nombre: 'FLORES MARTINEZ ERICK ADRIAN',

      matricula: '2132976'

    },

    {

      nombre: 'GARZA AVALOS DIEGO',

      matricula: '2066114'

    },

    {

      nombre: 'GONZALEZ OVALLE CHRISTIAN GABRIEL',

      matricula: '2031243'

    },

    {

      nombre: 'GRANJA PEÑA DIEGO',

      matricula: '20647331'

    },

    {

      nombre: 'IBARRA RODRIGUEZ ALEXIS',

      matricula: '20312431'

    },

    {

      nombre: 'MARTINEZ ELIAS ANGEL SEBASTIAN',

      matricula: '2064733'

    },

    {

      nombre: 'MENDIETA GONZALEZ ESMERALDA GABRIELA',

      matricula: '2094647'

    },

    {

      nombre: 'MIRELES VELAZQUEZ ALEJANDRO',

      matricula: '2005102'

    },

    {

      nombre: 'MONSIVAIS SALAZAR ANDRES',

      matricula: '2064574'

    },

    {

      nombre: 'PARRAZALEZ VALDESPINO MARTHA JULIETA',

      matricula: '2024783'

    },

    {

      nombre: 'PEÑA MUNGARRO LUIS ANGEL',

      matricula: '2066077'

    },

    {

      nombre: 'PUENTE REYNOSO JULIO CESAR',

      matricula: '2092151'

    },

    {

      nombre: 'RAMIREZ LOPEZ BRYAN',

      matricula: '2103708'

    },

    {

      nombre: 'RAMOS AVILA LILIANA VALERIA',

      matricula: '2115192'

    },

    {

      nombre: 'RICO JAUREGUI MAURICIO',

      matricula: '2037503'

    },

    {

      nombre: 'RIVERA LUNA ADRIAN',

      matricula: '2131513'

    },

    {

      nombre: 'RIVERA REYNA JOSE EMILIO',

      matricula: '2013503'

    },

    {

      nombre: 'RODRIGUEZ OLVERA ROSA ISELA',

      matricula: '2004613'

    },

    {

      nombre: 'RODRIGUEZ RODRIGUEZ ANGEL AZAEL',

      matricula: '2133022'

    },

    {

      nombre: 'SANCHEZ GALARZA JUAN CARLOS',

      matricula: '2026061'

    },

    {

      nombre: 'SOLIS ORTIZ ALFREDO',

      matricula: '2095320'

    },

    {

      nombre: 'VELAZQUEZ ABREGO HERWIN DANIEL',

      matricula: '2025350'

    },

    {

      nombre: 'VILLAGRA RODRIGUEZ ANDRES NEHUEL',

      matricula: '2103895'

    },

    {

      nombre: 'ZACATENCO OLIVE RODRIGO',

      matricula: '1857791'

    },

    {

      nombre: 'ZAVALA CANTU TERESA MARGARITA',

      matricula: '2025218'

    }

    

  ] 
      ;
      const datosConId = datosEstudiantes.map((alumno, index) => ({
        ...alumno,
        id: `${alumno.matricula}-${index}`,
      }));
      setEstudiantes(datosConId); 

    }, 1500);

    return () => clearTimeout(temporizador);
  }, []);

  if (estudiantes === null) {
    return (
      <View style={styles.centrado}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando datos...</Text>
      </View>
    );
  }

  if (estudiantes.length === 0) {
    return (
      <View style={styles.centrado}>
        <Text style={styles.textoVacio}>No hay estudiantes registrados</Text>
      </View>
    );
  }

  const estudiantesFiltrados = estudiantes.filter((alumno) =>
    alumno.nombre.toLowerCase().includes(buscaAlumno.toLowerCase().trim()) ||
    alumno.matricula.toLowerCase().includes(buscaAlumno.toLowerCase().trim())
  );

  const estudiantesOrdenados = [...estudiantesFiltrados].sort((a, b) => {
    if (orden === 'nombre-asc') return a.nombre.localeCompare(b.nombre);
    if (orden === 'nombre-desc') return b.nombre.localeCompare(a.nombre);
    if (orden === 'matricula-asc') return a.matricula.localeCompare(b.matricula);
    return b.matricula.localeCompare(a.matricula);
  });

  const cerrarModal = () => {
    setModalVisible(false);
    setAlumnoEditando(null);
  };

  const abrirAgregar = () => {
    setAlumnoEditando(null);
    setModalVisible(true);
  };

  const abrirEditar = (alumno) => {
    setAlumnoEditando(alumno);
    setModalVisible(true);
  };

  const borrarAlumno = (id) => {
    setEstudiantes((actuales) => actuales.filter((alumno) => alumno.id !== id));
  };

  const onAdd = (nuevoAlumno) => {
    if (alumnoEditando) {
      setEstudiantes((actuales) =>
        actuales.map((alumno) =>
          alumno.id === alumnoEditando.id
            ? { ...alumno, matricula: nuevoAlumno.matricula, nombre: nuevoAlumno.nombre }
            : alumno
        )
      );
      cerrarModal();
      return;
    }

    setEstudiantes((actuales) => [
      ...actuales,
      {
        id: `${nuevoAlumno.matricula}-${Date.now()}`,
        matricula: nuevoAlumno.matricula,
        nombre: nuevoAlumno.nombre,
      },
    ]);
    cerrarModal();
  };

  const etiquetaOrden = {
    'nombre-asc': 'Nombre A-Z',
    'nombre-desc': 'Nombre Z-A',
    'matricula-asc': 'Matricula 0-9',
    'matricula-desc': 'Matricula 9-0',
  }[orden];

  return (
    <View style={styles.contenedor}>
      <Searchbar
        placeholder="Buscar alumno"
        onChangeText={setBuscaAlumno}
        value={buscaAlumno}
        style={styles.barraBusqueda}
      />

      <View style={styles.contenedorControles}>
        <Button mode="contained" icon="plus" onPress={abrirAgregar}>
          Agregar alumno
        </Button>

        <Menu
          visible={menuOrdenVisible}
          onDismiss={() => setMenuOrdenVisible(false)}
          anchor={
            <Button
              mode="outlined"
              icon="sort"
              onPress={() => setMenuOrdenVisible(true)}
            >
              Ordenar: {etiquetaOrden}
            </Button>
          }
        >
          <Menu.Item onPress={() => { setOrden('nombre-asc'); setMenuOrdenVisible(false); }} title="Nombre A-Z" />
          <Menu.Item onPress={() => { setOrden('nombre-desc'); setMenuOrdenVisible(false); }} title="Nombre Z-A" />
          <Menu.Item onPress={() => { setOrden('matricula-asc'); setMenuOrdenVisible(false); }} title="Matricula 0-9" />
          <Menu.Item onPress={() => { setOrden('matricula-desc'); setMenuOrdenVisible(false); }} title="Matricula 9-0" />
        </Menu>
      </View>

      <FlatList
        data={estudiantesOrdenados}
        keyExtractor={(elemento) => elemento.id}
        renderItem={({ item: elemento }) => (
          <View style={styles.tarjeta}>
            <View>
              <Text style={styles.nombreEstudiante}>{elemento.nombre}</Text>
              <Text style={styles.matriculaEstudiante}>Matricula: {elemento.matricula}</Text>
            </View>

            <View style={styles.acciones}>
              <Button compact mode="text" onPress={() => abrirEditar(elemento)}>
                Editar
              </Button>
              <Button compact mode="contained" buttonColor="#d32f2f" onPress={() => borrarAlumno(elemento.id)}>
                Borrar
              </Button>
            </View>
          </View>
        )}
      />

      <Agregar
        visible={modalVisible}
        initialAlumno={alumnoEditando}
        onAdd={onAdd}
        onDismiss={cerrarModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: '#fff' },
  centrado: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  barraBusqueda: { margin: 12 },
  contenedorControles: {
    marginHorizontal: 12,
    marginBottom: 10,
    gap: 10,
  },
  tarjeta: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  acciones: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  nombreEstudiante: { fontSize: 18, fontWeight: 'bold' },
  matriculaEstudiante: { color: '#666' },
  textoVacio: { fontSize: 16, color: 'red' }
});

export default Alumnos;