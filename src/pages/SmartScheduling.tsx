
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import TimeScheduler from "@/components/TimeScheduler";

const SmartScheduling = () => {
  const [sprayTime, setSprayTime] = useState("20:00");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      <div className="container mx-auto px-4 py-6 max-w-md">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => navigate("/")}
            className="bg-white/80 backdrop-blur-sm border-0 shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              Smart Scheduling
            </h1>
            <p className="text-gray-600 text-sm">Manage automatic spray times</p>
          </div>
        </div>

        {/* Smart Scheduling Component */}
        <TimeScheduler 
          sprayTime={sprayTime}
          onTimeChange={setSprayTime}
        />
      </div>
    </div>
  );
};

export default SmartScheduling;
