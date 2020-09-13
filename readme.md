#Setup

git clone https://github.com/thesunilbagde/cab-search.git

Run `yarn install` to install all dependencies.

Run `yarn dev` to run the project.

### Get a all cab

/api/cabs?lat=12&long=11&type=pink

type: **GET**

lat: lattitude - lattitude of the user,
long - longitude of the user,
type - filter by color, ac, non-ac

### Book a cab

/cab/:cabId/booking

cabID: 1
type: **POST**

### Change a status

/cab/:cabId/waiting

cabID: 1
type: **PUT**
