import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Image, Text, TextInput, TouchableOpacity, StyleSheet, Switch, TouchableWithoutFeedback, Keyboard, ScrollView, Dimensions } from 'react-native';

const GoteoApp = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cantidad, setCantidad] = useState('');
  const [tiempo, setTiempo] = useState('');
  const [unidadTiempo, setUnidadTiempo] = useState('minutos');
  const [resultado, setResultado] = useState('');

  useEffect(() => {
    // Simulando una carga de 3 segundos (ajusta el tiempo según tus necesidades)
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  const calcularGoteo = () => {
    const volumenSuero = parseInt(cantidad);
    const tiempoInt = parseInt(tiempo);

    if (!isNaN(volumenSuero) && !isNaN(tiempoInt)) {
      let tiempoEnMinutos = tiempoInt;
      if (unidadTiempo === 'horas') {
        tiempoEnMinutos *= 60;
      }

      const goteoMicrogotas = (volumenSuero * 60) / tiempoEnMinutos;
      const goteoMacrogotas = (volumenSuero * 20) / tiempoEnMinutos;
      const goteoMlHora = goteoMicrogotas;

      let resultadoText = `Microgotas por minuto: ${goteoMicrogotas.toFixed(2)} μgtt/min (${Math.ceil(goteoMicrogotas)}).\n`;
      resultadoText += `Macrogotas por minuto: ${goteoMacrogotas.toFixed(2)} gtt/min (${Math.ceil(goteoMacrogotas)}).\n`;
      resultadoText += `El goteo en mililitros por hora es de ${goteoMlHora.toFixed(2)} ml/h (${Math.ceil(goteoMlHora)} ml/h).`;

      setResultado(resultadoText);
    } else {
      setResultado('');
    }
  };



  const limpiarCampos = () => {
    setCantidad('');
    setTiempo('');
    setUnidadTiempo('minutos');
    setResultado('');
  };

 // Función para escalar el tamaño de fuente en función del ancho de la pantalla
 const scaleFontSize = (fontSize) => {
  const windowWidth = Dimensions.get('window').width;
  return Math.round(fontSize * windowWidth / 360);
};


// Obtener las dimensiones de la pantalla
const { width } = Dimensions.get('window');

return (
  <ScrollView contentContainerStyle={styles.container}>
    {isLoading ? (
      <>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Cargando...</Text>
        <Text style={styles.loadingfooter}>...</Text>
      </>
    ) : (
      <>
        {width > 360 && ( // Ocultar la imagen si el ancho de la pantalla es menor o igual a 360 (pantallas de 5 pulgadas o más pequeñas)
          <Image source={require('./assets/suero.png')} style={styles.logo} />
        )}
        <Text style={styles.title}>Calculadora de Goteo</Text>

        {/* Resto del contenido de la aplicación */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Cantidad (ml)</Text>
          <TextInput
            style={styles.input}
            value={cantidad}
            onChangeText={setCantidad}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Tiempo</Text>
          <View style={styles.timeContainer}>
            <Text style={styles.switchText}>{unidadTiempo}</Text>
            <Switch
              value={unidadTiempo === 'minutos'}
              onValueChange={(value) => setUnidadTiempo(value ? 'minutos' : 'horas')}
            />
          </View>
          <TextInput
            style={styles.input}
            value={tiempo}
            onChangeText={setTiempo}
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={calcularGoteo}>
          <Text style={styles.buttonText}>Calcular Goteo</Text>
        </TouchableOpacity>

        {resultado !== '' && <Text style={styles.resultado}>{resultado}</Text>}
      </>
    )}
  </ScrollView>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9999',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 30,
    marginTop: 30,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  input: {
    width: 220,
    height: 40,
    borderColor: '#007AFF',
    borderWidth: 1,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    borderRadius: 4,
    color: 'black',
    fontSize: 18,
  },
  switchText: {
    color: '#333333',
    fontSize: 18,
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 0,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  resultado: {
    color: '#333333',
    fontSize: 15,
    marginTop: 15,
    textAlign: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Para ajustar el espacio entre el texto y el Switch
    marginBottom: 8,
  },
  loadingText: {
    marginTop: 10, // o cualquier valor que desees
    fontSize: 18, // o cualquier valor que desees
    color: '#007AFF', // o cualquier valor que desees
},
  loadingfooter: {
    textAlign: 'center',
    position: 'absolute', 
    bottom: 0,
    marginTop: 10, // o cualquier valor que desees
    fontSize: 18, // o cualquier valor que desees
    color: 'black', // o cualquier valor que desees
  },
});

export default GoteoApp;
