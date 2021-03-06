import React from 'react';
import { Section, SectionHeader, SectionBody } from '../../../layouts/base/section';
import DeepMessage from '../../../components/utils/messages/DeepMessage';
import PostsModule from '../../../components/blog/posts-module/PostsModule';
import GretaThunbergPosts from './GretaThunbergPosts';
import t from '../../../languages';
import BlogPage from '../../_base/BlogPage';


export default class extends BlogPage {
  constructor(props) {
    super(props, t('pages.whatYouCanDo.title.GretaThunberg'));
    this.category = ['GretaThunberg'];
  }

  render() {
    return (
      <Section>
        <SectionHeader>
          <DeepMessage>{t('pages.whatYouCanDo.GretaThunbergMessage')}</DeepMessage>
        </SectionHeader>
        <SectionBody>
          <PostsModule categories={this.category} PostList={GretaThunbergPosts} />
        </SectionBody>
      </Section>
    );
  }
}
