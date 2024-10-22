import { AppRegistry, PermissionsAndroid } from 'react-native';
import { NativeModules, NativeEventEmitter } from 'react-native';
import BleManager from 'react-native-ble-manager';

// Inicializaciones
const BLEModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BLEModule);
BleManager.start({ showAlert: false }).then(() => console.log("Modulo inicializado"));
var bluetoothAccess = false;
var location = false;

bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', (peripheral) => {
    console.log('Discovered peripheral: ', peripheral.id + " - " + peripheral.name + " - " + peripheral.rssi);
});

export const handlePress = () => {
    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then(check => {
        if (check) {
            console.log("permiso de localizacion activada");
            location = true
        } else {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then(check => {
                if (check) {
                    console.log("localizacion activada");
                    location = true
                } else {
                    console.log("localizacion rechazada");
                }
            })
        }
    })

    BleManager.enableBluetooth()
        .then(() => {
            console.log("BlueTooth activado");
            bluetoothAccess = true
        })
        .catch((error) => {
            console.log("activación blueTooth rechazada");
        });


    if (bluetoothAccess && location) {
        BleManager.scan([], 120, true)
            .then(() => {
                console.log('Escaneando...');
            })
            .catch((error) => {
                console.error('Error durante el escaneo:', error);
            });

        setTimeout(() => {
            BleManager.stopScan();
            console.log('Escaneo terminado.');
        }, 120000);
    }
};