import * as S from './style';
import { Suspense } from 'react';
import {
  EventList,
  EventListSkeleton,
  Filter,
  CategoryChips,
} from '@/components';
import Header from '@/layouts/header';
import { theme } from '@/styles/theme';

const EventPage = () => {
  const eventTitle = '이벤트 제목제목제목제목제목제목제목제목.';
  const FormattedEventTitle =
    eventTitle.length > 9 ? eventTitle.slice(0, 9) + '...' : eventTitle;
  return (
    <S.EventPageContainer>
      <S.HeaderContainer>
        <Header page="event" />
        <CategoryChips />
        <Filter />
      </S.HeaderContainer>
      <div
        style={{
          position: 'relative',
          zIndex: 5,
          backgroundColor: 'red',
        }}
      >
        <div style={{ position: 'absolute' }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="256"
            height="74"
            fill="none"
            viewBox="0 0 256 74"
          >
            <g filter="url(#a)">
              <path
                fill="#000"
                fill-rule="evenodd"
                d="M24 16a8 8 0 0 0-8 8v20.24a8 8 0 0 0 8 8h97.937a2 2 0 0 1 1.609.813l2.844 3.858a2 2 0 0 0 3.22 0l2.844-3.858a2 2 0 0 1 1.609-.813H232a8 8 0 0 0 8-8V24a8 8 0 0 0-8-8H24Z"
                clip-rule="evenodd"
              />
            </g>
            <defs>
              <filter
                id="a"
                width="256"
                height="73.724"
                x="0"
                y="0"
                color-interpolation-filters="sRGB"
                filterUnits="userSpaceOnUse"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  result="hardAlpha"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                />
                <feOffset />
                <feGaussianBlur stdDeviation="8" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0" />
                <feBlend
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_3325_11328"
                />
                <feBlend
                  in="SourceGraphic"
                  in2="effect1_dropShadow_3325_11328"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </div>
        <div
          style={{
            position: 'absolute',
            top: '18px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: theme.color.gray[0],
            backgroundColor: theme.color.gray[900],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <div
            style={{
              whiteSpace: 'nowrap',
            }}
          >
            {FormattedEventTitle}
          </div>
        </div>
      </div>
      <Suspense fallback={<EventListSkeleton />}>
        <EventList />
      </Suspense>
    </S.EventPageContainer>
  );
};

export default EventPage;
