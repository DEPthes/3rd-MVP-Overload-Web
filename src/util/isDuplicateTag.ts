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

/**
 * 태그 배열 내에 중복된 태그가 있는지 확인하는 함수
 * @param tags: string[] - 태그 배열
 * @returns boolean - 중복 태그 존재 여부 (true일 시 중복 태그 존재)
 */
export const hasDuplicateTags = (tags: string[]): boolean => {
  // 각 태그를 확인하여 중복 여부를 검사
  for (let i = 0; i < tags.length; i++) {
    if (isDuplicateTag(tags, tags[i], i)) {
      return false; // 중복된 태그가 발견되면 false 반환
    }
  }
  return true; // 중복된 태그가 없으면 true 반환
};
