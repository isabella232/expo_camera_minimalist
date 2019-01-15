import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Icon,
  Dimensions,
  StyleSheet,
  Button
} from "react-native";
import {
  Permissions,
  Camera,
  BarCodeScanner
} from "expo";

const OVERLAY_COLOR = "rgba(0,0,0,0.8)";
const SCREEN_WIDTH = Dimensions.get("window").width;

class ScannerOverlay extends Component {

  static defaultProps = {
    onClose: () => {},
  };
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            backgroundColor: OVERLAY_COLOR,
            justifyContent: "center",
            alignItems: "center",
            paddingTop: 40
          }}
        >
          <Text
            style={{
              width: SCREEN_WIDTH - 80, // 250
              color: "white",
              fontSize: 20,
              lineHeight: 30,
              textAlign: "center"
            }}
          >
            balblablabla
            
          </Text>

          <TouchableOpacity
            onPress={this.props.onClose}
          >
            <Text
              style={{
                width: SCREEN_WIDTH - 80, // 250
                color: "white",
                fontSize: 20,
                lineHeight: 30,
                textAlign: "center"
              }}
            >CLOSE</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 1, backgroundColor: OVERLAY_COLOR }} />
          <View
            style={{
              height: SCREEN_WIDTH - 80, // 250
              width: SCREEN_WIDTH - 80, // 250
              borderWidth: 1,
              borderColor: "white"
            }}
          />
          <View style={{ flex: 1, backgroundColor: OVERLAY_COLOR }} />
        </View>
        <View style={{ flex: 1 / 2, backgroundColor: OVERLAY_COLOR }} />
      </View>
    );
  }
}

export default class App extends React.Component {

  state = {
    hasCameraPermission: false,
    showCamera: false
  };
  requestPermissions = async (...perms) => {
    try {
      const { status: existingStatus } = await Permissions.getAsync(...perms);
      if (existingStatus === "granted") {
        return true;
      }
      try {
        const { status } = await Permissions.askAsync(...perms);
        return status === "granted";
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  requestCameraPermission = async () => {
    const hasCameraPermission = await this.requestPermissions(
      Permissions.CAMERA
    );
    // TODO: translate
    if (!hasCameraPermission) {
      console.log('NO ALLOWED');
    }

    this.setState({ hasCameraPermission: true, showCamera: true });
  };

  showCamera = () => {
    this.requestCameraPermission();
  };
  closeCodeScanner = () => {
    console.log('Close scanner');
    this.setState({ showCamera: false });
  }


  render() {
    return (
      <View style={styles.container}>
        <Text>Camera bug crash test</Text>
        <Button
          onPress={this.showCamera}
          title="Show camera view"
        />
        {this.state.hasCameraPermission && this.state.showCamera ? (
          <Camera
            onMountError={err => console.error(err)}
            onBarCodeScanned={this.handleBarCodeRead}
            useCamera2Api={false}
            barCodeScannerSettings={{
              barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr]
            }}
            ratio="16:9"
            style={{ ...StyleSheet.absoluteFillObject }}
          >
            <ScannerOverlay onClose={this.closeCodeScanner} />

          </Camera>
        ): null }

      </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
