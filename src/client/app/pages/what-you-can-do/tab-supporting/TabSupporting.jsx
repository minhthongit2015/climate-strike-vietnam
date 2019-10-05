import React from 'react';
import BasePage from '../../_base/BasePage';
import { Section, SectionHeader, SectionBody } from '../../../layouts/base/section';
import DeepMessage from '../../../components/utils/deep-message/DeepMessage';
import PostsModule from '../../../components/blog/posts-module/PostsModule';
import SupportingPosts from './SupportingPosts';
import t from '../../../languages';


export default class extends BasePage {
  constructor(props) {
    super(props, t('pages.whatYouCanDo.title.everything'));
    this.category = ['DoSupporting'];
  }

  render() {
    return (
      <Section>
        <SectionHeader>
          <DeepMessage>{t('pages.whatYouCanDo.mainMessage')}</DeepMessage>
        </SectionHeader>
        <SectionBody>
          <PostsModule categories={this.category}>
            <SupportingPosts />
          </PostsModule>
        </SectionBody>
      </Section>
    );
  }
}