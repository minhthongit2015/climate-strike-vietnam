import React from 'react';
import { Section, SectionHeader, SectionBody } from '../../../layouts/base/section';
import PostsModule from '../../../components/blog/posts-module/PostsModule';
import PollutionPosts from './PollutionPosts';
import t from '../../../languages';
import DeepMessage from '../../../components/utils/messages/DeepMessage';
import BlogPage from '../../_base/BlogPage';


export default class extends BlogPage {
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
