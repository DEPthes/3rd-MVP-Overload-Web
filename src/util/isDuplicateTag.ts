/**
 * 중복된 태그 존재 여부를 확인하는 함수
 * @parms tags: string[]
 * @parms tag: string
 * @parms index: number
 * @returns boolean -> 태그 존재 여부 (true일시 중복 태그 존재)
 */
export const isDuplicateTag = (tags: string[], tag: string, index: number) => {
  // 현재 태그와 같은 값이 있지만, 인덱스가 다른 경우 중복으로 간주
  return tags.indexOf(tag) !== index;
};
