import React from 'react';
import BasePage from '../../_base/BasePage';
import { Section, SectionHeader, SectionBody } from '../../../layouts/base/section';
import WhatYouCanDoPosts from './WhatYouCanDoPosts';
import NewPostRow from '../../../components/blog/new-post/NewPostRow';
import t from '../../../languages';


export default class TabWhatYouCanDo extends BasePage {
  constructor(props) {
    super(props, t('pages.whatYouCanDo.title.main'));
    this.postListRef = React.createRef();
    this.handlePostPosted = this.handlePostPosted.bind(this);
  }

  handlePostPosted() {
    this.postListRef.current.innerRef.current.refresh();
  }

  render() {
    return (
      <Section>
        <SectionHeader>
          <div className="text-light text-center mb-5 white-space-pre">{t('pages.whatYouCanDo.mainMessage')}</div>
        </SectionHeader>
        <SectionBody>
          <NewPostRow onPosted={this.handlePostPosted} />
          <WhatYouCanDoPosts
            ref={this.postListRef}
          />
        </SectionBody>
      </Section>
    );
  }
}
