import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// A professional, modern color palette
const palette = {
  primary: {
    main: '#4A90E2',
    light: '#EAF2FB',
    dark: '#3A73B5',
  },
  secondary: {
    main: '#50C878',
    light: '#E6F8EB',
  },
  text: {
    primary: '#212B36',
    secondary: '#637381',
  },
  background: {
    default: '#F4F6F8',
    paper: '#FFFFFF',
  },
  divider: '#DFE3E8',
};

let theme = createTheme({
  palette,
  // FIX: Reduce the base spacing unit to make all components more compact.
  // The default is 8, so 6 is a noticeable but balanced reduction.
  spacing: 6,
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h2: { fontWeight: 700 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    subtitle1: { color: palette.text.secondary },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    // --- Global Component Style Overrides ---
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        // FIX: Reduce button padding for a more compact feel
        sizeMedium: {
            padding: '6px 16px',
        },
        sizeLarge: {
            padding: '8px 22px',
        },
        containedPrimary: {
            color: '#fff'
        }
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0px 0px 2px 0px rgba(145, 158, 171, 0.2), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)',
          borderRadius: 16,
          transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        },
      },
    },
    // FIX: Reduce the default padding inside cards
    MuiCardContent: {
        styleOverrides: {
            root: {
                padding: '20px', // Default is 24px
            }
        }
    },
    MuiPaper: {
        styleOverrides: {
            root: {
                backgroundImage: 'none'
            }
        }
    },
    MuiAppBar: {
        styleOverrides: {
            root: {
                boxShadow: 'none',
                backgroundColor: 'rgba(244, 246, 248, 0.8)',
                backdropFilter: 'blur(6px)',
                color: palette.text.primary,
            }
        }
    },
    MuiDrawer: {
        styleOverrides: {
            paper: {
                borderRight: `1px dashed ${palette.divider}`,
            }
        }
    },
    // FIX: Set default size for form fields to 'small'
    MuiTextField: {
        defaultProps: {
            size: 'small',
        }
    },
    MuiSelect: {
        defaultProps: {
            size: 'small',
        }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: palette.primary.main,
          },
        },
      },
    },
  },
});

// Use responsiveFontSizes to make typography scale with screen size
theme = responsiveFontSizes(theme);

export { theme };

