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
  data:    Data;
}

export interface Data {
  video:       Video;
  author:      Author;
  comments:    Comment[];
  likes_count: number;
  views_count: number;
}

export interface Author {
  name:      string;
  last_name: string;
  email:     string;
  avatars:   null;
  role:      string;
}

export interface Comments {
  id:          number;
  is_approved: boolean;
  comment:     string;
  created_at:  Date;
  modified_at: Date;
  id_user:     number;
  id_video:    number;
}

export interface Videos {
  id:               number;
  title:            string;
  description:      string;
  video:            string;
  is_approved:      boolean;
  banner:           string;
  moderation_notes: null;
  category:         any[];
  type_video:       string;
  is_active:        boolean;
  is_deleted:       boolean;
  created_at:       Date;
  modified_at:      Date;
  date_show:        Date;
  id_autor:         number;
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
