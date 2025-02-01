import { Helmet } from 'react-helmet-async';

interface MetaTagProps {
  title?: string;
  description?: string;
  imgSrc?: string;
  url?: string;
}

const MetaTag = ({
  title = '피클(peekle) - 액티브 시니어 플랫폼',
  description = '액티브 시니어 커뮤니티 플랫폼 피클(Peekle)입니다. 시니어 세대가 건강하고 주체적인 삶을 살 수 있는 사회를 만드는 것이 목표입니다.',
  imgSrc = import.meta.env.VITE_BASE_IMAGE, //디폴트 이미지
  url = window.location.href,
}: MetaTagProps) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content="peekle" />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imgSrc} />
      <meta property="og:url" content={url} />

      {/* Twitter Card (트위터 공유용) */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
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
