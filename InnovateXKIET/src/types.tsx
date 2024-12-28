export type SideNavItem = {
  title: string;
  path: string;
  icon?: JSX.Element;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
  isBottom: boolean;
};
export type FeedItem = {
  _id: string;
  userId: string;
  author: string;
  username: string;
  title: string;
  content: string;
  images: string[];
  upvotes: string[];
  isUpvoted: boolean;
  isSaved: boolean;
  updatedAt: string;
  createdAt:string;
}

export type LeaderboardData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
}

export type Post ={
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
}

// types/User.ts
export interface User {
  name: string;
  email: string;
  registerNumber?: string; // Optional
  degree: string;
  batch?: number; // Optional
  college?: string; // Optional if applicable
  profileImage: string;
  level: number; // Assuming this corresponds to contribution points
}
