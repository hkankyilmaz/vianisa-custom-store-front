function useGetSearchParams(colors, materials) {
  console.log('colors', colors);
  console.log('materials', materials);
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
    colors.length == 0 &&
    typeof materials == 'object' &&
    materials.length > 0
  ) {
    combinedSearchParams = materials;
  } else if (
    typeof materials == 'object' &&
    materials.length == 0 &&
    typeof colors == 'object' &&
    colors.length > 0
  ) {
    combinedSearchParams = colors;
  } else {
    combinedSearchParams == false;
  }
  console.log('combinedSearchParams', combinedSearchParams);
  return combinedSearchParams;
}

export default useGetSearchParams;
