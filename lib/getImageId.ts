export default function getImageId(userId: string, perUserId: string): string {
  return btoa(userId + "-" + perUserId);
}
