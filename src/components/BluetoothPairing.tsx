
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BluetoothIcon, Search, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Capacitor Bluetooth functionality
const isNativeApp = () => {
  return window.location.protocol === 'capacitor:';
};

const scanForBluetoothDevices = async () => {
  if (isNativeApp() && (window as any).BluetoothLE) {
    try {
      // Initialize Bluetooth
      await (window as any).BluetoothLE.initialize();
      
      // Start scanning
      const devices = await (window as any).BluetoothLE.startScan({
        services: [],
        allowDuplicates: false,
        scanMode: 'lowLatency',
        matchMode: 'aggressive',
        matchNum: 'oneAdvertisement',
        callbackType: 'allMatches'
      });
      
      return devices;
    } catch (error) {
      console.error('Bluetooth scan error:', error);
      throw error;
    }
  } else {
    // Fallback for web/development
    return [
      { name: "VeraShield Pro", address: "00:11:22:33:44:55" },
      { name: "RepellentDevice-001", address: "00:11:22:33:44:56" },
      { name: "Smart Sprayer v2", address: "00:11:22:33:44:57" }
    ];
  }
};

const connectToBluetoothDevice = async (deviceAddress: string) => {
  if (isNativeApp() && (window as any).BluetoothLE) {
    try {
      await (window as any).BluetoothLE.connect({ address: deviceAddress });
      return true;
    } catch (error) {
      console.error('Bluetooth connection error:', error);
      throw error;
    }
  }
  return true; // Fallback for web
};

interface BluetoothPairingProps {
  onConnect: (deviceName: string) => void;
}

const BluetoothPairing = ({ onConnect }: BluetoothPairingProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [availableDevices, setAvailableDevices] = useState<string[]>([]);
  const { toast } = useToast();

  const scanForDevices = async () => {
    setIsScanning(true);
    
    try {
      const devices = await scanForBluetoothDevices();
      const deviceNames = devices.map((device: any) => device.name || `Device ${device.address}`);
      
      setTimeout(() => {
        setAvailableDevices(deviceNames);
        setIsScanning(false);
        
        toast({
          title: "Scan Complete",
          description: `Found ${deviceNames.length} devices nearby`,
        });
      }, 2000);
    } catch (error) {
      setIsScanning(false);
      toast({
        title: "Scan Failed",
        description: "Could not scan for Bluetooth devices",
        variant: "destructive"
      });
    }
  };

  const connectToDevice = async (deviceName: string) => {
    try {
      // In a real app, you'd use the device address stored from scan results
      const mockAddress = "00:11:22:33:44:55"; // This would come from scan results
      
      await connectToBluetoothDevice(mockAddress);
      
      setTimeout(() => {
        onConnect(deviceName);
        toast({
          title: "Device Connected",
          description: `Successfully connected to ${deviceName}`,
        });
      }, 1000);
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: `Could not connect to ${deviceName}`,
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BluetoothIcon className="w-5 h-5 text-blue-600" />
          Pair Device
        </CardTitle>
        <CardDescription>
          Connect your mosquito repellent device via Bluetooth
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={scanForDevices}
          disabled={isScanning}
          className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
        >
          {isScanning ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Scanning...
            </>
          ) : (
            <>
              <Search className="w-4 h-4 mr-2" />
              Scan for Devices
            </>
          )}
        </Button>

        {availableDevices.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-gray-700">Available Devices:</h4>
            {availableDevices.map((device, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 rounded-lg border bg-gray-50/80 hover:bg-gray-100/80 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-medium">{device}</span>
                </div>
                <Button 
                  size="sm" 
                  onClick={() => connectToDevice(device)}
                  className="bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600"
                >
                  Connect
                </Button>
              </div>
            ))}
          </div>
        )}

        {!isScanning && availableDevices.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            <BluetoothIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No devices found. Make sure your device is in pairing mode.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BluetoothPairing;
