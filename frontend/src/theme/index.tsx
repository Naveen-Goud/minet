import { createTheme } from '@mui/material/styles'
import '../index.css'

declare module '@mui/material/styles' {
  interface PaletteColor {
    100: string
    300: string
    500: string
    700: string
    900: string
  }
  interface CustomPalette {
    semantic: {
      success: {
        100: string
        500: string
      }
      warning: {
        100: string
        300: string
      }
      error: {
        100: string
        500: string
      }
    }
    gray: {
      50: string
      100: string
      300: string
      500: string
      700: string
      900: string
      white: string
      black: string
    }
  }

  interface Palette extends CustomPalette {
    semantic: {
      success: PaletteColor
      warning: PaletteColor
      error: PaletteColor
    }
    gray: {
      50: string
      100: string
      300: string
      500: string
      700: string
      900: string
      white: string
      black: string
    }
  }

  interface PaletteOptions extends CustomPalette {
    semantic: {
      success: PaletteColor
      warning: PaletteColor
      error: PaletteColor
    }
    gray: {
      50: string
      100: string
      300: string
      500: string
      700: string
      900: string
      black: string
      white: string
    }
  }

  interface TypeText {
    highemp: string
    medemp: string
    lowemp: string
  }

  interface TypographyVariants {
    h4: TypographyStyle
    h6: TypographyStyle
    subtitle1: TypographyStyle
    subtitle2: TypographyStyle
    b1: TypographyStyle
    b2: TypographyStyle
    c1: TypographyStyle
    c2: TypographyStyle
    button: TypographyStyle
    overline: TypographyStyle
  }

  interface TypographyVariantsOptions {
    h4?: TypographyStyle
    h6?: TypographyStyle
    subtitle1?: TypographyStyle
    subtitle2?: TypographyStyle
    b1?: TypographyStyle
    b2?: TypographyStyle
    c1?: TypographyStyle
    c2?: TypographyStyle
    button?: TypographyStyle
    overline?: TypographyStyle
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    h4: true
    h6: true
    subtitle1: true
    subtitle2: true
    b1: true
    b2: true
    c1: true
    c2: true
    button: true
    overline: true
  }
}

interface TypographyStyle {
  '@media (max-width:1920px)': {
    fontFamily: string
    fontSize: string
    fontWeight: string
    lineHeight: string
  }
}

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 601,
      md: 1081,
      lg: 1441,
      xl: 1920,
    },
  },
  spacing: 4,
  palette: {
    primary: {
      100: '#FAFCFF',
      300: '#CCE3FF',
      500: '#0052FF',
      700: '#002EB7',
      900: '#00177A',
    },
    semantic: {
      success: {
        100: '#E9F7EC',
        500: '#20B03F',
        light: '',
        main: '',
        dark: '',
        contrastText: '',
        300: ' #F7931A',
        700: '',
        900: '',
      },
      warning: {
        100: '#FFF6ED',
        300: '#FFA74F',
        light: '',
        main: '',
        dark: '',
        contrastText: '',
        500: '',
        700: '',
        900: '',
      },
      error: {
        100: '#F3E6EB',
        500: '#B71A33',
        light: '',
        main: '',
        dark: '',
        contrastText: '',
        300: '',
        700: '',
        900: '',
      },
    },
    gray: {
      50: '#F2F2F7',
      100: '#E8E8F7',
      300: '#B4B4CF',
      500: '#4B4B60',
      700: '#252545',
      900: '#0E0E2E',
      black: '#000000',
      white: '#FFFFFF',
    },
    text: {
      highemp: '#343446',
      medemp: '#7D7D89',
      lowemp: '#B2B2B9',
    },
  },

  typography: {
    h4: {
      '@media (max-width:1920px)': {
        fontFamily: 'Graphik-Semibold',
        fontSize: '2.5rem',
        fontWeight: '500',
        lineHeight: '3.375rem',
      },
      '@media (max-width:1440px)': {
        fontSize: '2.2rem',
        lineHeight: '3rem',
      },
      '@media (max-width:1080px)': {
        fontSize: '1.8rem',
        lineHeight: '2.5rem',
      },
    },
    h6: {
      '@media (max-width:1920px)': {
        fontFamily: 'Graphik-Semibold',
        fontSize: '1.5rem',
        fontWeight: '400',
        lineHeight: '2.125rem',
      },
      '@media (max-width:1440px)': {
        fontSize: '1.3rem',
        lineHeight: '1.875rem',
      },
      '@media (max-width:1080px)': {
        fontSize: '1.1rem',
        lineHeight: '1.625rem',
      },
    },
    subtitle1: {
      '@media (max-width:1920px)': {
        fontFamily: 'Graphik-Semibold',
        fontSize: '1.25rem',
        fontWeight: '500',
        lineHeight: '1.75rem',
      },
      '@media (max-width:1440px)': {
        fontSize: '1.1rem',
        lineHeight: '1.625rem',
      },
      '@media (max-width:1080px)': {
        fontSize: '1rem',
        lineHeight: '1.375rem',
      },
    },
    subtitle2: {
      '@media (max-width:1920px)': {
        fontFamily: 'Graphik-Regular',
        fontSize: '1.25rem',
        fontWeight: '400',
        lineHeight: '1.75rem',
      },
      '@media (max-width:1440px)': {
        fontSize: '1.1rem',
        lineHeight: '1.625rem',
      },
      '@media (max-width:1080px)': {
        fontSize: '0.9rem',
        lineHeight: '1.375rem',
      },
    },
    b1: {
      '@media (max-width:1920px)': {
        fontFamily: 'Graphik-Semibold',
        fontSize: '1rem',
        fontWeight: '500',
        lineHeight: '1.375rem',
      },
      '@media (max-width:1440px)': {
        fontSize: '0.8rem',
        lineHeight: '1rem',
      },
      '@media (max-width:1080px)': {
        fontSize: '0.6rem',
        lineHeight: '0.8125rem',
      },
    },
    b2: {
      '@media (max-width:1920px)': {
        fontFamily: 'Graphik-Regular',
        fontSize: '1rem',
        fontWeight: '400',
        lineHeight: '1.375rem',
      },
      '@media (max-width:1440px)': {
        fontSize: '0.8rem',
        lineHeight: '1.10rem',
      },
      '@media (max-width:1080px)': {
        fontSize: '0.70rem',
        lineHeight: '0.985rem',
      },
    },
    c1: {
      '@media (max-width:1920px)': {
        fontFamily: 'Graphik-Medium',
        fontSize: '0.875rem',
        fontWeight: '500',
        lineHeight: '1rem',
      },
      '@media (max-width:1440px)': {
        fontSize: '0.8rem',
        lineHeight: '0.9rem',
      },
      '@media (max-width:1080px)': {
        fontSize: '0.55rem',
        lineHeight: '0.7rem',
      },
    },
    c2: {
      '@media (max-width:1920px)': {
        fontFamily: 'Graphik-Regular',
        fontSize: '0.875rem',
        fontWeight: '400',
        lineHeight: '1rem',
      },
      '@media (max-width:1440px)': {
        fontSize: '0.8rem',
        lineHeight: '0.9rem',
      },
      '@media (max-width:1080px)': {
        fontSize: '0.55rem',
        lineHeight: '0.65rem',
      },
    },
    button: {
      '@media (max-width:1920px)': {
        fontFamily: 'Graphik-Semibold',
        fontSize: '0.875rem',
        fontWeight: '500',
        lineHeight: '2.625rem',
      },
      '@media (max-width:1440px)': {
        fontSize: '0.8rem',
        lineHeight: '1rem',
      },
      '@media (max-width:1080px)': {
        fontSize: '0.6rem',
        lineHeight: '0.8rem',
      },
    },
    overline: {
      '@media (max-width:1920px)': {
        fontFamily: 'Graphik-Regular',
        fontSize: '0.75rem',
        fontWeight: '400',
        lineHeight: '0.875rem',
      },
      '@media (max-width:1440px)': {
        fontSize: '0.7rem',
        lineHeight: '0.8rem',
      },
      '@media (max-width:1080px)': {
        fontSize: '0.6rem',
        lineHeight: '0.7rem',
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          boxShadow: 'none',
          ...(ownerState.variant === 'contained' &&
            ownerState.color === 'primary' && {
              backgroundColor: '#0052ff',
              color: '#fff',
              '&:disabled': {
                backgroundColor: '#CCE3FF',
                color: '#fff',
                opacity: 0.95,
              },
              '&:hover': {
                backgroundColor: '#0052ff',
                color: '#fff',
                boxShadow: 'none',
              },
            }),
          ...(ownerState.variant === 'contained' &&
            ownerState.color === 'warning' && {
              backgroundColor: '#FFA74F',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#FFA74F',
                color: '#fff',
                boxShadow: 'none',
              },
            }),
          ...(ownerState.variant === 'outlined' &&
            ownerState.color === 'primary' && {
              backgroundColor: 'none',
              color: '#0052ff',
              border: '1px solid #0052ff',
              '&:disabled': {
                border: '1px solid #0052ff',
                opacity: 0.95,
              },
            }),
        }),
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          border: 'none',
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          border: '1px solid #f2f2f7',
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: 0,
          '& .MuiAccordionDetails-content': {
            margin: 0,
          },
        },
      },
    },

    MuiDataGrid: {
      styleOverrides: {
        root: {
          borderStyle: 'none',
          height: '100vh',
          padding: '2px',
        },
        virtualScroller: {
          overflowX: 'hidden',
        },
        columnHeaders: {
          color: '#4B4B60',
          borderBottom: 'none',
          fontFamily: 'Graphik-Medium',
          fontSize: '0.875rem',
          fontWeight: '500',
          lineHeight: '1rem',
        },
        row: {
          backgroundColor: 'white',
          border: '1px solid #E8E8F7',
          borderRadius: '4px',
          marginBottom: '20px',
          color: '#343446',
          padding: '1vw 2vh',
          maxWidth: '90vw',
        },
        cell: {
          border: 'none',
          '&:focus': {
            outline: 'none',
          },
        },
      },
    },
  },
})

export default theme
