export interface CourseApiResultFaculty {
    id:        string;
    name:      string;
}



export interface CourseApiResult {
	id: string;
	name: string;
	description: string;
	faculty: CourseApiResultFaculty;
}
  