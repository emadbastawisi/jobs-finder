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
  experience_type: string;
  job_title: string;
  job_category: string;
  company_name: string;
  start_date: string;
  end_date?: string;
  work_there: boolean;
}

export interface UserEducation {
  degree: string;
  field_of_study: string;
  university: string;
  degree_year: string;
  grade: string;
}

export interface UserSkills {
  skill: string;
  proficiency: string;
}

export interface UserLanguage {
  language: string;
  proficiency: string;
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
  education?: UserEducation[];
  skills?: UserSkills[];
  languages?: UserLanguage[];
}
