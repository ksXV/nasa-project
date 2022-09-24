export interface ILaunchReqBody<DateType> {
  mission: string;
  rocket: string;
  target: string;
  launchDate: DateType;
}
export interface ILaunch extends ILaunchReqBody<Date> {
  flightNumber: number;
  customers: string[];
  upcoming: boolean;
  success: boolean;
}
