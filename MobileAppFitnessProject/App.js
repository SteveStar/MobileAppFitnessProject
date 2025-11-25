import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Switch, TouchableOpacity, StatusBar, AsyncStorage } from 'react-native';

// imported the styles
import { Colors, getStyleGroups } from './styles';

// defining the default settings for the app
const defaultSettings = {
  notifications: false,
  darkMode: false,
  weightUnit: 'kg',
  restTime: 30,
  calorieTracker: '0',
};

// this is where the main app components are
export default function WorkoutApp() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [settings, setSettings] = useState(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  // load the settings when the app is on
  useEffect(() => {
    loadSettings();
  }, []);

  // then load the settings from storage
  const loadSettings = async () => {
    try {
      const storedSettings = await AsyncStorage.getItem('workout-app-settings');
      if (storedSettings) {
        setSettings(JSON.parse(storedSettings));
      }
    } catch (error) {
      console.log('Error loading settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // saving the settings to storage
  const saveSettings = async (newSettings) => {
    try {
      await AsyncStorage.setItem('workout-app-settings', JSON.stringify(newSettings));
    } catch (error) {
      console.log('Error saving settings:', error);
    }
  };

  // update a setting and it will save it
  const updateSetting = (key, value) => {
    const newSettings = {
      ...settings,
      [key]: value
    };
    setSettings(newSettings);
    saveSettings(newSettings);
  };


  // Get dynamic styles based on dark mode
  const dynamicStyles = getStyleGroups(settings.darkMode);
  const { 
    appStyles, 
    headerStyles, 
    buttonStyles, 
    sectionStyles, 
    settingsStyles 
  } = dynamicStyles;

  // NOTE: I use a LOT of ternary operators in this file. If you'd like to change them, feel free to
  // for reference if youre stuck, just take this example: const currentColors = settings.darkMode ? Colors.dark : Colors.light;
  /* and turn it into this:
    let currentColors;
    if (settings.darkMode) {
      currentColors = Colors.dark;
    } else {
      currentColors = Colors.light;
    }
   */

  const SettingsItem = ({ label, value, onValueChange, type = 'switch', options }) => {
    return (
      <View style={settingsStyles.settingsItem}>
        <Text style={settingsStyles.settingsLabel}>{label}</Text>
        
        {type === 'switch' && (
          <Switch
            value={value}
            onValueChange={onValueChange}
            trackColor={{ false: '#767577', true: Colors.light.primary }}

            // Hey it's Steve working on the settings, so I hope the switch color is fine for you guys
            // in expo dev its perpetually stuck as a really bad looking green. I've left the thumbColor below for you guys to change.
            thumbColor={value ? '#ffffff' : '#f4f3f4'}
          />
        )}
        
        {type === 'button' && (
          <TouchableOpacity onPress={() => onValueChange?.(!value)} style={buttonStyles.button}>
            <Text style={buttonStyles.buttonText}>{value}</Text>
          </TouchableOpacity>
        )}
        
        {type === 'select' && options && (
          <View style={settingsStyles.selectContainer}>
            {options.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  settingsStyles.option,
                  value === option && settingsStyles.selectedOption
                ]}
                onPress={() => onValueChange?.(option)}
              >
                <Text style={[
                  settingsStyles.optionText,
                  value === option && settingsStyles.selectedOptionText
                ]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };

  // this is the home screen, I have it set as this for the sake of it being a template
  const HomeScreen = () => (
    <View style={appStyles.container}>
      <Text style={headerStyles.title}>Fitness App</Text>
      
      <View style={buttonStyles.buttonContainer}>
        <TouchableOpacity 
          style={buttonStyles.button}
          onPress={() => setCurrentScreen('settings')}
        >
          <Text style={buttonStyles.buttonText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // this is the settings screen
  const SettingsScreen = () => (
    <ScrollView style={appStyles.container}>
      <View style={headerStyles.header}>
        <TouchableOpacity 
          onPress={() => setCurrentScreen('home')}
          style={headerStyles.backButton}
        >
          <Text style={headerStyles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={headerStyles.settingsTitle}>Settings</Text>
      </View>
      
      {/* This is the start of the settings, below are them */}
      <View style={sectionStyles.section}>
        <Text style={sectionStyles.sectionTitle}>Preferences</Text>
        
        <SettingsItem
          label="Dark Mode"
          value={settings.darkMode}
          onValueChange={(value) => updateSetting('darkMode', value)}
          type="switch"
        />
        
        <SettingsItem
          label="Notifications"
          value={settings.notifications}
          onValueChange={(value) => updateSetting('notifications', value)}
          type="switch"
        />
        
        <SettingsItem
          label="Weight Unit"
          value={settings.weightUnit}
          onValueChange={(value) => updateSetting('weightUnit', value)}
          type="select"
          options={['kg', 'lbs']}
        />
      </View>

      <View style={sectionStyles.section}>
        <Text style={sectionStyles.sectionTitle}>Workout</Text>
        
        <SettingsItem
          label="Default Rest Time"
          value={`${settings.restTime}s`}
          onValueChange={() => {
            const newTime = settings.restTime === 30 ? 60 : 
                            settings.restTime === 60 ? 90 : 30;
            updateSetting('restTime', newTime);
          }}
          type="button"
        />
      </View>

      <View style={sectionStyles.section}>
        <Text style={sectionStyles.sectionTitle}>Calorie Tracker</Text>
        
        <SettingsItem
          label="Calories"
          value={settings.calorieTracker}
          type="button"
        />
      </View>

        {/* 
          READ THIS FOR NEW SETTINGS: I left some section templates just in case I didn't already include anything in the above. 
          To add new ones is pretty easy, just add the button value to it or follow the above sections
        */}

      <View style={sectionStyles.section}>
        <Text style={sectionStyles.sectionTitle}>Section</Text>
        
        <TouchableOpacity style={settingsStyles.settingsItem}>

          <Text style={settingsStyles.settingsLabel}>Description</Text>
        
        </TouchableOpacity>
      </View>

      <View style={sectionStyles.section}>
        <Text style={sectionStyles.sectionTitle}>Section</Text>
        
        <TouchableOpacity style={settingsStyles.settingsItem}>
          <Text style={settingsStyles.settingsLabel}>Description</Text>
        </TouchableOpacity>
      </View>


      <TouchableOpacity 
        style={[buttonStyles.button, buttonStyles.successButton]}>

        <Text style={buttonStyles.buttonText}>Save All Settings</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  if (isLoading) {
    return (
      <View style={[appStyles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={headerStyles.title}>Loading settings...</Text>
      </View>
    );
  }

  return (
    <View style={appStyles.appContainer}>
      <StatusBar backgroundColor={settings.darkMode ? Colors.dark.background : Colors.light.background} />
      {currentScreen === 'home' ? <HomeScreen /> : <SettingsScreen />}
    </View>
  );
}