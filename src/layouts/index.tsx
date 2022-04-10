import { FC } from 'react';
import DefaultLayout from './_defaultLayout';
import LoginLayout from './_loginLayout';
import PublicLayout from './_publicLayout';

export const AllLayouts = {
  default: DefaultLayout,
  login: LoginLayout,
  public: PublicLayout,
};

export type LayoutType = {
  Layout?: keyof typeof AllLayouts;
  Role?: string | string[];
};

const LayoutContext: FC<LayoutType> = (props) => {
  const { Layout, children, Role } = props;
  const GetLayout = AllLayouts[Layout || 'default'];
  return <GetLayout Role={Role}>{children}</GetLayout>;
};

export default LayoutContext;
