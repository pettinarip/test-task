import { extendTheme } from "@chakra-ui/react";

const size = {
  lg: {
    px: 0,
  },
  md: {
    px: 0,
  },
  sm: {
    px: 0,
  },
  xs: {
    px: 0,
  },
};

const sizes = {
  lg: {
    field: size.lg,
    addon: size.lg,
  },
  md: {
    field: size.md,
    addon: size.md,
  },
  sm: {
    field: size.sm,
    addon: size.sm,
  },
  xs: {
    field: size.xs,
    addon: size.xs,
  },
};

const outlineStyles = {
  field: {
    border: 0,
    borderRadius: 0,
    borderBottom: "2px solid",
    _invalid: {
      boxShadow: "none",
    },
    _focus: {
      boxShadow: "none",
    },
  }
};

const theme = extendTheme({
  components: {
    Input: {
      sizes,
      variants: {
        outline: outlineStyles,
      },
    },
    NumberInput: {
      sizes,
      variants: {
        outline: outlineStyles,
      },
    },
    Button: {
      variants: {
        outline: {
          border: "2px solid",
          borderColor: "black"
        }
      }
    }
  },
});

export default theme;
