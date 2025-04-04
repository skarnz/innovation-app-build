
export const calculateDistance = (x1: number, y1: number, x2: number, y2: number): number => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

export const lerp = (start: number, end: number, amount: number): number => {
  return (1 - amount) * start + amount * end;
};

export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

export const mapRange = (
  value: number, 
  inMin: number, 
  inMax: number, 
  outMin: number, 
  outMax: number
): number => {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

export const randomRange = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};
