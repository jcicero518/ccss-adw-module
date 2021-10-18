// eslint-disable-next-line no-unused-vars
import React from 'react';
import styled from 'styled-components';

export const Center = styled.div`
    margin: 1rem auto 0 auto;
    display: flex;
    align-items: center;
    max-width: 90%;
    flex-direction: column;
    text-align: center;
    flex: 1 1 30%;

    @media (max-width: 600px) {
      flex: 1 0 auto;
    }
  `;

export const ModalCenter = styled.div`
    margin: 1rem auto 0 auto;
    padding-left: 2rem;
    display: flex;
    align-items: flex-start;
    max-width: 90%;
    flex-direction: column;
    text-align: left;

    @media (max-width: 600px) {
      padding-left: 2rem;
      padding-right: .5rem;
      flex-basis: 100%;
      width: 100%;
      flex-direction: column;
      max-width: 100%;
    }
  `;

export const ImageWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    flex: 1 1 auto;
`;

export const Bottom = styled.div`
    margin: 1.25rem auto 1.25rem auto;
    padding-bottom: 1.25rem;
    max-width: 98%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1 1 10%;

    @media (max-width: 1420px) {
      flex-direction: column-reverse;

      .btn {
        margin-top: 5px !important;
        margin-right: 0 !important;
      }
    }

    @media (max-width: 1100px) {
      flex-direction: row;

      .btn {
        margin-right: 5px !important;
      }
    }

    @media (max-width: 900px) {
      flex-direction: column-reverse;

      .affiliate-more-info-link {
        padding-bottom: .5rem;
      }
    }

    @media (max-width: 600px) {
      flex-direction: row;
      flex: 1 0 auto;

      .affiliate-more-info-link {
        padding-bottom: 0;
      }
    }

    @media (max-width: 480px) {
      max-width: 100%;
      flex-direction: column-reverse;

      .btn {
        margin-right: 0 !important;
      }

      .affiliate-more-info-link {
        padding-bottom: .5rem;
      }
    }

  `;

export const H2 = styled.h2`
    margin-top: .25rem;
    margin-bottom: .75rem;
    font-size: 24px;
    font-weight: bold;
    line-height: 1.17;
    letter-spacing: 0.15px;
    text-align: center;
    color: #262626;

    &.modal-field-fullname {
      margin-bottom: .25rem;
    }

    @media (max-width: 600px) {
      font-size: 20px;
    }
  `;

export const H3 = styled.h3`
    font-size: 20px;
    font-weight: 600;
    font-stretch: normal;
    font-style: italic;
    line-height: normal;
    letter-spacing: normal;
    color: #040404;
  `;

export const H4 = styled.h4`
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  text-transform: uppercase;
  letter-spacing: 0.09px;
  color: #555555;
`;

export const Background = styled.div`
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: normal;
    color: #000000;
  `;

export const InnerText = styled.p`
    margin-top: 2px;
    font-family: FreightTextPro;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: italic;
    line-height: 1.43;
    letter-spacing: 0.09px;
    text-align: center;
    color: #262626;
  `;

export const InnerTextLeft = styled.p`
    margin-top: 0;
    font-family: FreightTextPro;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: italic;
    line-height: 1.43;
    letter-spacing: 0.09px;
    text-align: left;
    color: #262626;

    &.modal-field-pb {
      padding-bottom: 1rem;
    }
  `;

export const Label = styled.label`
    margin: 5px 0 2px 0;
    font-family: FreightTextPro;
    font-size: 15px;
    font-weight: bold;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #000;
    display: block;
`;

export const ModalInner = styled.div`
    display: flex;
    flex-direction: row;
    flex-basis: 50%;

    @media (max-width: 600px) {
      flex-basis: 100%;
      width: 100%;
      flex-direction: column-reverse;
    }
  `;

export const ModalRow = styled.div`
  padding-bottom: 0.5rem;
`;

export const ModalColumn = styled.div`
    width: 50%;

    @media (max-width: 600px) {
      flex-basis: 100%;
      width: 100%;
    }
  `;

export const ModalColumnRed = styled.div`
    width: 50%;
    background-color: #b31b1b;

    @media (max-width: 600px) {
      flex-basis: 100%;
      width: 100%;
    }
  `;

export const RedBlock = styled.div`
    padding: 2rem 2.5rem;
    background-color: #b31b1b;
    color: #fafafa;
  `;

export const WhiteLabel = styled.label`
  display: block;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  line-height: normal;
`;

export const ResearchList = styled.p`
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: #ffe0e0;
  font-size: 13px;
  line-height: 1.25;
`;

export const WebsiteLink = styled.a`
  font-size: 13px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #b31b1b;
  `;
