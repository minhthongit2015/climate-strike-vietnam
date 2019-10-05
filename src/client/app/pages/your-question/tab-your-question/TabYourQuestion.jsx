import React from 'react';
import BasePage from '../../_base/BasePage';
import { Section, SectionHeader, SectionBody } from '../../../layouts/base/section';
import DeepMessage from '../../../components/utils/deep-message/DeepMessage';
import PostsModule from '../../../components/blog/posts-module/PostsModule';
import EarthPicturePosts from './YourQuestionPosts';
import t from '../../../languages';


export default class TabEarthPicture extends BasePage {
  constructor(props) {
    super(props, t('pages.yourQuestion.title.main'));
    this.category = 'YourQuestion';
  }

  render() {
    return (
      <Section>
        <SectionHeader>
          <DeepMessage>{t('pages.yourQuestion.mainMessage')}</DeepMessage>
        </SectionHeader>
        <SectionBody>
          <PostsModule rootCategory={this.category}>
            <EarthPicturePosts />
          </PostsModule>
        </SectionBody>
      </Section>
    );
  }
}
