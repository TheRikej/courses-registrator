export type FacultyCreateData = {
  name: string,
};

export type ReadFacultyData = {
  id?: string;
  name?: string;
}

export type DeleteData = {
  id: string;
};

export type UpdateData = {
  id: string,
  name: string,
};