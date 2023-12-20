function useGetSearchParams(colors, materials) {
  let combinedSearchParams = [];

  if (
    typeof colors == 'object' &&
    colors.length > 0 &&
    typeof materials == 'object' &&
    colors.length > 0
  ) {
    combinedSearchParams = [...colors, ...materials];
  } else if (
    typeof colors == 'object' &&
    colors.length > 0 &&
    typeof materials == 'string'
  ) {
    combinedSearchParams = [...colors];
    combinedSearchParams.push(materials);
  } else if (
    typeof colors == 'string' &&
    typeof materials == 'object' &&
    materials.length > 0
  ) {
    combinedSearchParams = [...materials];
    combinedSearchParams.push(colors);
  } else if (typeof colors == 'string' && typeof materials == 'string') {
    combinedSearchParams.push(colors);
    combinedSearchParams.push(materials);
  } else {
    combinedSearchParams == false;
  }

  return combinedSearchParams;
}

export default useGetSearchParams;
