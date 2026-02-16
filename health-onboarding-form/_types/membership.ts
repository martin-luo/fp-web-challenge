export enum MembershipAccessHours {
  ALL_DAY = "24/7",
  TIME = "6am - 10pm",
}

export type Membership = {
  id: string;
  name: string;
  price: number;
  billingPeriod: "month" | "year";
  features: string[];
  accessHours: MembershipAccessHours;
  popular: boolean;
};
