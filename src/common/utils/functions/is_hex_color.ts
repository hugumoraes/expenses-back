const is_hex_color = (color: string) => {
  const hex_color_pattern =
    /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{4}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/;

  return hex_color_pattern.test(color);
};

export { is_hex_color };
