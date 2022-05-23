import React from 'react';

import { Footer } from '../footer';
import { Header } from '../header';
import './page-layout.scss';

type PageLayoutProps = {
  children: React.ReactNode;
};

export const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className={'page-layout'}>
      <Header />
      <div className={'page-layout__content'}>{children}</div>
      <Footer />
    </div>
  );
};
