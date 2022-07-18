import { Breakpoint, Typography, TypographyProps } from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";
import { useBreakpoints, BreakpointsOptions } from "hooks";
import React, { memo, useMemo } from "react";
import { getActiveBreakpoint } from "utils";

export type TextProps = Omit<TypographyProps, "variant"> & {
  variant: string | { [key: string]: string };
};

const defaultTextProps = {
  variant: "body1",
};

const Text = ({ children, variant: variantProps, ...rest }: TextProps) => {
  const { currentRatio } = useBreakpoints();

  const variant = useMemo(() => {
    if (typeof variantProps === "object") {
      return getActiveBreakpoint(currentRatio, variantProps) ?? "body1";
    } else if (variantProps && currentRatio === BreakpointsOptions.sm) {
      return getVariantMobile(variantProps as Variant);
    } else {
      return variantProps ?? "body1";
    }
  }, [variantProps, currentRatio]) as Variant | "inherit";

  return (
    <Typography variant={variant} {...rest}>
      {children}
    </Typography>
  );
};

Text.defaultProps = defaultTextProps as Partial<TextProps>;

export default memo(Text);

const getVariantMobile = (variant: Variant) => {
  switch (variant) {
    case "body1":
      return "body2";
    case "h1":
      return "h3";
    case "h3":
      return "h5";
    default:
      return variant;
  }
};
