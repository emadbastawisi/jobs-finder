export interface ResponseError {
  [key: string]: string[];
}

export interface UserPersonalInfo {
  first_name?: string;
  last_name?: string;
  middel_name?: string;
  birthdate: string;
  gender: string;
  nationality: string;
  marital_status?: string;
  military_status?: string;
  driving_license?: string;
  address: string;
  phone: string;
}

export interface UserCareerInterests {
  career_level: string;
  job_types: string;
  job_titles?: string[];
  job_categories: string;
  min_salary: number;
  hide_min_salary: boolean;
  perfered_job_location?: string;
  current_job_search_status?: string;
}

export interface UserCareerInterestsIn {
  career_level?: string;
  job_types?: string[];
  job_titles?: string[];
  job_categories: string[];
  min_salary?: number;
  hide_min_salary?: boolean;
  perfered_job_location?: string;
  current_job_search_status?: string;
}

export interface CV {
  cv_name: string;
  cv_file: string;
  updated_at?: string;
}

export interface IMG {
  img_name: string;
  img_file: string;
  updated_at?: string;
}

export interface UserWorkExperience {
  id?: number;
  experience_type: string;
  job_title: string;
  job_category: string[];
  company_name: string;
  start_date: string;
  end_date?: string
  work_there: boolean;
}

export interface UserEducationDegree {
  degree: string;
  field_of_study: string;
  university: string;
  degree_year: string;
  grade: string;
}
export interface UserDegree {
  degree: string;
  field_of_study: string[];
  university: string;
  degree_year: string;
  grade: string;
}
export interface UserHighSchool {
  degree: string;
  school_name: string;
  certificate_name: string;
  language_of_study: string
  graduation_year: string;
  highschool_grade: string;
}

export interface UserSkills {
  id?: number;
  skill: string;
  proficiency?: string;
}

export interface UserLanguage {
  id?: number;
  language: string;
  proficiency: string;
}

export interface Skills {
  name: string;
  frequency: number;
}

export interface UserProfile {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
  cv?: CV;
  img?: IMG;
  career_interests?: UserCareerInterests;
  personal_info?: UserPersonalInfo;
  work_experience?: UserWorkExperience[];
  degrees?: UserDegree[];
  highschool?: UserHighSchool[];
  skills?: UserSkills[];
  languages?: UserLanguage[];
}

