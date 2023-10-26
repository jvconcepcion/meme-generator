import { RgbaColor } from 'react-colorful';

export const hexToRGBA = (hex: string, alpha: number): RgbaColor => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b, a: alpha };
};

export const rgbaToHex = (rgbaColor: RgbaColor): string =>{
  const rgbaString = `rgba(${rgbaColor.r}, ${rgbaColor.g}, ${rgbaColor.b}, ${rgbaColor.a})`;
  // Parse the rgba color components
  const rgbaParts = rgbaString.match(/[\d.]+/g);

  if (!rgbaParts) {
    // Invalid input
    return '#ffffff';
  }

  const r = parseInt(rgbaParts[0]);
  const g = parseInt(rgbaParts[1]);
  const b = parseInt(rgbaParts[2]);

  // Convert the RGB components to hexadecimal
  const rHex = r.toString(16).padStart(2, '0');
  const gHex = g.toString(16).padStart(2, '0');
  const bHex = b.toString(16).padStart(2, '0');

  // Combine the components to create the HEX color
  const hexColor = `#${rHex}${gHex}${bHex}`;

  return hexColor;
}