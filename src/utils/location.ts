function Deg2Rad(deg) {
  return (deg * Math.PI) / 180;
}

function pythagorasEquiRectangular(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  lat1 = Deg2Rad(lat1);
  lat2 = Deg2Rad(lat2);
  lon1 = Deg2Rad(lon1);
  lon2 = Deg2Rad(lon2);
  const R = 6371; // km
  const x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
  const y = lat2 - lat1;
  const d = Math.sqrt(x * x + y * y) * R;
  return d;
}
export { pythagorasEquiRectangular };
