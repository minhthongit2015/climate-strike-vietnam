/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import PropTypes from 'prop-types';
import MarkerWithInfo from '../marker-with-info/MarkerWithInfo';
import './StrikeMarker.scss';
import { FlagSrc } from '../../../../assets/icons';
import PlaceActions from '../../map-tools/place-actions/PlaceActions';
import TimeAgo from '../../utils/time-ago/TimeAgo';


export default class StrikeMarker extends MarkerWithInfo {
  static get customClass() {
    return 'strike';
  }

  constructor(props) {
    super(props);
    this.handleGoToPrev = this.handleGoToPrev.bind(this);
    this.handleGoToNext = this.handleGoToNext.bind(this);
  }

  handleGoToNext() {
    const { entity: place = {} } = this.props;
    if (place.next) {
      place.ref.close();
      place.next.ref.open();
    }
  }

  handleGoToPrev() {
    const { entity: place = {} } = this.props;
    if (place.prev) {
      place.ref.close();
      place.prev.ref.open();
    }
  }

  renderContent() {
    const { entity: place = {} } = this.props;
    const {
      cover,
      description,
      avatar,
      name,
      address, time,
      prev, next
    } = place;
    const defaultDescription = 'Cuộc diễu hành kêu gọi chống biến đổi khí hậu';
    const defaultCover = '/images/cover-photo.jpg';
    const defaultAvatar = 'https://cms.frontpagemag.com/sites/default/files/styles/article_full/public/uploads/2019/11/gt.jpg?itok=wsbc5NVv';

    return (
      <div>
        <div className="marker__header">
          <div className="marker__cover-photo" style={{ backgroundImage: `url(${cover || defaultCover})` }}>
            <img alt="" src={cover || defaultCover} />
          </div>
          <div className="marker__avatar">
            <img alt="" src={avatar || defaultAvatar} />
          </div>
        </div>
        <div className="marker__profile px-3 pb-3">
          <div className="marker__profile__name my-2">{name || 'Greta Thunberg'}</div>
          <div className="marker__profile__description">{description || defaultDescription}</div>
        </div>
        <div className="px-3 pb-3">
          <div className="marker__address">
            <i className="fas fa-map-marker-alt" /> Địa điểm: {address || 'Đang lên lịch trình.'}
          </div>
          <div className="marker__address" title={TimeAgo.fromNow(time)}>
            <i className="fas fa-map-marker-alt" /> Thời gian: {TimeAgo.format(time) || 'Đang lên lịch.'}
          </div>
          <div className="my-2 d-flex justify-content-between">
            <div
              className={`btn btn-sm py-1 px-3 ${prev ? 'btn-default' : 'grey lighten-1 text-white disabled'}`}
              onClick={this.handleGoToPrev}
            >
              <i className="fas fa-chevron-left" /> Điểm Trước
            </div>
            <div
              className={`btn btn-sm py-1 px-3 ${next ? 'btn-default' : 'grey lighten-1 text-white disabled'}`}
              onClick={this.handleGoToNext}
            >
              Điểm Tiếp Theo <i className="fas fa-chevron-right" />
            </div>
          </div>
          <hr className="my-2" />
          <PlaceActions place={place} marker={this} />
        </div>
      </div>
    );
  }
}

StrikeMarker.propTypes = {
  iconSrc: PropTypes.string,
  entity: PropTypes.object
};

StrikeMarker.defaultProps = {
  iconSrc: FlagSrc,
  entity: {}
};
