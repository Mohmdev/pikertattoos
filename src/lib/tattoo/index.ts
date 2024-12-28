import { CATEGORY_LIST } from '@lib/tattoo/category-list'

import { AuthFormProps, SIGN_IN_FORM, SIGN_UP_FORM } from './forms'
import { GROUP_PAGE_MENU, GroupMenuProps, LANDING_PAGE_MENU, MenuProps } from './menus'
import { CREATE_GROUP_PLACEHOLDER, CreateGroupPlaceholderProps } from './placeholder'
import { GroupListProps } from './slider'

type GroupleConstantsProps = {
  landingPageMenu: MenuProps[]
  signUpForm: AuthFormProps[]
  signInForm: AuthFormProps[]
  groupList: GroupListProps[]
  createGroupPlaceholder: CreateGroupPlaceholderProps[]
  groupPageMenu: GroupMenuProps[]
}

export const SITE_CONSTANTS: GroupleConstantsProps = {
  landingPageMenu: LANDING_PAGE_MENU,
  signUpForm: SIGN_UP_FORM,
  signInForm: SIGN_IN_FORM,
  groupList: CATEGORY_LIST,
  createGroupPlaceholder: CREATE_GROUP_PLACEHOLDER,
  groupPageMenu: GROUP_PAGE_MENU
}
