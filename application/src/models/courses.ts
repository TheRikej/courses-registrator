export interface CoursesFilterData {
    semester: string | null;
    faculty: string | null;
    nameCode: string | null;
    endrolled: boolean;
    teaching: boolean;
  }
  
  export interface PeoplePreferences {
    /**
     * Set of people uuids where the user clicked 'Interested'.
     * Such people can be easily accessed from App bar.
     */
  
    interested: Set<string>;
    /**
     * Set of people uuids where the user clicked 'Not Interested'.
     * Such people cannot be shown anymore.
     */
  
    notInterested: Set<string>;
  }
  
  export const defaultCoursesFilterData: CoursesFilterData = {
    semester: null,
    faculty: null,
    nameCode: null,
    endrolled: false,
    teaching: false,
  };
  