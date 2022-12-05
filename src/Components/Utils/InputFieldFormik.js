import React from "react";

import { TextField } from "@mui/material";
const MyInput = React.forwardRef((props, ref) => {
  const { sx, name, handler, label, ...rest } = props;
  const { handleBlur, handleChange, errors, values, touched } = handler;

  return (
    <TextField
      label={label ? (props?.validation ? `${label} *` : label) : ""}
      size="small"
      variant="standard"
      name={name}
      ref={(el) => ref && (ref.current[name] = el)}
      onBlur={handleBlur}
      onChange={handleChange}
      value={values[`${name}`]}
      error={touched[`${name}`] && Boolean(errors[`${name}`])}
      helperText={touched[`${name}`] && errors[`${name}`]}
      sx={{
        width: "100%",
        fontSize: "18px",
        "&:hover:not(.Mui-disabled):not(.mui):before": {
          borderBottom: "2px solid",
          borderColor: "border.primary",
        },
        "&.Mui-error": {
          color: "text.secondary",
        },
        ...sx,
      }}
      {...rest}
    />
  );
});

export default MyInput;
