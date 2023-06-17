export interface CoursesFilterData {
	semester: string | null;
	faculty: string | null;
	nameCode: string | null;
	endrolled: boolean;
	teaching: boolean;
}
  
  
export const defaultCoursesFilterData: CoursesFilterData = {
	semester: null,
	faculty: null,
	nameCode: null,
	endrolled: false,
	teaching: false,
};
  