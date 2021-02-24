import React, {Component} from 'react'
import {Text, View, StyleSheet, PermissionsAndroid} from 'react-native'
// import MusicFiles from 'react-native-get-music-files'
// import Permissions from 'react-native-permissions'
import RNFS from 'react-native-fs'

// console.log('Ouside!');

// function componentDidMount() {
//   Permissions.request('storage').then(response => {
//     this.setState({ photoPermission: response })
//   })
//  };

//  componentDidMount();

RNFS.readDir(RNFS.MainBundlePath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
  .then((result) => {
    console.log('GOT RESULT', result); 
    // stat the first file
    return Promise.all([RNFS.stat(result[0].path), result[0].path]);
  })
  .then((statResult) => {
    if (statResult[0].isFile()) {
      // if we have a file, read it
      return RNFS.readFile(statResult[1], 'utf8');
    }

    return 'no file';
  })
  .then((contents) => {
    // log the file contents
    console.log(contents);
  })
  .catch((err) => {
    console.log(err.message, err.code);
  });

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMErA,
      {
        title: 'Cool Photo App Camera Permission',
        message: 'Permission?',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPostitive: 'OK',
      }
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the camera');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

const HelloWorldApp = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}>
      <Text style={styles.titleText}>你好，璇!</Text>
    </View>
  );
};

class FactsApiFetcher extends Component {
  constructor(props) {
    super(props);
    this.state = {fact: 'Loading...'};
  }

  componentWillMount() {
    this._getRandomFact();
  }

  // Use constants
  // https://github.com/itinance/react-native-fs#constants
  _getRandomFact() {
    const fileContents = RNFS.read("path/on/android.txt");
    this.setState({fact: fileContents});
  }

  render() {
    return <Text> {this.state.fact} </Text>;
  }
}

const styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    color: 'green',
    fontFamily: 'Serif',
    fontSize: 50,
    fontWeight: 'bold',
  },
});

export default HelloWorldApp;
