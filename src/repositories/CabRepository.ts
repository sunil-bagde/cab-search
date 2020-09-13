import db from "../db";
import { pythagorasEquiRectangular } from "../utils";
import { sortBy } from "sort-by-typescript";
type Location = {
  latitude: number;
  longitude: number;
};

type Cab = {
  diff: number;
  id: number;
  pickUpTime: number;
  booked_at: number | null;

  type: string;
  driver: {
    driverNumber: number;
    name: string;
    license: string;
  };
  location: Location;
};
export default class CabRepository {
  getAll(): Array<Cab> {
    return db
      .get("cabs")
      .filter((cab) => cab.booked_at == null)
      .value();
  }
  getAllCabs(): Array<Cab> {
    return db.get("cabs").value();
  }
  chanStatusToWaiting(id: number): Cab {
    const cab = db.get("cabs").find({ id: id }).value();

    if (cab) {
      const booked = db
        .get("cabs")
        .find({ id: id })
        .assign({ booked_at: null })
        .value();
      db.write();
      return booked;
    }
    return cab;
  }
  find(id: number): Cab {
    return db.get("cabs").find({ id: id }).value();
  }
  cabBooking(id: number): Cab {
    let booked = db.get("cabs").find({ id: id }).value();

    if (booked) {
      booked = db
        .get("cabs")
        .find({ id: id })
        .assign({ booked_at: Date.now() })
        .value();
      db.write();
    }
    return booked;
  }
  nearestCab(latitude: number, longitude: number, type: string): Array<Cab> {
    let notBooked = this.getAll().filter((cab: Cab) => cab.booked_at === null);

    if (type) {
      notBooked = notBooked.filter(
        (cab: Cab) => cab.type.toLowerCase() === type.toLowerCase()
      );
    }
    const result = notBooked.map((cab: Cab) => {
      return {
        ...cab,
        diff: Math.floor(
          pythagorasEquiRectangular(
            latitude,
            longitude,
            cab.location.latitude,
            cab.location.longitude
          )
        ),
      };
    });
    return result.sort(sortBy("diff"));
  }
}
