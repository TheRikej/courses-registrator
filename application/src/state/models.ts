export interface CoursesFilterData {
	semester: string;
	faculty: string;
	nameCode: string;
	endrolled: boolean;
	teaching: boolean;
}
  
  
export const defaultCoursesFilterData: CoursesFilterData = {
	semester: "_None_",
	faculty: "_All_",
	nameCode: "",
	endrolled: false,
	teaching: false,
};
  