import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Modal from 'react-modal';

import he from 'he';

// eslint-disable-next-line no-unused-vars
import { CSSTransition } from 'react-transition-group';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faInfoCircle,
  faGlobe,
  faTimes
} from '@fortawesome/pro-regular-svg-icons';

import { LazyImage } from '../LazyImage';
import {
  Center, InnerText, InnerTextLeft, ImageWrapper,
  Bottom, H2, H3, H4, ModalCenter, ModalColumn,
  ModalColumnRed, ModalInner, RedBlock, Label,
  WhiteLabel, ResearchList, WebsiteLink, ModalRow
} from './StyledElements';

const customStyles = {
  content : {
    padding               : '0',
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transition            : 'all .5s linear',
    transform             : 'translate(-50%, -50%)',
    backgroundColor       : '#fafafa',
    maxWidth              : '823px',
    zIndex                : '9999'
  }
};

// Modal using React Portal
Modal.setAppElement('#affiliates_section_main');

const Profile = ({ viewData }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const {
    field_department, field_website, field_graduate_fields,
    field_first_name, field_last_name, field_position,
    field_media_image, field_research_interests, field_research_approaches,
    field_college, field_center_affiliations, field_twitter_handle
  } = viewData;

  const openModal = (event) => {
    event.preventDefault();
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const ModalImageStyle = {
    width: '100%',
    height: 'auto',
    maxWidth: '100%'
  };

  const Icon = ({icon}) => {
   return <FontAwesomeIcon icon={icon} style={{'color': '#b31b1b'}}  />;
  };

  Icon.propTypes = {
    icon: PropTypes.object
  };

  const WebGlobe = () => (
    <FontAwesomeIcon icon={faGlobe} />
  );

  const Close = ({ clickFunc }) => (
    <div onClick={clickFunc} className="modal-close modal__close">
      <FontAwesomeIcon icon={faTimes} />
    </div>
  );

  Close.propTypes = {
    clickFunc: PropTypes.func.isRequired
  };

  const formatName = (userName) => {
    return `${userName.first} ${userName.last}`;
  };

  let fullName = {
    first: field_first_name,
    last: field_last_name
  };

  const AffiliateName = () => (
    <H2>{formatName(fullName)}</H2>
  );

  return (
    <div className="affiliate_main--profile">
      <div className="affiliate_main--profile-container">
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Modal">
          <ModalInner>
            <ModalColumnRed>
              <img src={field_media_image} alt="alt" style={ModalImageStyle} />
              <RedBlock>
                <WhiteLabel>Research Interests</WhiteLabel>
                <ResearchList>{field_research_interests}</ResearchList>
                <WhiteLabel>Research Approaches</WhiteLabel>
                <ResearchList>{field_research_approaches}</ResearchList>
              </RedBlock>
            </ModalColumnRed>
            <ModalColumn>
              <div className="close-wrapper" >
                <Close clickFunc={closeModal} />
              </div>
              <ModalCenter>
                <H4>{he.decode(field_college)}</H4>
                <H2 className="modal-field-fullname">{formatName(fullName)}</H2>
                <InnerTextLeft className="modal-field-pb">{he.decode(field_department)}</InnerTextLeft>
                {field_center_affiliations && field_center_affiliations === 'None' || field_center_affiliations === ''
                  ? null
                  : <ModalRow>
                      <Label>Center Affiliations</Label>
                      <InnerTextLeft>{field_center_affiliations}</InnerTextLeft>
                    </ModalRow>
                }

                {field_graduate_fields && field_graduate_fields === 'None' || field_graduate_fields === ''
                  ? null
                  : <ModalRow>
                      <Label>Graduate Fields</Label>
                      <InnerTextLeft>{field_graduate_fields}</InnerTextLeft>
                    </ModalRow>
                }

                {field_twitter_handle
                  ?
                  <div>
                    <p>
                      <span className="fab fa-twitter" aria-hidden={true}></span> <WebsiteLink href={`https://twitter.com/${field_twitter_handle}`}>{field_twitter_handle}</WebsiteLink>
                    </p>
                  </div>
                  : null
                }

                {field_website
                  ?
                    <div>
                      <p><WebGlobe/> <WebsiteLink href={field_website}>{field_website}</WebsiteLink></p>
                    </div>
                  :
                  null
                }


                <H3> </H3>

              </ModalCenter>

            </ModalColumn>
          </ModalInner>
        </Modal>

        <ImageWrapper>
          <LazyImage src={field_media_image} alt="alt" />
        </ImageWrapper>

        <Center>
          <AffiliateName/>
          <InnerText>{field_position}</InnerText>
          <InnerText>{he.decode(field_department)}</InnerText>
        </Center>
        <Bottom>
          <div className="btn btn--red_bg">
            {field_website
              ?
              <a target="_blank" rel="noreferrer" href={field_website || ''}>View website <FontAwesomeIcon icon={faGlobe} /></a>
              :
              <a target="_blank" rel="noopener" disabled aria-disabled={true}>View website <FontAwesomeIcon icon={faGlobe} /></a>
            }

          </div>
          <a className="affiliate-more-info-link" onClick={openModal} href="#">More info <Icon icon={faInfoCircle} style={{'color': '#b31b1b'}}  /> </a>
        </Bottom>
      </div>
    </div>
  );
};

Profile.propTypes = {
  viewData: PropTypes.object
};

export default Profile;
