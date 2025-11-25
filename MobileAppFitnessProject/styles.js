import { StyleSheet } from 'react-native';

export const Colors = {
  light: {
    primary: '#ff7700',
    secondary: '#d69456',
    success: '#c76534',
    background: '#FFFFFF',
    card: '#F2F2F7',
    text: '#000000',
    border: '#C6C6C8',
    subtitle: '#666666',
  },
  dark: {
    primary: '#ff7700', // Keeping your orange theme for dark mode too
    secondary: '#d69456',
    success: '#c76534',
    background: '#000000',
    card: '#1C1C1E',
    text: '#FFFFFF',
    border: '#38383A',
    subtitle: '#98989F',
  },
};

// these are the base styles
export const baseStyles = StyleSheet.create({
  // holding the app container
  appContainer: {
    flex: 1,
  },
  
  container: {
    flex: 1,
  },
  
  // header stylings
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    paddingBottom: 10,
  },
  backButton: {
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  
  // title stylings
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  settingsTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40,
  },
  
  // button stylings
  buttonContainer: {
    width: '100%',
    padding: 20,
    gap: 12,
  },
  button: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
  },
  tertiaryButton: {
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  
  // section stylings
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  
  // setting items stylization
  settingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  settingsLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  
  // selecting components stylings
  selectContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  option: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  selectedOption: {
    // empty for the color will be chosen dynamically
  },
  optionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  selectedOptionText: {
    color: '#FFFFFF',
  },
  
  // success button
  successButton: {
    margin: 20,
    marginTop: 30,
  },
});

// function to create dynamic styles based on theme
export const createStyles = (isDarkMode) => {
  const colors = isDarkMode ? Colors.dark : Colors.light;
  
  return StyleSheet.create({
    appContainer: {
      ...baseStyles.appContainer,
      backgroundColor: colors.background,
    },
    container: {
      ...baseStyles.container,
      backgroundColor: colors.background,
    },
    header: baseStyles.header,
    backButton: baseStyles.backButton,
    backButtonText: {
      ...baseStyles.backButtonText,
      color: colors.primary,
    },
    title: {
      ...baseStyles.title,
      color: colors.text,
    },
    settingsTitle: {
      ...baseStyles.settingsTitle,
      color: colors.text,
    },
    subtitle: {
      ...baseStyles.subtitle,
      color: colors.subtitle,
    },
    buttonContainer: baseStyles.buttonContainer,
    button: {
      ...baseStyles.button,
      backgroundColor: colors.primary,
    },
    secondaryButton: {
      ...baseStyles.secondaryButton,
      borderColor: colors.primary,
    },
    tertiaryButton: {
      ...baseStyles.tertiaryButton,
      backgroundColor: colors.secondary,
    },
    buttonText: baseStyles.buttonText,
    secondaryButtonText: {
      ...baseStyles.secondaryButtonText,
      color: colors.primary,
    },
    section: baseStyles.section,
    sectionTitle: {
      ...baseStyles.sectionTitle,
      color: colors.primary,
    },
    settingsItem: {
      ...baseStyles.settingsItem,
      borderBottomColor: colors.border,
    },
    settingsLabel: {
      ...baseStyles.settingsLabel,
      color: colors.text,
    },
    selectContainer: baseStyles.selectContainer,
    option: {
      ...baseStyles.option,
      backgroundColor: colors.card,
    },
    selectedOption: {
      ...baseStyles.selectedOption,
      backgroundColor: colors.primary,
    },
    optionText: {
      ...baseStyles.optionText,
      color: colors.text,
    },
    selectedOptionText: baseStyles.selectedOptionText,
    successButton: {
      ...baseStyles.successButton,
      backgroundColor: colors.success,
    },
  });
};

// exporting individual style groups to use
export const getStyleGroups = (isDarkMode) => {
  const dynamicStyles = createStyles(isDarkMode);
  
  return {
    appStyles: {
      appContainer: dynamicStyles.appContainer,
      container: dynamicStyles.container,
    },
    headerStyles: {
      header: dynamicStyles.header,
      backButton: dynamicStyles.backButton,
      backButtonText: dynamicStyles.backButtonText,
      title: dynamicStyles.title,
      settingsTitle: dynamicStyles.settingsTitle,
      subtitle: dynamicStyles.subtitle,
    },
    buttonStyles: {
      buttonContainer: dynamicStyles.buttonContainer,
      button: dynamicStyles.button,
      secondaryButton: dynamicStyles.secondaryButton,
      tertiaryButton: dynamicStyles.tertiaryButton,
      buttonText: dynamicStyles.buttonText,
      secondaryButtonText: dynamicStyles.secondaryButtonText,
      successButton: dynamicStyles.successButton,
    },
    sectionStyles: {
      section: dynamicStyles.section,
      sectionTitle: dynamicStyles.sectionTitle,
    },
    settingsStyles: {
      settingsItem: dynamicStyles.settingsItem,
      settingsLabel: dynamicStyles.settingsLabel,
      selectContainer: dynamicStyles.selectContainer,
      option: dynamicStyles.option,
      selectedOption: dynamicStyles.selectedOption,
      optionText: dynamicStyles.optionText,
      selectedOptionText: dynamicStyles.selectedOptionText,
    },
  };
};