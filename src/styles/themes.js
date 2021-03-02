import * as colors from './colors'
import * as typography from './typography'

export const light = {
  primaryColor: colors.primary800,
  accentColor: colors.primary200,
  baseTextColor: colors.gray700,
  highlightTextColor: colors.primary800,
  strongTextColor: colors.gray900,
  subduedTextColor: colors.gray500,
  inverseTextColor: colors.white,
  listSeparatorColor: colors.primary100,
  bodyBackgroundColor: colors.primary50,
  bodyText: {
    ...typography.bodyText,
    color: colors.gray700,
  },
}
export const dark = {
  primaryColor: colors.gray800,
  accentColor: colors.primary800,
  baseTextColor: colors.gray200,
  highlightTextColor: colors.primary300,
  strongTextColor: colors.gray50,
  subduedTextColor: colors.gray300,
  inverseTextColor: colors.primary300,
  listSeparatorColor: colors.gray600,
  bodyBackgroundColor: colors.gray700,
  bodyText: {
    ...typography.bodyText,
    color: colors.gray200,
  },
}
