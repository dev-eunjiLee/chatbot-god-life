export type Component =
  | SimpleText
  | SimpleImage
  | BasicCard
  | CommerceCard
  | ListCard
  | ItemCard;

export type ContextTemplate = {
  values: ContextValue;
};

export type Link = {
  pc?: string;
  mobile?: string;
  web?: string;
};

export type Thumbnail = {
  imageUrl: string;
  link: Link;
  fixedRatio: boolean;
  width: number;
  height: number;
};

export type Button = {
  label: string;
  action: string;
  webLinkUrl?: string;
  messageText?: string;
  phoneNumber?: string;
  blockId?: string;
  extra?: Map<string, any>;
};

export type SimpleText = { text: string };
export type SimpleImage = { imageUrl: string; altText: string };
export type BasicCard = {
  title?: string;
  description?: string;
  thumbnail: Thumbnail;
  // profile?: KakaoComponentBasicCardProfile;
  // social?: KakaoComponentBasicCardSocial;
  buttons: Array<Button>;
};

export type Profile = {
  nickname: string;
  imageUrl?: string;
};

export type CommerceCard = {
  description: string;
  price: number;
  currency: string;
  discount?: number;
  discountRate?: number;
  thumbnails: Array<Thumbnail>;
  profile: Profile;
};

export type ListItem = {
  title: string;
  description?: string;
  imageUrl?: string;
  link: Link;
  action?: string;
  blockId?: string;
  messageText?: string;
  extra?: Map<string, any>;
};

export type ListCard = {
  header: ListItem;
  items: Array<ListItem>;
  buttons: Array<Button>;
};

export type SkillTemplate = {
  outputs: Component; // 1개 이상 3개 이하
  quickReplies?: any; // 10개 이하
};

export type ContextValue = {
  name: string;
  lifeSpan: number;
  params?: Map<string, string>;
};

// TODO 작업중 https://i.kakao.com/docs/skill-response-format#%EC%83%81%EC%84%B8-%ED%95%84%EB%93%9C-15
export type ItemCard = {
  thumbnail?: Thumbnail;
  head?: Head;
  profile?: Profile;
  imageTitle?:ImageTitle
  itemList: Array<ItemList>
  itemListAlignmen?t: string
};
