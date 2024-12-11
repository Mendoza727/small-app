export enum typeVideo {
  VT,
  VBL,
  BT,
}

export interface Video {
  title: string;
  description: string;
  video: File | any;
  banner: File | any;
  type_video: typeVideo;
  category: any[];
  id_autor: number;
  date_show: Date;
}

export interface VideoResponse {
  message: string;
  data: Videos[];
}
export interface Videos {
  id: number;
  category: number[];
  title: string;
  description: string;
  video: null | string;
  banner: string;
  is_approved: boolean;
  moderation_notes: null;
  type_video: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at: Date;
  modified_at: Date;
  date_show: Date;
  id_autor: number;
}
export interface VideoStastisticsResponse {
  message: string;
  data: Data;
}

export interface Data {
  video_id: number;
  total_likes: number;
  total_comments: number;
  total_views: number;
  average_views: number;
  percentage_views: string;
}
