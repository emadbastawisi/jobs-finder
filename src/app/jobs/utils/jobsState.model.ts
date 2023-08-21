import { Job } from "./job.model";

export interface JobsState {
  jobs: Job[];
  jobsSlice: Job[];
  pageNumber: number;
  error: string | null;
  status: "loading" | "success" | "error"

}