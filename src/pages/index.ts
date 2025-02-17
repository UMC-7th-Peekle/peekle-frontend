// onboarding, auth
export { default as OnboardingPage } from './onboarding/index';
export { default as GenderSelectionPage } from './auth/gender/index';
export { default as PersonalDataPage } from './auth/personal-data/index';

// community
export { default as CommunityPage } from './community/index';
export { default as CommunitySearchPage } from './community/search/index';
export { default as CommunityLikePage } from './community/like/index';
export { default as CommunityEditPage } from './community/edit/index';
export { default as CommunityDetailPage } from './community/[id]/index';

// event
export { default as EventPage } from './event/index';
export { default as EventMapPage } from './event/map';
export { default as EventSearchPage } from './event/search';
export { EventDetailPage, EventDetailPageskeleton } from './event/[id]';
export { default as EventScrapPage } from './event/scrap';

// default
export { default as NotFoundPage } from './not-found';

// admin
export { default as AdminPage } from './admin/index';
export { default as AdminSearchPage } from './admin/search';
export { default as EventCreatePage } from './admin/event/create';
export { default as EventEditPage } from './admin/event/edit';
export { default as AuthorizeRolePage } from './admin/authority/authorize-role';
export { default as CreateRolePage } from './admin/authority/create-role';
export { default as UnAuthorizeRolePage } from './admin/authority/un-authorize-role';
