import React from 'react';
import BasePage from '../../_base/BasePage';
import { Section, SectionHeader, SectionBody } from '../../../layouts/base/section';
import PostsModule from '../../../components/blog/posts-module/PostsModule';
import PollutionPosts from './PollutionPosts';
import t from '../../../languages';
import DeepMessage from '../../../components/utils/deep-message/DeepMessage';


export default class TabPollution extends BasePage {
  constructor(props) {
    super(props, t('pages.earthPicture.title.pollution'));
    this.category = ['Pollution'];
  }

  render() {
    return (
      <Section>
        <SectionHeader>
          <DeepMessage>{t('pages.earthPicture.mainMessage')}</DeepMessage>
        </SectionHeader>
        <SectionBody>
          <PostsModule categories={this.category} PostList={PollutionPosts} />
        </SectionBody>
      </Section>
    );
  }
}
