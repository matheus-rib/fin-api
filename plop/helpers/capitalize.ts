export default function (stringToCapitalize: string): string {
  return stringToCapitalize
    .toLowerCase()
    .replace(/\w/, firstLetter => firstLetter.toUpperCase())
}
