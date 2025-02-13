import { Helmet } from 'react-helmet-async';
import { getBaseUrl, getSubstring } from '@/utils';
import { MetaTagProps } from '@/types/common';
import { SHARE_TITLE, SHARE_DESCRIPTION } from '@/constants/common';

const MetaTag = ({
  title = SHARE_TITLE,
  description = SHARE_DESCRIPTION,
  imgSrc = import.meta.env.VITE_BASE_IMAGE, //디폴트 이미지
  url = window.location.href,
}: MetaTagProps = {}) => {
  const firstSentence = getSubstring(description);
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={firstSentence} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content="peekle" />
      <meta property="og:description" content={firstSentence} />
      <meta property="og:image" content={`${getBaseUrl()}${imgSrc}`} />
      <meta property="og:url" content={url} />

      {/* Twitter Card (트위터 공유용) */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={firstSentence} />
      <meta name="twitter:image" content={imgSrc} />
      <meta name="twitter:url" content={url} />
    </Helmet>
  );
};

export default MetaTag;

/** 사용 예시
 * SEO를 위해 사용 - 테스트 후 모든 페이지에 적용 예정
 *
 * <MetaTag
    title={title}
    description={content?.slice(0, 50)}
    imgSrc={eventImages?.[0]?.imageUrl}
    url={window.location.href}
  />
*/
