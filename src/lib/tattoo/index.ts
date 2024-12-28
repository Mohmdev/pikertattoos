import { AuthFormProps, SIGN_IN_FORM, SIGN_UP_FORM } from '@lib/constants/forms'
import { GROUP_PAGE_MENU, GroupMenuProps, LANDING_PAGE_MENU, MenuProps } from '@lib/constants/menus'
import { CREATE_GROUP_PLACEHOLDER, CreateGroupPlaceholderProps } from '@lib/constants/placeholder'
import { tattooCategories } from '@lib/tattoo/categories'

import type { CategoryListProps } from './types'

type PikerDataProps = {
  groupList: CategoryListProps[]
  landingPageMenu: MenuProps[]
  signUpForm: AuthFormProps[]
  signInForm: AuthFormProps[]
  createGroupPlaceholder: CreateGroupPlaceholderProps[]
  groupPageMenu: GroupMenuProps[]
}

export const PIKER_DATA: PikerDataProps = {
  groupList: tattooCategories,
  landingPageMenu: LANDING_PAGE_MENU,
  signUpForm: SIGN_UP_FORM,
  signInForm: SIGN_IN_FORM,
  createGroupPlaceholder: CREATE_GROUP_PLACEHOLDER,
  groupPageMenu: GROUP_PAGE_MENU
}
