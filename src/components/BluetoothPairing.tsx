
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BluetoothIcon, Search, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BluetoothPairingProps {
  onConnect: (deviceName: string) => void;
}

const BluetoothPairing = ({ onConnect }: BluetoothPairingProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [availableDevices, setAvailableDevices] = useState<string[]>([]);
  const { toast } = useToast();

  const scanForDevices = async () => {
    setIsScanning(true);
    
    // Simulate scanning for devices
    setTimeout(() => {
      const mockDevices = [
        "VeraShield Pro",
        "RepellentDevice-001",
        "Smart Sprayer v2"
      ];
      setAvailableDevices(mockDevices);
      setIsScanning(false);
      
      toast({
        title: "Scan Complete",
        description: `Found ${mockDevices.length} devices nearby`,
      });
    }, 2000);
  };

  const connectToDevice = (deviceName: string) => {
    // Simulate connection
    setTimeout(() => {
      onConnect(deviceName);
      toast({
        title: "Device Connected",
        description: `Successfully connected to ${deviceName}`,
      });
    }, 1000);
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
