import { createMuiTheme } from "material-ui/styles";
import Color from "color";

const colors = require("./colors");

const theme = createMuiTheme({
  base: {
    colors: {
      background: colors.white,
      text: "colors.dark",
      link: colors.accent,
      linkHover: Color(colors.accent)
        .lighten(0.1)
        .string(),
      accent: colors.accent
    },
    fonts: {
      unstyledFamily: `Arial, sans-serif`,
      styledFamily: "Open Sans",
      styledFonts: "300,400,600"
    }
  },
  home: {
    colors: {
      title: colors.gray
    }
  },
  main: {
    colors: {
      background: colors.white,
      title: colors.gray,
      content: colors.dark,
      contentHeading: colors.gray,
      blockquoteFrame: colors.lightGray,
      link: colors.accent,
      linkHover: colors.dark
    },
    sizes: {
      articleMaxWidth: "800px"
    },
    fonts: {
      title: {
        size: 1.9,
        sizeM: 2.5,
        sizeL: 2.7,
        weight: 600,
        lineHeight: 1.1
      },
      content: {
        size: 1.0,
        sizeM: 1.15,
        sizeL: 1.1,
        lineHeight: 1.6
      },
      contentHeading: {
        h2Size: 1.5,
        h3Size: 1.3,
        weight: 600,
        lineHeight: 1.3
      }
    }
  },
  footer: {
    colors: {
      text: Color(colors.gray)
        .lighten(0.5)
        .string(),
      link: colors.accent,
      linkHover: Color(colors.accent)
        .lighten(0.2)
        .string()
    },
    fonts: {
      footnote: {
        size: 0.8,
        lineHeight: 1.4
      }
    }
  },
  mediaQueryTresholds: {
    M: 600,
    L: 1024
  },
  palette: {
    primary: {
      main: "#709425"
    }
  },
  typography: {
    fontFamily: `Arial, sans-serif`,
    fontSize: 16
  },
  pallete: {
    action: {
      hover: "rgba(0, 0, 0, 0.01)"
    }
  }
});

export default theme;
