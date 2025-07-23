import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.c067a16781724301aaeb224d8c8f7394',
  appName: 'buzz-off-scheduler-app-98',
  webDir: 'dist',
  server: {
    url: 'https://c067a167-8172-4301-aaeb-224d8c8f7394.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0
    }
  }
};

export default config;