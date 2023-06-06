export type CreateSeminar = {
    registrationStart: Date,
    registrationEnd:   Date,
    capacity:          number,
    courseSemesterId:  string,
  };

  export type DeleteData = {
    id: string;
  };