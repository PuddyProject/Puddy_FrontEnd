export interface ApiError {
  response?: {
    data: any;
    status: number;
    resultCode?: string;
  };
}
