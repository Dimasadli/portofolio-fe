interface ProfileResponseData {
  user?: BaseUser;
  avatarUrl?: string;
}

type ProfileResponse = BaseResponse<ProfileResponseData>;
